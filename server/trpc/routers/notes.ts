import { db } from '~~/server/db/db'
import { protectedProcedure, router } from '../trpc'
import { group, notes } from '~~/server/db/db_schema'
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
    const findNotes = await db
      .select({
        id_note: notes.id_note,
        id_group: notes.id_group,
        note_name: notes.note_name,
      })
      .from(notes)
      .orderBy(desc(notes.id_note))
      .where(eq(notes.active, 1))

    const findGroups = await db
      .select()
      .from(group)
      .orderBy(desc(group.id_group))
      .where(eq(group.active, 1))

    type ArrayOfGroups = (typeof findGroups)[0] & { notes: typeof findNotes }
    const newArr: ArrayOfGroups[] = []

    findGroups.forEach((g) => {
      const foundedArray: typeof findNotes = []
      findNotes.forEach((n) => {
        if (g.id_group === n.id_group) {
          foundedArray.push(n)
        }
      })

      newArr.push({
        ...g,
        notes: foundedArray,
      })
    })

    return newArr
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
        note_text: z.string(),
        note_name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id_note, note_text, note_name } = input

      await db
        .update(notes)
        .set({ note_text, note_name })
        .where(eq(notes.id_note, id_note))

      return {
        status: 'ok' as const,
        data: 'Se actualizó la nota',
      }
    }),

  /**
   *
   */
  newNote: protectedProcedure
    .input(
      z.object({
        note_text: z.string(),
        note_name: z.string(),
        id_group: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { note_text, note_name, id_group } = input
      const insertNote = await db.insert(notes).values({
        id_group,
        note_text,
        note_name,
      })
      return {
        status: 'ok' as const,
        data: insertNote[0].insertId,
      }
    }),
})

export type GetNotes = RouterOutput['notes']['getNotes']
