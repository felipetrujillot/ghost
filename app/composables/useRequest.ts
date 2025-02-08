import type { GetNotes } from '~~/server/trpc/routers/notes'
import type { GetChatSessions } from '~~/server/trpc/routers/chat'
import type { GetProyectos } from '~~/server/trpc/routers/tareas'

export const useNotes = () => useState<GetNotes>('useNotes', () => [])

export const useChatSessions = () =>
  useState<GetChatSessions>('useChatSessions', () => [])

export const useProyectosTareas = () =>
  useState<GetProyectos>('useProyectosTareas', () => [])

/**
 *
 */
export const setNotes = async () => {
  const { $trpc } = useNuxtApp()
  const notes = await $trpc.notes.getNotes.query()

  const notesUse = useNotes()

  notesUse.value = notes
}

/**
 *
 */
export const setChatSessions = async () => {
  const { $trpc } = useNuxtApp()
  const chatSessions = await $trpc.chat.getChatSessions.query()

  const chatsSessionsUse = useChatSessions()

  chatsSessionsUse.value = chatSessions
}

export const setProyectosTareas = async () => {
  const { $trpc } = useNuxtApp()
  const proyectos = await $trpc.tareas.getProyectos.query()

  const proyectosTareas = useProyectosTareas()

  proyectosTareas.value = proyectos
}
