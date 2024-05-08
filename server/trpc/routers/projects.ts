import { db } from '~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import {
  companies,
  group_notes,
  notes,
  projects,
  tasks,
} from '~/server/db/db_schema'
import { desc, eq } from 'drizzle-orm'
import { RouterOutput } from '.'
import { z } from 'zod'

/**
 *
 */
export const projectsTrpc = router({
  /**
   *
   */
  getProjects: protectedProcedure.query(async () => {
    return await db.select().from(projects).orderBy(desc(projects.id_project))
  }),

  /**
   *
   */
  getProjectById: protectedProcedure
    .input(
      z.object({
        id_project: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_project } = input
      const res = await db
        .select()
        .from(projects)
        .where(eq(projects.id_project, id_project))
      return res[0]
    }),
})
