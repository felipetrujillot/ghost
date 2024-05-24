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
import { and, desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { RouterOutput } from '.'

/**
 *
 */
export const projectsTrpc = router({
  /**
   *
   */
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const { id_company } = ctx.user!

    const res = await db
      .select({
        id_project: projects.id_project,
        id_company: projects.id_company,
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
      .where(and(eq(projects.active, 1), eq(projects.id_company, id_company)))
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
    .query(async ({ input, ctx }) => {
      const { id_company } = ctx.user!
      const { id_project } = input

      /**
       */
      const res = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id_project, id_project),
            eq(projects.id_company, id_company)
          )
        )

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
    .mutation(async ({ input, ctx }) => {
      const { id_company } = ctx.user!
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
        id_company,
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

      //valido que el usuario no se encuentre agregado previamente

      const findUserProjects = await db
        .select()
        .from(projects_users)
        .where(eq(projects_users.id_user, id_user))

      /**
       *
       */
      if (findUserProjects.length > 0) {
        return {
          status: 'warning' as const,
          data: 'El usuario ya se encuentra agregado al proyecto',
        }
      }

      /**
       *
       */
      const newProjectUser = await db.insert(projects_users).values({
        id_project,
        id_user,
      })

      /**
       *
       */
      if (newProjectUser[0].insertId === 0)
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
