import { Storage } from '@google-cloud/storage'

/**
 * En esta ruta debes subir tu archivo json
 */
const gcpStorage = new Storage({
  projectId: 'linebox-412716',
  keyFilename: 'server/db/linebox-412716-99194e13da0c.json',
})

export const gcpBucket = gcpStorage.bucket('linebox-bucket')
