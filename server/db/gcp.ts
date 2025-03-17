import { Storage } from '@google-cloud/storage'

/**
 * En esta ruta debes subir tu archivo json
 */
const gcpStorage = new Storage({
  projectId: 'linebox-412716',
  keyFilename: 'server/db/linebox-412716-fe1f0c92ff90.json',
})

export const gcpBucket = gcpStorage.bucket('linebox-bucket')
