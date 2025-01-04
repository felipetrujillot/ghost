import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import { z, ZodSchema } from 'zod'
import {
  BcryptUsuario,
  desencriptaToken,
} from '~~/server/trpc/routers/usuarios'

type CustomEventHandler<
  T extends EventHandlerRequest,
  D,
  E extends ZodSchema
> = (
  event: H3Event<T>,
  user: { user: BcryptUsuario; input: z.infer<E> }
) => Promise<D>

/**
 *
 * @param handler
 * @returns
 */
export function defineEventHandlerZodAuth<
  T extends EventHandlerRequest,
  D,
  E extends ZodSchema
>(input: E, handler: CustomEventHandler<T, D, E>) {
  return defineEventHandler(async (event) => {
    const authorization = getCookie(event, 'token') || ''

    const user = await desencriptaToken(authorization)

    const body = await readValidatedBody(event, input.parse)

    const values = { user, input: body }

    return await handler(event, values)
  })
}
