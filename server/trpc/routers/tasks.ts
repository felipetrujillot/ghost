import { db } from '~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { companies, group_notes, notes, tasks } from '~/server/db/db_schema'
import { desc, eq } from 'drizzle-orm'
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
      return await db
        .select()
        .from(tasks)
        .where(eq(tasks.id_project, id_project))
    }),

  /**
   *
   */
  updateTask: protectedProcedure
    .input(
      z.object({
        id_task: z.number(),
        task_status: z.number(),
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
})

export type GetTasksByIdProject = RouterOutput['tasks']['getTasksByIdProject']
