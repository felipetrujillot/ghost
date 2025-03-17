import type { H3Event } from 'h3'
import { desencriptaToken } from './trpc/routers/usuarios'

/**
 *
 * @param event
 */
export const authEvent = async (event: H3Event) => {
  const authorization = getCookie(event, 'token') || ''

  if (authorization) {
    try {
      const user = await desencriptaToken(authorization)
      return user
    } catch (_) {
      throw new Error('UNAUTHORIZED')
    }
  }
  throw new Error('UNAUTHORIZED')
}
