import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Users } from '~/server/db/db_schema'
import { publicProcedure, router } from '../trpc'

/**
 *
 */
export const userTrpc = router({
  /**
   *
   */
  getUsers: publicProcedure.query(async () => {
    return {}
  }),
})

/**
 * Desencripta un token jwt, retorna objeto
 * @param bearerToken
 */
export const desencriptaToken = async (bearerToken: string) => {
  const config = useRuntimeConfig()

  const token = bearerToken.replace('Bearer ', '')

  const decoded = await new Promise((resolve) => {
    jwt.verify(token, config.jwtSecret as string, (err, decoded) => {
      if (err) {
        throw err
      } else {
        resolve(decoded)
      }
    })
  })
  return decoded as Users
}

/**
 *
 * @param plaintextPassword
 */
export const hashPasswordBcrypt = async (plaintextPassword: string) => {
  // Generate a salt
  const salt = await bcrypt.genSalt(10)
  // Hash the password with the generated salt
  const hash = await bcrypt.hash(plaintextPassword, salt)
  // Return the hashed password
  return hash
}
