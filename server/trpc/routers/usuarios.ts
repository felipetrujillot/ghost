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
          project_id: empresas.project_id,
          id_usuario: usuarios.id_usuario,
          id_empresa: usuarios.id_empresa,
          nombre: usuarios.nombre,
          apellido: usuarios.apellido,
          password: usuarios.password,
          email: usuarios.email,
          fecha_nacimiento: usuarios.fecha_nacimiento,
          area: usuarios.area,
          gender: usuarios.gender,
          celular: usuarios.celular,
          logged_in: usuarios.logged_in,
          role: usuarios.role,
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
  welcomeUser: protectedProcedure
    .input(
      z.object({
        nombre: z.string().min(1),
        apellido: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id_usuario } = ctx.user

      const findUser = await db
        .select({
          id_usuario: usuarios.id_usuario,
          email: usuarios.email,
          activo: usuarios.activo,
          logged_in: usuarios.logged_in,
        })
        .from(usuarios)
        .where(eq(usuarios.id_usuario, id_usuario))

      if (findUser[0].activo === 0) {
        return {
          status: 'error' as const,
          data: 'El usuario no se encuentra activo en la plataforma',
        }
      }

      if (findUser[0].logged_in === 1) {
        return {
          status: 'error' as const,
          data: 'El usuario ya ha actualizado estos datos',
        }
      }

      const { nombre, apellido } = input

      await db
        .update(usuarios)
        .set({
          nombre: nombre,
          apellido: apellido,
        })
        .where(eq(usuarios.id_usuario, id_usuario))

      await db
        .update(usuarios)
        .set({ logged_in: 1 })

        .where(eq(usuarios.id_usuario, id_usuario))

      return {
        status: 'ok' as const,
        data: 'Bienvenido a amalia',
      }
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
          apellido: usuarios.apellido,
          email: usuarios.email,
          role: usuarios.role,
          rut: usuarios.rut,
          fecha_nacimiento: usuarios.fecha_nacimiento,
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

type BcryptUsuario = {
  activo: number
  project_id: string
  id_usuario: number
  id_empresa: number
  nombre: string
  apellido: string
  password: string
  email: string
  fecha_nacimiento: string
  area: number
  gender: number
  celular: number
  logged_in: number
  role: number
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
