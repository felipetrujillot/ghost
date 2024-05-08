import { router } from '../trpc'
import { companiesTrpc } from './companies'
import { notesTrpc } from './notes'
import { projectsTrpc } from './projects'
import { tasksTrpc } from './tasks'
import { userTrpc } from './users'
import type { inferRouterOutputs } from '@trpc/server'
/**
 *
 */
export const appRouter = router({
  user: userTrpc,

  companies: companiesTrpc,

  notes: notesTrpc,

  tasks: tasksTrpc,

  projects: projectsTrpc,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterOutput = inferRouterOutputs<AppRouter>
export type RouterInput = inferRouterOutputs<AppRouter>
