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
    const res = await db
      .select({
        id_project: projects.id_project,
        project_name: projects.project_name,
        total_tasks: projects.progress,
        progress: projects.progress,
      })
      .from(projects)
      //.innerJoin(tasks, eq(tasks.id_project, projects.id_project))
      .orderBy(desc(projects.id_project))

    return res
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

  /**
   *
   */
  newProject: protectedProcedure
    .input(
      z.object({
        project_name: z.string(),
        project_description: z.string(),
        project_company: z.string(),
        project_category: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        project_name,
        project_description,
        project_company,
        project_category,
      } = input

      const insertProject = await db.insert(projects).values({
        project_company,
        project_description,
        project_category,
        project_name,
        progress: 0,
      })
      return {
        status: 'ok' as const,
        data: insertProject[0].insertId,
      }
    }),
})
