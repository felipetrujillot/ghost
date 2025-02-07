import type { AppRouter } from '~~/server/trpc/routers'
export default defineNuxtPlugin(async () => {
  const { createTRPCNuxtClient, httpBatchLink } = await import(
    'trpc-nuxt/client'
  )

  /* *
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
