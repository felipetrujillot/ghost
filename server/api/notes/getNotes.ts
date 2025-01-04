import { defineEventHandlerZodAuth } from '~~/server/customEvents'
import { db } from '~~/server/db/db'
import { usuarios } from '~~/server/db/db_schema'
import { z } from 'zod'

/**
 *
 */
export default defineEventHandlerZodAuth(
  z.object({
    test: z.string(),
  }),
  async (event, { user, input }) => {
    const { test } = input

    return await db.select().from(usuarios)
  }
)
