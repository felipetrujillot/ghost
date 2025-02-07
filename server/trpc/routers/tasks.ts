import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { tasks, tasks_users, usuarios } from '~~/server/db/db_schema'
import { eq } from 'drizzle-orm'
import { RouterOutput } from '.'
import { z } from 'zod'

/**
 *
 */
export const tasksTrpc = router({
  /**
   *
   */
  getTasksByIdProject: protectedProcedure
    .input(
      z.object({
        id_project: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_project } = input

      const findTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id_project, id_project))

      return findTasks
    }),

  /**
   *
   */
  getusuariosByIdTask: protectedProcedure
    .input(
      z.object({
        id_task: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_task } = input

      const findTasks = await db
        .select({
          nombre: usuarios.nombre,
          id_usuario: usuarios.id_usuario,
          id_task: tasks_users.id_task,
          id_task_user: tasks_users.id_task_user,
          email: usuarios.email,
          active: tasks_users.active,
        })
        .from(tasks_users)
        .innerJoin(usuarios, eq(usuarios.id_usuario, tasks_users.id_usuario))
        .where(eq(tasks_users.id_task, id_task))

      return findTasks
    }),

  /**
   *
   */
  updateTask: protectedProcedure
    .input(
      z.object({
        id_task: z.number(),
        task_status: z.number(),
        active: z.number(),
        task_name: z.string(),
        task_description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_task, ...params } = input
      await db.update(tasks).set(params).where(eq(tasks.id_task, id_task))

      return {
        status: 'ok' as const,
        data: 'Se actualizó correctamente',
      }
    }),

  /**
   *
   */
  newTask: protectedProcedure
    .input(
      z.object({
        task_status: z.number(),
        id_project: z.number(),
        task_name: z.string(),
        task_description: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { task_name, task_status, id_project, task_description } = input

      const insertTask = await db.insert(tasks).values({
        task_name,
        task_status,
        task_description,
        id_project,
      })

      const findTask = await db
        .select()
        .from(tasks)
        .where(eq(tasks.id_task, insertTask[0].insertId))

      return {
        status: 'ok' as const,
        data: findTask[0],
      }
    }),
  /**
   *
   */
})

export type GetTasksByIdProject = RouterOutput['tasks']['getTasksByIdProject']
export type GetusuariosByIdTask = RouterOutput['tasks']['getusuariosByIdTask']
