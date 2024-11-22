import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { alumnos, cursos } from '~~/server/db/db_schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { RouterOutput } from '.'

export const alumnosTrpc = router({
  /**
   *
   */
  getAlumnos: protectedProcedure.query(async ({ ctx }) => {
    const { id_empresa } = ctx.user!

    return await db
      .select()
      .from(alumnos)
      .where(eq(alumnos.id_empresa, id_empresa))
  }),

  getAlumnoId: protectedProcedure
    .input(
      z.object({
        id_alumno: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id_empresa } = ctx.user!

      const { id_alumno } = input
      return await db
        .select()
        .from(alumnos)
        .where(
          and(
            eq(alumnos.id_empresa, id_empresa),
            eq(alumnos.id_alumno, id_alumno)
          )
        )
    }),
  /**
   *
   */
  addAlumno: protectedProcedure
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

      const insertCurso = await db.insert(alumnos).values({
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

  /**
   *
   */
  /*  updateCurso: protectedProcedure
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
    }), */
})

export type GetAlumnos = RouterOutput['alumnos']['getAlumnos']
