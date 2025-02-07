import type { AppRouter } from '~~/server/trpc/routers'
import { unstable_httpBatchStreamLink } from '@trpc/client'
export default defineNuxtPlugin(async () => {
  const { createTRPCNuxtClient } = await import('trpc-nuxt/client')

  /* *
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const trpc_stream = createTRPCNuxtClient<AppRouter>({
    links: [
      unstable_httpBatchStreamLink({
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
