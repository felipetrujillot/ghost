import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Users, companies, users } from '~/server/db/db_schema'
import { publicProcedure, router } from '../trpc'
import { db } from '~/server/db/db'
import { z } from 'zod'
import { and, desc, eq } from 'drizzle-orm'
import { RouterOutput } from '.'

/**
 *
 */
export const userTrpc = router({
  /**
   * Busca un proyecto según id_proyecto_linkcloud
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
    .mutation(async (opts): Promise<LoginResponse> => {
      const { email, password } = opts.input

      /**
       * busca usuario y válida que esté active
       */
      const usuario = await db
        .select({
          active: companies.active,
          id_user: users.id_user,
          id_company: users.id_company,
          name: users.name,
          lastname: users.lastname,
          password: users.password,
          email: users.email,
          birthdate: users.birthdate,
          healthcare: users.healthcare,
          area: users.area,
          gender: users.gender,
          phone: users.phone,
          logged_in: users.logged_in,
          role: users.role,
          created_at: users.created_at,
          updated_at: users.updated_at,
        })
        .from(users)
        .innerJoin(companies, eq(companies.id_company, users.id_company))
        .where(
          and(eq(users.email, email.toLocaleLowerCase().replace(/\s/g, '')))
        )
        .limit(1)

      if (usuario.length == 0) {
        return {
          status: 'err' as const,
          data: 'No se encontró el usuario',
        } as const
      }
      if (usuario[0].active === 0) {
        return {
          status: 'err' as const,
          data: 'El usuario no se encuentra active',
        } as const
      }

      let dbPass = String(usuario[0].password.replace(/\s/g, ''))
      dbPass = dbPass.replace(/^\$2y(.+)$/i, '$2a$1')

      const bcrypt = await bcryptToken(usuario[0], password, dbPass)

      await db
        .update(users)
        .set({ logged_in: 1 })

        .where(eq(users.id_user, usuario[0].id_user))
      return bcrypt
    }),

  /**
   *
   */
  validaToken: publicProcedure
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
  getUsers: publicProcedure.query(async () => {
    return await db
      .select({
        name: users.name,
        email: users.email,
        id_user: users.id_user,
        company_name: companies.company_name,
      })
      .from(users)
      .innerJoin(companies, eq(companies.id_company, users.id_company))
      .orderBy(desc(users.id_user))
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
        .select({
          name: users.name,
          lastname: users.lastname,
          email: users.email,
          role: users.role,
          birthdate: users.birthdate,
          id_user: users.id_user,
          company_name: companies.company_name,
        })
        .from(users)
        .innerJoin(companies, eq(companies.id_company, users.id_company))
        .where(eq(users.id_user, id_user))

      return findUser[0]
    }),

  /**
   *
   */
  updateUser: publicProcedure
    .input(
      z.object({
        id_user: z.number(),
        name: z.string(),
        lastname: z.string(),
        role: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      {
        const { id_user, ...updateParams } = input
        const updateUser = await db
          .update(users)
          .set(updateParams)
          .where(eq(users.id_user, id_user))

        if (updateUser[0].changedRows === 0) {
          return {
            status: 'warning' as const,
            data: 'No se realizó ningún cambio',
          }
        }

        return {
          status: 'ok' as const,
          data: 'La información se actualizó correctamente',
        }
      }
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

type LoginResponse =
  | { status: 'err'; data: string }
  | {
      status: 'ok'
      data: string
      token: string
      usuario_db: Users
    }

/**
 *
 * @param usuario
 * @param id_company
 * @param password
 * @param dbPass
 * @returns
 */
export const bcryptToken = async (
  usuario: Users,
  password: string,
  dbPass: string
) => {
  const config = useRuntimeConfig()

  const usuarioPartner = {
    ...usuario,
  }
  const decoded: LoginResponse = <LoginResponse>await new Promise((resolve) => {
    bcrypt.compare(password, dbPass, (bcryptErr, isMatch) => {
      if (bcryptErr || !isMatch) {
        resolve({
          status: 'err' as const,
          data: 'La contraseña no es válida',
        })
      }

      // Create and sign the JWT token
      const token = jwt.sign(usuarioPartner, config.jwtSecret as string, {
        expiresIn: '3y',
      })
      resolve({
        status: 'ok' as const,
        data: 'Login correcto',
        usuario_db: usuarioPartner,
        token: token,
      })
    })
  })

  return decoded
}

export type GetUsers = RouterOutput['user']['getUsers']
