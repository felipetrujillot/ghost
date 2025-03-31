import { db } from '~~/server/db/db'
import { protectedProcedure } from '../trpc'
import { z } from 'zod'
import { gastos } from '~~/server/db/db_schema'

export const gastosTrpc = {
  /**
   *
   */
  addGasto: protectedProcedure
    .input(
      z.object({
        cantidad: z.number(),
        comentario: z.string(),
        categoria: z.string(),
        fecha: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id_usuario, id_empresa } = ctx.user!
      const { cantidad, comentario, categoria, fecha } = input

      await db.insert(gastos).values({
        cantidad,
        id_usuario,
        id_empresa,
        comentario,
        fecha,
        categoria,
      })

      return {
        status: 'ok' as const,
        data: 'Se creó correctamente',
      }
    }),
}
