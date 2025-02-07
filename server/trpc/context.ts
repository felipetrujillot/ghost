import { inferAsyncReturnType } from '@trpc/server'
//import { v4 as uuid } from 'uuid'
import { desencriptaToken } from './routers/usuarios'
import type { IncomingMessage, ServerResponse } from 'http'

/**
 *
 * @param req
 * @returns
 */
function getTokenFromCookie(req: IncomingMessage) {
  // Check if cookies are present in the request header
  if (!req.headers.cookie) {
    //busco header de authorization
    const headerAuth = req.headers.authorization
    if (headerAuth) return headerAuth
    return null
  }

  // Convert the cookie string to an object
  const cookies = Object.fromEntries(
    req.headers.cookie.split('; ').map((cookie) => cookie.split('='))
  )

  // Access your token by its cookie name, e.g., 'token'
  return cookies['token'] || null // Replace 'token' with your actual cookie name
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

export const createContext = async ({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
}) => {
  //const requestId = uuid()
  //res.setHeader('x-request-id', requestId)

  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn

  const publicIp = req.socket.remoteAddress || req.headers['x-forwarded-for']

  async function getUserFromHeader() {
    const authorization = getTokenFromCookie(req)

    if (authorization) {
      try {
        const user = await desencriptaToken(authorization)
        return user
      } catch (error) {
        return null
      }
    }
    return null
  }
  const user = await getUserFromHeader()
  return {
    user,
    publicIp,
    //requestId,
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
