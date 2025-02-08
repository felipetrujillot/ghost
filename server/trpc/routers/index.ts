import { router } from '../trpc'
import { notesTrpc } from './notes'
import { tareasTrpc } from './tareas'
import type { inferRouterOutputs } from '@trpc/server'
import { usuariosTrpc } from './usuarios'
import { chatTrpc } from './chat'
/**
 *
 */
export const appRouter = router({
  usuarios: usuariosTrpc,

  notes: notesTrpc,

  tareas: tareasTrpc,

  chat: chatTrpc,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterOutput = inferRouterOutputs<AppRouter>
export type RouterInput = inferRouterOutputs<AppRouter>
