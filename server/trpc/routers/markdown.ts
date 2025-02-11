import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import { promises as fs } from 'fs'
import { exec } from 'child_process'

const ROUTE_PATH = 'content/notas'

export const markdownTrpc = router({
  /**
   *
   *
   *
   */
  getFile: protectedProcedure.query(async () => {
    const filename = 'nueva.md'

    const file = await fs.readFile(`${ROUTE_PATH}/${filename}`, 'utf-8')

    return file
  }),

  /**
   *
   *
   */
  addFile: protectedProcedure.mutation(async () => {
    const filename = 'nueva.md'

    await fs.writeFile(`${ROUTE_PATH}/${filename}`, 'Hello, world!', 'utf-8')

    return {
      file: filename,
    }
  }),

  /**
   *
   */
  updateFile: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { text } = input
      const filename = 'nueva.md'

      await fs.writeFile(`${ROUTE_PATH}/${filename}`, text, 'utf-8')

      return
    }),

  /**
   *
   */
  commitFiles: protectedProcedure.mutation(async () => {
    const message = 'hi'
    exec(
      `git add . && git commit -m "${message}" && git push origin main`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Exec error: ${error}`)
          return true
        }

        return false
      }
    )

    return true
  }),
})
