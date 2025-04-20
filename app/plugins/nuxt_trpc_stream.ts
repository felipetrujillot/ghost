import type { AppRouter } from '~~/server/trpc/routers'
import { createTRPCClient, httpBatchStreamLink } from '@trpc/client'
//import { httpBatchStreamLink } from '@trpc/client'
export default defineNuxtPlugin(async () => {
  // const { createTRPCNuxtClient } = await import('trpc-nuxt/client')

  /* *
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const trpc_stream = createTRPCClient<AppRouter>({
    links: [
      httpBatchStreamLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      trpc_stream,
    },
  }
})
