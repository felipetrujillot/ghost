import type { UseFetchOptions } from 'nuxt/app'
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'

export function useAPI<T>(
  url: NitroFetchRequest,
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}

const r = useNuxtApp().$api as typeof $fetch
