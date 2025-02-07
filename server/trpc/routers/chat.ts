import { protectedProcedure } from '../trpc'
import { z } from 'zod'
import { db } from '~~/server/db/db'
import { chat, chat_sessions } from '~~/server/db/db_schema'
import { and, desc, eq } from 'drizzle-orm'
import { systemPrompt, vertexModel } from './llm'
import { v4 as uuid } from 'uuid'

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
          eq(chat_sessions.id_usuario, id_usuario)
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

      return findChat
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
      })
    )
    .mutation(async function* ({ input, ctx }) {
      const { prompt, requestId } = input
      const { id_empresa, id_usuario } = ctx.user!

      const generativeModel = vertexModel(
        `You are an expert developer on Vue 3 with script setup, react, typescript, tailwind`
      )

      const contents: {
        role: string
        parts: {
          text: string
        }[]
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

      contents.push({ role: 'user', parts: [{ text: prompt }] })

      /**
       *
       */
      const saveChat = async (responseLLM: string) => {
        await db.insert(chat).values([
          {
            origen: 'user',
            chat: prompt,
            id_chat_session: findChatSession[0].id_chat_session,
          },
          {
            origen: 'llm',
            chat: responseLLM,
            id_chat_session: findChatSession[0].id_chat_session,
          },
        ])

        if (findChatSession[0].titulo.length === 0) {
          const generativeModelSummary = vertexModel(
            `You are an expert on summarize text`
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
}
