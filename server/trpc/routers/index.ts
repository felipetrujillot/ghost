import { router } from '../trpc'
import { companiesTrpc } from './companies'
import { userTrpc } from './users'
import type { inferRouterOutputs } from '@trpc/server'
/**
 *
 */
export const appRouter = router({
  user: userTrpc,

  companies: companiesTrpc,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterOutput = inferRouterOutputs<AppRouter>
export type RouterInput = inferRouterOutputs<AppRouter>
