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
  const formData = await readMultipartFormData(event)

  if (!formData) return 'error'

  const findData = formData.find((item) => item.name === 'document')!

  const arrayBuffer = findData.data

  // const doc = formData.get('document') as File

  //const arrayBuffer = await doc.arrayBuffer()
  const fileBuffer = Buffer.from(arrayBuffer)
  // Define the file path
  const filePath = join(process.cwd(), 'public', findData.filename!)

  // Save the file
  await writeFile(filePath, fileBuffer)
  return 'okay'
})
