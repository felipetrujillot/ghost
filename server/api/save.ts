import { gcpBucket } from '~~/server/db/gcp'
import { generateRandom13Digits } from '~/composables/helper'
import { authEvent } from '../auth'
import { join } from 'path'
import { writeFile } from 'fs/promises'

/**
 * Correcciones de evento
 * deprecando formidable
 */
export default defineEventHandler(async (event) => {
  await authEvent(event)

  const formData = await readFormData(event)

  const doc = formData.get('document') as File

  const arrayBuffer = await doc.arrayBuffer()
  const fileBuffer = Buffer.from(arrayBuffer)
  // Define the file path
  const filePath = join(process.cwd(), 'media', doc.name)

  // Save the file
  await writeFile(filePath, fileBuffer)
  return doc.name
})
