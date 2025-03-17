import { gcpBucket } from '~~/server/db/gcp'
import { generateRandom13Digits } from '~/composables/helper'
import { authEvent } from '~~/server/auth'

/**
 * Correcciones de evento
 * deprecando formidable
 */
export default defineEventHandler(async (event) => {
  await authEvent(event)

  const formData = await readFormData(event)

  const doc = formData.get('document') as File

  const originalFilename = doc.name
  const randomDigit = generateRandom13Digits()

  const filename =
    randomDigit.toString() + '_' + originalFilename.replace(' ', '_')

  const arrayBuffer = await doc.arrayBuffer()
  const fileBuffer = Buffer.from(arrayBuffer)

  await gcpBucket
    .file(filename)
    .save(fileBuffer, {
      contentType: doc.type,
    })
    .catch((err) => {
      throw new Error('Hubo un problema al intentar subir el documento')
    })

  const rr = `https://storage.googleapis.com/linebox-bucket/${filename}`
  return rr
})
