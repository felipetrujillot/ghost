<script setup lang="ts">
import markdownit from 'markdown-it'

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
documentTitle('chat')

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

const { $trpc, $router, $trpc_stream } = useNuxtApp()

const route = useRoute()

const chatLLM = ref('')
const status = ref<'idle' | 'pending' | 'generating'>('idle')

const textoMd = `
## undefined

built with nuxt.
`
type ChatAI = {
  origen: 'llm' | 'user'
  chat: string
}

const DEFAULT_CHAT = [
  {
    origen: 'user' as const,
    chat: 'hi',
  },
  {
    origen: 'llm' as const,
    chat: textoMd,
  },
]

const chatAI = ref<ChatAI[]>(DEFAULT_CHAT)

/**
 *
 */
const nuevoMensaje = async () => {
  if (inputChat.value.length === 0) return
  status.value = 'pending'
  let requestId = ''

  const chatPersistent = inputChat.value

  inputChat.value = ''

  if (route.query.id) {
    chatAI.value.push({
      origen: 'user',
      chat: chatPersistent,
    })
  } else {
    chatAI.value = [
      {
        origen: 'user',
        chat: chatPersistent,
      },
    ]
  }

  await nextTick()
  scrollToBottom()

  if (route.query.id) {
    requestId = route.query.id as string
  } else {
    const { uuid } = await $trpc.chat.addChatSession.query()
    //$router.push({ query: { id: uuid } })
    requestId = uuid
  }

  const res = await $trpc_stream.chat.addPrompt.mutate({
    prompt: chatPersistent,
    requestId: requestId,
  })

  status.value = 'generating'

  for await (const line of res) {
    try {
      chatLLM.value += line
    } catch (err) {
      console.log(err)
    }
  }

  status.value = 'idle'

  const fullChatLLM = chatLLM.value

  chatAI.value.push({
    origen: 'llm',
    chat: fullChatLLM,
  })

  if (route.query.id) {
    //
  } else {
    $router.push({ query: { id: requestId } })
  }

  chatLLM.value = ''
}

/**
 *
 * @param event
 */
const handleEnter = (event: KeyboardEvent) => {
  if (event.shiftKey) {
    // Shift + Enter should insert a new line
    inputChat.value += '\n'
  } else {
    // Regular Enter should send the message
    nuevoMensaje()
  }
}
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

/* const textoFormateado = (text: string) => {
  return text.replace(/\n/g, '<br>')
} */
const chatContainer = ref<HTMLElement | null>(null)

const textArea = ref()
const inputChat = ref('')

watch(route, async () => {
  if ('id' in route.query) {
    if (status.value !== 'pending') getRequestId(route.query.id as string)
  } else {
    chatAI.value = DEFAULT_CHAT
  }
  await nextTick()
  scrollToBottom()

  textArea.value.focus()
})

/**
 *
 * @param idRequest
 */
const getRequestId = async (idRequest: string) => {
  const res = await $trpc.chat.getChatId.query({
    requestId: idRequest,
  })
  if (res.chat_session) {
    documentTitle(res.chat_session.titulo)
  }
  const mapRes = res.chat.map((r) => {
    return {
      origen: r.origen as 'user' | 'llm',
      chat: r.chat,
    }
  })

  chatAI.value = mapRes
}
/**
 *
 *
 *
 */
onMounted(async () => {
  let requestId = ''
  if (route.query.id) {
    requestId = route.query.id as string
  }

  if (requestId.length > 0) {
    await getRequestId(requestId)
  }

  await nextTick()
  scrollToBottom()

  textArea.value.focus()
})
</script>
<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto h-full">
          <div class="border-x border-1 min-h-full border-t">
            <div class="space-y-4 pb-4 py-4">
              <ClientOnly>
                <template v-for="(c, k) in chatAI" :key="k">
                  <div v-if="c.origen === 'llm'" class="px-4">
                    <p
                      class="prose prose-md dark:prose-invert"
                      v-html="md.render(c.chat)"
                    ></p>
                  </div>

                  <div
                    v-if="c.origen === 'user'"
                    class="fadeInFast max-w-[75%] gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-secondary text-primary-foreground p-4"
                  >
                    <div
                      class="prose prose-md dark:prose-invert"
                      v-html="md.render(c.chat)"
                    ></div>
                  </div>
                </template>

                <template v-if="status === 'generating'">
                  <div class="fadeInFast px-4">
                    <p
                      class="prose prose-md dark:prose-invert"
                      v-html="md.render(chatLLM)"
                    ></p>
                  </div>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-[1]">
        <div class="max-w-3xl mx-auto min-h-full flex-1">
          <textarea
            @keydown.enter.prevent="handleEnter"
            ref="textArea"
            class="flex min-h-20 w-full rounded-md border border-input bg-background px-4 py-4 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style="field-sizing: content; max-height: 20vh; min-height: 20vh"
            placeholder="Escribe un mensaje..."
            v-model="inputChat"
          />
        </div>
      </div>
    </div>
  </div>
</template>
