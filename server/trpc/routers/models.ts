import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { models, usuarios } from '~~/server/db/db_schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { RouterOutput } from '.'

export const modelsTrpc = router({
  /**
   * Listado de modelos soportados
   */
  getModels: protectedProcedure.query(async ({ ctx }) => {
    return await db.select().from(models).where(eq(models.activo, 1))
  }),

  /**
   *
   *
   *
   */
  setModel: protectedProcedure
    .input(
      z.object({
        id_model: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id_usuario } = ctx.user!
      const { id_model } = input

      await db
        .update(usuarios)
        .set({
          id_model: id_model,
        })
        .where(eq(usuarios.id_usuario, id_usuario))

      return {
        status: 'ok' as const,
        data: 'Se cambió correctamente',
      }
    }),
})

export type GetModels = RouterOutput['models']['getModels']
