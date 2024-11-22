import { createNuxtApiHandler } from 'trpc-nuxt'
import { appRouter } from '~~/server/trpc/routers'
import { createContext } from '~~/server/trpc/context'

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError(opts) {
    //const { error, type, path, input, ctx, req } = opts
    const { error } = opts
    console.error('Error:', error)
  },
})
