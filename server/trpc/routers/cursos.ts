import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { cursos } from '~~/server/db/db_schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { RouterOutput } from '.'

export const cursosTrpc = router({
  /**
   *
   */
  getCursos: protectedProcedure.query(async ({ ctx }) => {
    const { id_empresa } = ctx.user!

    return await db
      .select()
      .from(cursos)
      .where(eq(cursos.id_empresa, id_empresa))
  }),

  /**
   *
   */
  addCurso: protectedProcedure
    .input(
      z.object({
        nombre_curso: z.string().min(1),
        nivel_curso: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id_empresa } = ctx.user!

      const { nombre_curso, nivel_curso } = input

      const insertCurso = await db.insert(cursos).values({
        nombre_curso,
        nivel_curso,
        id_empresa,
      })

      if (insertCurso[0].insertId === 0)
        return {
          status: 'err' as const,
          data: 'Hubo un problema al crear el curso',
          id_curso: 0,
        }

      return {
        status: 'ok' as const,
        data: 'Hubo un problema al crear el curso',
        id_curso: insertCurso[0].insertId,
      }
    }),

  /**
   *
   */
  updateCurso: protectedProcedure
    .input(
      z.object({
        id_curso: z.number().min(1),
        nombre_curso: z.string().min(1),
        nivel_curso: z.string().min(1),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id_empresa } = ctx.user!

      const { nombre_curso, id_curso, nivel_curso } = input

      await db
        .update(cursos)
        .set({
          nombre_curso,
          nivel_curso,
          id_empresa,
        })
        .where(eq(cursos.id_curso, id_curso))
    }),
})

export type GetCursos = RouterOutput['cursos']['getCursos']
