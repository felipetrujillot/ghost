export type ChatAI = {
  origen: 'llm' | 'user'
  tipo: 'imagen' | 'texto' | 'pdf'
  chat: string
}

export const useChat = () => useState<ChatAI[]>('useChat', () => [])

export const DEFAULT_CHAT: ChatAI[] = [
  {
    origen: 'user' as const,
    chat: 'hi',
    tipo: 'texto' as const,
  },
  {
    origen: 'llm' as const,
    chat: `
## undefined

built with nuxt.
`,
    tipo: 'texto' as const,
  },
]
/**
 *
 */
export const cleanChat = () => {
  const chat = useChat()
  chat.value = []
}

/**
 *
 */
export const addItemsChat = (newChat: ChatAI[]) => {
  const chat = useChat()

  chat.value.push(...newChat)
}
