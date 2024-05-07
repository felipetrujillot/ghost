import { db } from '~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { companies, notes } from '~/server/db/db_schema'
import { desc, eq } from 'drizzle-orm'
import { RouterOutput } from '.'
import { z } from 'zod'

/**
 *
 */
export const notesTrpc = router({
  /**
   *
   */
  getNotes: protectedProcedure.query(async () => {
    return await db.select().from(notes).orderBy(desc(notes.id_note))
  }),

  /**
   *
   */
  getNoteById: protectedProcedure
    .input(
      z.object({
        id_note: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_note } = input
      const findNote = await db
        .select()
        .from(notes)
        .where(eq(notes.id_note, id_note))
        .limit(1)

      return findNote[0]
    }),

  /**
   *
   */
  updateNote: protectedProcedure
    .input(
      z.object({
        id_note: z.number(),
        text_note: z.string(),
        title_note: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_note, text_note, title_note } = input

      await db
        .update(notes)
        .set({ text_note, title_note })
        .where(eq(notes.id_note, id_note))

      return {
        status: 'ok' as const,
        data: 'Se actualizó la nota',
      }
    }),

  /**
   *
   */
  newNote: protectedProcedure.query(async () => {
    const insertNote = await db.insert(notes).values({
      text_note: '',
      title_note: 'Nueva nota',
    })
    return {
      status: 'ok' as const,
      data: insertNote[0].insertId,
    }
  }),
})

export type GetCompanies = RouterOutput['companies']['getCompanies']
