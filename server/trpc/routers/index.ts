import { router } from '../trpc'
import { companiesTrpc } from './companies'
import { notesTrpc } from './notes'
import { userTrpc } from './users'
import type { inferRouterOutputs } from '@trpc/server'
/**
 *
 */
export const appRouter = router({
  user: userTrpc,

  companies: companiesTrpc,

  notes: notesTrpc,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterOutput = inferRouterOutputs<AppRouter>
export type RouterInput = inferRouterOutputs<AppRouter>
