import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { usuarios, empresas, passwords_reset } from '~~/server/db/db_schema'
import { protectedProcedure, publicProcedure, router } from '../trpc'
import { db } from '~~/server/db/db'
import { z } from 'zod'
import { and, desc, eq, sql } from 'drizzle-orm'
import type { RouterOutput } from '.'
import { generateRandom13Digits } from '~/composables/helper'
import { rejects } from 'assert'

/**
 *
 */
export const usuariosTrpc = router({
  /**
   * Busca un proyecto según
   * @param email
   * @param password
   */
  loginApi: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { email, password } = opts.input

      /**
       * busca usuario y válida que esté activo
       */
      const usuario = await db
        .select({
          activo: empresas.activo,
          id_usuario: usuarios.id_usuario,
          id_empresa: usuarios.id_empresa,
          nombre: usuarios.nombre,
          role: usuarios.role,
          email: usuarios.email,
          password: usuarios.password,
          created_at: usuarios.created_at,
          updated_at: usuarios.updated_at,
        })
        .from(usuarios)
        .innerJoin(empresas, eq(empresas.id_empresa, usuarios.id_empresa))
        .where(
          and(eq(usuarios.email, email.toLocaleLowerCase().replace(/\s/g, '')))
        )
        .limit(1)

      if (usuario.length == 0) {
        return {
          status: 'err' as const,
          data: 'No se encontró el usuario',
        } as const
      }
      if (usuario[0].activo === 0) {
        return {
          status: 'err' as const,
          data: 'El usuario no se encuentra activo',
        } as const
      }

      let dbPass = String(usuario[0].password.replace(/\s/g, ''))
      dbPass = dbPass.replace(/^\$2y(.+)$/i, '$2a$1')

      const res = await bcryptToken(usuario[0], password, dbPass)

      return res
    }),

  /**
   *
   */
  validaToken: protectedProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { token } = input
      const res = await desencriptaToken(token)
      return res
    }),

  /**
   *
   */
  getUserById: protectedProcedure
    .input(
      z.object({
        id_usuario: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id_usuario } = input
      const findUser = await db
        .select({
          nombre: usuarios.nombre,
          email: usuarios.email,
          id_usuario: usuarios.id_usuario,
          activo: usuarios.activo,
          nombre_empresa: empresas.nombre_empresa,
        })
        .from(usuarios)
        .innerJoin(empresas, eq(empresas.id_empresa, usuarios.id_empresa))
        .where(eq(usuarios.id_usuario, id_usuario))

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
  return decoded as BcryptUsuario
}

/**
 * Genera un hash en base de una password
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

type LoginResponse =
  | {
      status: 'ok'
      data: string
      token: string
      usuario_db: BcryptUsuario
    }
  | {
      status: 'err'
      data: string
    }

export type BcryptUsuario = {
  activo: number
  id_usuario: number
  role: number
  id_empresa: number
  nombre: string
  password: string
  email: string
  created_at: Date
  updated_at: Date | null
}
/**
 *
 * @param usuario
 * @param id_empresa
 * @param password
 * @param dbPass
 * @returns
 */
export const bcryptToken = async (
  usuario: BcryptUsuario,
  password: string,
  dbPass: string
) => {
  const config = useRuntimeConfig()

  const decoded: LoginResponse = await new Promise((resolve) => {
    bcrypt.compare(password, dbPass, (bcryptErr, isMatch) => {
      if (bcryptErr || !isMatch)
        resolve({
          status: 'err' as const,
          data: 'La contraseña es incorrecta',
        })

      // Create and sign the JWT token
      const token = jwt.sign(usuario, config.jwtSecret as string, {
        expiresIn: '3y',
      })
      resolve({
        status: 'ok' as const,
        data: 'Login correcto',
        usuario_db: usuario,
        token: token,
      })
    })
  })

  return decoded
}
