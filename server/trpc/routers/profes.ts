import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { profesores } from '~~/server/db/db_schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { RouterOutput } from '.'

export const profesoresTrpc = router({
  /**
   *
   */
  getProfesores: protectedProcedure.query(async ({ ctx }) => {
    const { id_empresa } = ctx.user!

    return await db
      .select()
      .from(profesores)
      .where(eq(profesores.id_empresa, id_empresa))
  }),

  getProfesorId: protectedProcedure
    .input(
      z.object({
        id_profesor: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id_empresa } = ctx.user!

      const { id_profesor } = input
      return await db
        .select()
        .from(profesores)
        .where(
          and(
            eq(profesores.id_empresa, id_empresa),
            eq(profesores.id_profesor, id_profesor)
          )
        )
    }),
  /**
   *
   */
  addProfesor: protectedProcedure
    .input(
      z.object({
        nombre: z.string(),
        nombre_segundo: z.string(),
        apellido_paterno: z.string(),
        apellido_materno: z.string(),
        rut: z.string(),
        email: z.string(),
        //  nacionalidad: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id_empresa } = ctx.user!

      const insertCurso = await db.insert(profesores).values({
        ...input,
        id_empresa: id_empresa,
      })

      if (insertCurso[0].insertId === 0)
        return {
          status: 'err' as const,
          data: 'Hubo un problema al crear el alumno',
          id_curso: 0,
        }

      return {
        status: 'ok' as const,
        data: 'Hubo un problema al crear el alumno',
        id_curso: insertCurso[0].insertId,
      }
    }),
})

export type GetProfesores = RouterOutput['profes']['getProfesores']
