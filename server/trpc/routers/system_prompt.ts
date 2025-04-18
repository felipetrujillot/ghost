import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { models, system_prompts, usuarios } from '~~/server/db/db_schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { systemPrompt } from '../../db/llm'
import { RouterOutput } from '.'

export const systemPromptsTrpc = router({
  /**
   * Listado de system prompts
   */
  getSystemPrompts: protectedProcedure.query(async () => {
    return await db
      .select()
      .from(system_prompts)
      .where(eq(system_prompts.activo, 1))
  }),

  /**
   *
   *
   *
   */
  setSystemPrompt: protectedProcedure
    .input(
      z.object({
        id_system_prompt: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { id_usuario } = ctx.user!
      const { id_system_prompt } = input

      await db
        .update(usuarios)
        .set({
          id_system_prompt: id_system_prompt,
        })
        .where(eq(usuarios.id_usuario, id_usuario))

      return {
        status: 'ok' as const,
        data: 'Se cambió correctamente',
      }
    }),
})

export type GetSystemPrompts = RouterOutput['system_prompt']['getSystemPrompts']
