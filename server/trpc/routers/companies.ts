import { db } from '~/server/db/db'
import { publicProcedure, router } from '../trpc'
import { companies } from '~/server/db/db_schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

/**
 *
 */
export const companiesTrpc = router({
  /**
   *
   */
  getCompanies: publicProcedure.query(async () => {
    return await db.select().from(companies)
  }),

  /**
   *
   */
  getCompanyById: publicProcedure
    .input(
      z.object({
        id_company: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_company } = input
      const res = await db
        .select()
        .from(companies)
        .where(eq(companies.id_company, id_company))

      return res[0]
    }),
})
