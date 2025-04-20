import { createTRPCNuxtHandler } from 'trpc-nuxt/server'
import { appRouter } from '~~/server/trpc/routers'
import { createContext } from '~~/server/trpc/context'

// export API handler
export default createTRPCNuxtHandler({
  router: appRouter,
  createContext,
  onError(opts) {
    //const { error, type, path, input, ctx, req } = opts
    const { error } = opts
    console.error('Error:', error)
  },
})
