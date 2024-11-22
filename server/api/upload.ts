import { gcpBucket } from '~~/server/db/gcp'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import { generateRandom13Digits } from '~/composables/helper'
import sharp from 'sharp'
import axios from 'axios'

/**
 *
 */
export default defineEventHandler(async (event: any) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()

    form.parse(event.node.req, async (err, fields, files) => {
      const uploadedFile = files.document as any // Assuming the input field name is 'file'
      const [_oldName, ...formatArray] =
        uploadedFile[0].originalFilename!.split(['.']) as any

      const format = formatArray[formatArray.length - 1]

      const filename = generateRandom13Digits() + '.' + format // Change this to your desired filename with extension

      const fileBuffer = fs.readFileSync(uploadedFile[0].filepath)

      const res = await gcpBucket
        .file(filename)
        .save(fileBuffer, {
          contentType: uploadedFile.type, // Use the content type from the uploaded file
        })
        .catch((err) => {
          reject(err)
        })

      const rr = `https://storage.googleapis.com/ghost/${filename}`
      resolve(rr)
    })
  })
  return data
})

/**
 *
 * @param url
 */
export const uploadImageFromUrl = async (url: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer', // Receive response as array buffer
  })

  const imageBuffer = Buffer.from(response.data, 'binary')

  const resizedImageBuffer = await sharp(imageBuffer)
    .resize({ width: 500, height: 500 }) // Resize to 500x500
    .jpeg() // Convert to JPEG format
    .toBuffer()
  const filename = generateRandom13Digits() + '.jpg' // Change extension as needed

  const res = await gcpBucket
    .file(filename)
    .save(resizedImageBuffer, {
      contentType: 'image/jpeg', // Use the content type from the uploaded file
    })
    .catch((err) => {
      throw err
    })

  const rr = `https://storage.googleapis.com/linebox-bucket/${filename}`
  return rr
}
