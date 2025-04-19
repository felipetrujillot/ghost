import { protectedProcedure } from '../trpc'
import { z } from 'zod'
import { db } from '~~/server/db/db'
import {
  chat,
  chat_sessions,
  InsertChat,
  models,
  system_prompts,
  usuarios,
} from '~~/server/db/db_schema'
import { and, desc, eq } from 'drizzle-orm'
import { systemPromptTxt } from '../../db/llm'
import { v4 as uuid } from 'uuid'
import { RouterOutput } from '.'
import { Part } from '@google/genai'
import { octetInputParser } from '@trpc/server/http'
import { generateContent, generateImage } from '~~/server/db/ai'

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
          eq(chat_sessions.activo, 1),
        ),
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
      }),
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
            eq(chat_sessions.id_usuario, id_usuario),
          ),
        )

      /**
       *
       */
      const findChat = await db
        .select()
        .from(chat)
        .where(eq(chat.id_chat_session, findChatSession.id_chat_session))

      /*  const md = await createMarkdownRenderer('', {
        math: true,
        config(md) {
          // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
          const fence = md.renderer.rules.fence!
          md.renderer.rules.fence = function (tokens, idx, options, env, self) {
            const { localeIndex = 'root' } = env
            const codeCopyButtonTitle = (() => {
              switch (localeIndex) {
                case 'es':
                  return 'Copiar código'
                case 'fa':
                  return 'کپی کد'
                case 'ko':
                  return '코드 복사'
                case 'pt':
                  return 'Copiar código'
                case 'ru':
                  return 'Скопировать код'
                case 'zh':
                  return '复制代码'
                default:
                  return 'Copy code'
              }
            })()
            return fence(tokens, idx, options, env, self).replace(
              '<button title="Copy Code" class="copy"></button>',
              `<button title="${codeCopyButtonTitle}" class="copy"></button>`,
            )
          }
          // md.use(groupIconMdPlugin)
        },
      })

      const mapChat = findChat.map((c) => {
        return {
          ...c,
          chat: md.render(c.chat),
        }
      }) */

      return {
        chat_session: findChatSession,
        chat: findChat,
      }
    }),
  /**
   *
   *
   */
  addChatSession: protectedProcedure.mutation(async ({ ctx }) => {
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
        id: z.string(),
        input_chat: z.array(
          z.object({
            chat: z.string(),
            tipo: z.string(),
          }),
        ),
      }),
    )
    .mutation(async function* ({ input, ctx }) {
      const { id: requestId, input_chat } = input
      // const { prompt, requestId, url_imagen, url_pdf } = input
      const { id_empresa, id_usuario } = ctx.user!

      const [myModel] = await db
        .select({
          id_model: usuarios.id_model,
          id_system_prompt: usuarios.id_system_prompt,
          system_prompt: system_prompts.system_prompt,
          llm_model: models.llm_model,
        })
        .from(usuarios)
        .innerJoin(models, eq(models.id_model, usuarios.id_model))
        .innerJoin(
          system_prompts,
          eq(system_prompts.id_system_prompt, usuarios.id_system_prompt),
        )
        .where(eq(usuarios.id_usuario, id_usuario))

      const { system_prompt, llm_model } = myModel

      // const sys_prompt = systemPromptTxt()
      //const generativeModel = vertexModel({ system_prompt, llm_model })

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
            eq(chat_sessions.id_usuario, id_usuario),
          ),
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

      const chatParts: Part[] = []

      input_chat.forEach((c) => {
        if (c.tipo === 'texto') {
          chatParts.push({ text: c.chat })
        }

        if (c.tipo === 'imagen')
          chatParts.push({
            fileData: {
              fileUri: c.chat,
              mimeType: 'image/jpeg',
            },
          })

        if (c.tipo === 'pdf')
          chatParts.push({
            fileData: {
              fileUri: c.chat,
              mimeType: 'application/pdf',
            },
          })
      })

      contents.push({
        role: 'user',
        parts: chatParts,
      })

      /**
       *
       */
      const saveChat = async (responseLLM: string) => {
        const insertParamsUser: InsertChat[] = []

        input_chat.forEach((c) => {
          if (c.tipo === 'texto') {
            insertParamsUser.push({
              chat: c.chat,
              tipo: 'texto',
              origen: 'user',
              id_chat_session: findChatSession[0].id_chat_session,
            })
          }

          if (c.tipo === 'imagen')
            insertParamsUser.push({
              chat: c.chat,
              tipo: 'imagen',
              origen: 'user',
              id_chat_session: findChatSession[0].id_chat_session,
            })

          if (c.tipo === 'pdf')
            insertParamsUser.push({
              chat: c.chat,
              tipo: 'pdf',
              origen: 'user',
              id_chat_session: findChatSession[0].id_chat_session,
            })
        })

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
          /* const generativeModelSummary = vertexModel({
            system_prompt: `You are an expert on summarize the user input in maximun 4 words
        IMPORTANT: Give the answer in Spanish.
        IMPORTANT: Only use words and not special characters.
            `,
            llm_model: 'gemini-2.0-flash',
          }) */

          const streamingResult = await generateContent({
            system_prompt: `You are an expert on summarize the user input in maximun 4 words
        IMPORTANT: Give the answer in Spanish.
        IMPORTANT: Only use words and not special characters.
            `,
            llm_model: 'gemini-2.0-flash',
            contents: contents,
          })

          let fullResponse = ''
          /* return streamingResult */
          for await (const item of streamingResult) {
            if (item.text) {
              const textChunk = item.text
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
                findChatSession[0].id_chat_session,
              ),
            )
        }
      }

      /**
       *
       * @param onSuccess
       */
      async function* streamGenerateContent(onSuccess: Function) {
        let fullResponse = ''

        if (llm_model === 'gemini-2.0-flash-exp') {
          const imageRes = await generateImage({
            system_prompt:
              'You are an expert on generate images, use the provided context ONLY GENERATE IMAGES',
            llm_model: 'gemini-2.0-flash-exp',
            contents: contents,
          })

          const llmImageResponse = `![Alt Text](${imageRes})`

          console.log(llmImageResponse)
          fullResponse += llmImageResponse
          yield llmImageResponse
        } else {
          const streamingResult = await generateContent({
            system_prompt: system_prompt,
            llm_model,
            contents: contents,
          })

          for await (const item of streamingResult) {
            if (item.text) {
              fullResponse += item.text
              yield item.text
            }
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
      }),
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
      }),
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
