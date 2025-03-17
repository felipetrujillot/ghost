import { join } from 'path'
import { readFile } from 'fs/promises'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'filename') as string

  const filePath = join(process.cwd(), 'public', name)

  return await readFile(filePath)
  return filePath
})
