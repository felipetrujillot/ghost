import { db } from '~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import {
  companies,
  group_notes,
  notes,
  projects,
  projects_users,
  tasks,
  users,
} from '~/server/db/db_schema'
import { desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { RouterOutput } from '.'

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
        total_users: sql<number>`COUNT(projects_users.id_user) AS total_users `,
      })
      .from(projects)
      .leftJoin(
        projects_users,
        eq(projects_users.id_project, projects.id_project)
      )
      .groupBy(projects.id_project)
      .where(eq(projects.active, 1))
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
  getUsersByIdProject: protectedProcedure
    .input(
      z.object({
        id_project: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_project } = input

      /**
       *
       */

      const res = await db
        .select({
          name: users.name,
          lastname: users.lastname,
          id_user: users.id_user,
          email: users.email,
          role: users.role,
          id_project: projects_users.id_project,
        })
        .from(projects_users)
        .innerJoin(users, eq(users.id_user, projects_users.id_user))
        .where(eq(projects_users.id_project, id_project))

      return res
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

  /**
   *
   */
  addUserProject: protectedProcedure
    .input(
      z.object({
        id_project: z.number(),
        id_user: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_project, id_user } = input

      const findUserProjects = await db.insert(projects_users).values({
        id_project,
        id_user,
      })

      if (findUserProjects[0].insertId === 0)
        return {
          status: 'warning' as const,
          data: 'No se agregó el colaborador',
        }

      return {
        status: 'ok' as const,
        data: 'Se agregó el colaborador al proyecto',
      }
    }),
})

export type GetUsersByIdProject =
  RouterOutput['projects']['getUsersByIdProject']
