/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server'
import { Context } from '~~/server/trpc/context'

const t = initTRPC.context<Context>().create()

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

// you can reuse this for any procedure
export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts
  // `ctx.user` is nullable
  if (!ctx.user) {
    //     ^?
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.user,
      // ^?
    },
  })
})

export const router = t.router
export const middleware = t.middleware
