import { protectedProcedure } from '../trpc'
import { z } from 'zod'
import { db } from '~~/server/db/db'
import { chat, chat_sessions } from '~~/server/db/db_schema'
import { and, desc, eq } from 'drizzle-orm'
import { systemPrompt, systemPromptTxt, vertexModel } from './llm'
import { v4 as uuid } from 'uuid'
import { RouterOutput } from '.'
import { Part } from '@google-cloud/vertexai'

export const chatTrpc = {
  /**
   *
   */
  getChatSessions: protectedProcedure.query(async ({ ctx }) => {
    const { id_empresa, id_usuario } = ctx.user!

    return await db
      .select()
      .from(chat_sessions)
      .where(
        and(
          eq(chat_sessions.id_empresa, id_empresa),
          eq(chat_sessions.id_usuario, id_usuario),
          eq(chat_sessions.activo, 1)
        )
      )
      .orderBy(desc(chat_sessions.id_chat_session))
  }),
  /**
   *
   */
  getChatId: protectedProcedure

    .input(
      z.object({
        requestId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { requestId } = input
      const { id_empresa, id_usuario } = ctx.user!

      const [findChatSession] = await db
        .select()
        .from(chat_sessions)
        .where(
          and(
            eq(chat_sessions.uuid, requestId),
            eq(chat_sessions.id_empresa, id_empresa),
            eq(chat_sessions.id_usuario, id_usuario)
          )
        )

      /**
       *
       */
      const findChat = await db
        .select()
        .from(chat)
        .where(eq(chat.id_chat_session, findChatSession.id_chat_session))

      return {
        chat_session: findChatSession,
        chat: findChat,
      }
    }),
  /**
   *
   *
   */
  addChatSession: protectedProcedure.query(async ({ ctx }) => {
    const { id_empresa, id_usuario } = ctx.user!

    const newUuid = uuid()

    await db.insert(chat_sessions).values({
      uuid: newUuid,
      titulo: '',
      id_empresa,
      id_usuario,
    })

    return { uuid: newUuid }
  }),
  /**
   *
   *
   *
   */
  addPrompt: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        requestId: z.string(),
        url_imagen: z.string(),
      })
    )
    .mutation(async function* ({ input, ctx }) {
      const { prompt, requestId, url_imagen } = input
      const { id_empresa, id_usuario } = ctx.user!

      const sys_prompt = systemPromptTxt()
      const generativeModel = vertexModel(sys_prompt)

      const contents: {
        role: string
        parts: Part[]
      }[] = []

      const findChatSession = await db
        .select()
        .from(chat_sessions)
        .where(
          and(
            eq(chat_sessions.uuid, requestId),
            eq(chat_sessions.id_empresa, id_empresa),
            eq(chat_sessions.id_usuario, id_usuario)
          )
        )

      const findChat = await db
        .select()
        .from(chat)
        .where(eq(chat.id_chat_session, findChatSession[0].id_chat_session))

      const mapChat = findChat.map((c) => {
        return {
          role: c.origen === 'user' ? 'user' : 'assistant',
          parts: [{ text: c.chat }],
        }
      })

      if (mapChat.length > 0) {
        contents.push(...mapChat)
      }

      /*   contents.push({
        role:'user' :parts []
      }) */

      const newPromptArr: (typeof contents)[0] = {
        role: 'user',
        parts: [{ text: prompt }],
      }

      if (url_imagen.length > 0) {
        newPromptArr.parts.push({
          fileData: {
            fileUri: url_imagen,
            mimeType: 'image/jpeg',
          },
        })
      }

      contents.push(newPromptArr)

      /**
       *
       */
      const saveChat = async (responseLLM: string) => {
        const insertParamsUser = [
          {
            origen: 'user',
            chat: prompt,
            tipo: 'texto',
            id_chat_session: findChatSession[0].id_chat_session,
          },
        ]

        if (url_imagen.length > 0) {
          insertParamsUser.push({
            origen: 'user',
            chat: url_imagen,
            tipo: 'imagen',
            id_chat_session: findChatSession[0].id_chat_session,
          })
        }

        const insertParams = [
          ...insertParamsUser,
          {
            origen: 'llm',
            chat: responseLLM,
            tipo: 'texto',
            id_chat_session: findChatSession[0].id_chat_session,
          },
        ]
        await db.insert(chat).values(insertParams)

        if (findChatSession[0].titulo.length === 0) {
          const generativeModelSummary = vertexModel(
            `You are an expert on summarize the user input in maximun 4 words`
          )

          const streamingResult =
            await generativeModelSummary.generateContentStream({
              contents: contents,
            })

          let fullResponse = ''
          /* return streamingResult */
          for await (const item of streamingResult.stream) {
            if (item.candidates) {
              const textChunk = item.candidates[0].content.parts[0].text

              fullResponse += textChunk
            }
          }

          /**
           * Caso contrario inserto chat desde cero
           */
          await db
            .update(chat_sessions)
            .set({
              titulo: fullResponse,
            })
            .where(
              eq(
                chat_sessions.id_chat_session,
                findChatSession[0].id_chat_session
              )
            )
        }
      }

      /**
       *
       * @param onSuccess
       */
      async function* streamGenerateContent(onSuccess: Function) {
        const streamingResult = await generativeModel.generateContentStream({
          contents: contents,
        })

        let fullResponse = ''
        /* return streamingResult */
        for await (const item of streamingResult.stream) {
          if (item.candidates) {
            const textChunk = item.candidates[0].content.parts[0].text

            fullResponse += textChunk
            yield textChunk
          }
        }
        await onSuccess(fullResponse)
      }

      yield* streamGenerateContent(saveChat)
    }),

  /**
   *
   */
  deleteChat: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input
      await db
        .update(chat_sessions)
        .set({
          activo: 0,
        })
        .where(eq(chat_sessions.uuid, id))

      return {
        status: 'ok' as const,
        data: 'Se borró el chat',
      }
    }),

  /**
   *
   */
  updateTitle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        titulo: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, titulo } = input
      await db
        .update(chat_sessions)
        .set({
          titulo: titulo,
        })
        .where(eq(chat_sessions.uuid, id))

      return {
        status: 'ok' as const,
        data: 'Se actualizó el nombre',
      }
    }),
}

export type GetChatSessions = RouterOutput['chat']['getChatSessions']
