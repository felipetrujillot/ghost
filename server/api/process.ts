import { authEvent } from '~~/server/auth'

/**
 * Correcciones de evento
 * deprecando formidable
 */
export default defineEventHandler(async (event) => {
  await authEvent(event)

  const file_url = await readBody(event)

  const file = await fetch(file_url)

  const arrayBuffer = await file.arrayBuffer()
  const fileBuffer = Buffer.from(arrayBuffer)
})
