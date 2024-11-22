import { router } from '../trpc'
import { notesTrpc } from './notes'
import { tasksTrpc } from './tasks'
import type { inferRouterOutputs } from '@trpc/server'
import { usuariosTrpc } from './usuarios'
import { cursosTrpc } from './cursos'
import { alumnosTrpc } from './alumnos'
import { profesoresTrpc } from './profes'
/**
 *
 */
export const appRouter = router({
  usuarios: usuariosTrpc,

  notes: notesTrpc,

  tasks: tasksTrpc,

  cursos: cursosTrpc,

  alumnos: alumnosTrpc,

  profes: profesoresTrpc,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterOutput = inferRouterOutputs<AppRouter>
export type RouterInput = inferRouterOutputs<AppRouter>
