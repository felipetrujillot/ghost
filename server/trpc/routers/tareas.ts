import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { proyectos, tareas, usuarios } from '~~/server/db/db_schema'
import { eq } from 'drizzle-orm'
import { RouterOutput } from '.'
import { z } from 'zod'

/**
 *
 */
export const tareasTrpc = router({
  /**
   *
   *
   *
   */
  getProyectos: protectedProcedure.query(async ({ ctx }) => {
    const { id_empresa } = ctx.user

    return await db
      .select()
      .from(proyectos)
      .where(eq(proyectos.id_empresa, id_empresa))
  }),
  /**
   *
   */
  getTareasByIdProyecto: protectedProcedure
    .input(
      z.object({
        id_proyecto: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id_proyecto } = input

      const findTasks = await db
        .select()
        .from(tareas)
        .where(eq(tareas.id_proyecto, id_proyecto))

      return findTasks
    }),

  /**
   *
   */
  updateTarea: protectedProcedure
    .input(
      z.object({
        id_tarea: z.number(),
        estado_tarea: z.string(),
        activo: z.number(),
        nombre_tarea: z.string(),
        descripcion_tarea: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_tarea, ...params } = input
      await db.update(tareas).set(params).where(eq(tareas.id_tarea, id_tarea))

      return {
        status: 'ok' as const,
        data: 'Se actualizó correctamente',
      }
    }),

  /**
   *
   */
  addTarea: protectedProcedure
    .input(
      z.object({
        estado_tarea: z.string(),
        id_proyecto: z.number(),
        nombre_tarea: z.string(),
        descripcion_tarea: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { nombre_tarea, estado_tarea, id_proyecto, descripcion_tarea } =
        input

      const insertTask = await db.insert(tareas).values({
        nombre_tarea,
        estado_tarea,
        descripcion_tarea,
        id_proyecto,
      })

      const findTask = await db
        .select()
        .from(tareas)
        .where(eq(tareas.id_tarea, insertTask[0].insertId))

      return {
        status: 'ok' as const,
        data: findTask[0],
      }
    }),
  /**
   *
   */
})

export type GetTareasByIdProyecto =
  RouterOutput['tareas']['getTareasByIdProyecto']

export type GetProyectos = RouterOutput['tareas']['getProyectos']
