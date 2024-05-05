import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Users, users } from '~/server/db/db_schema'
import { publicProcedure, router } from '../trpc'
import { db } from '~/server/db/db'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

/**
 *
 */
export const userTrpc = router({
  /**
   *
   */
  getUsers: publicProcedure.query(async () => {
    return await db.select().from(users)
  }),

  /**
   *
   */
  getUserById: publicProcedure
    .input(
      z.object({
        id_user: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_user } = input
      const findUser = await db
        .select()
        .from(users)
        .where(eq(users.id_user, id_user))

      return findUser[0]
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
