<script setup lang="ts">
import { LucidePaperclip, LucidePlay, LucideX } from 'lucide-vue-next'
import markdownit from 'markdown-it'
//import katex from 'katex'
import mk from '@vscode/markdown-it-katex'

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
const url_imagen = ref('')

const status = ref<'idle' | 'pending' | 'generating'>('idle')

const textoMd = `
## undefined

built with nuxt.
`
type ChatAI = {
  origen: 'llm' | 'user'
  tipo: 'imagen' | 'texto'
  chat: string
}

const DEFAULT_CHAT = [
  {
    origen: 'user' as const,
    chat: 'hi',
    tipo: 'texto' as const,
  },
  {
    origen: 'llm' as const,
    chat: textoMd,
    tipo: 'texto' as const,
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

  const hasImage = url_imagen.value
  const chatPersistent = inputChat.value

  inputChat.value = ''
  url_imagen.value = ''

  if (route.query.id) {
    if (hasImage) {
      chatAI.value.push({
        origen: 'user',
        tipo: 'texto',
        chat: chatPersistent,
      })
      chatAI.value.push({
        origen: 'user',
        tipo: 'imagen',
        chat: hasImage,
      })
    } else {
      chatAI.value.push({
        origen: 'user',
        tipo: 'texto',

        chat: chatPersistent,
      })
    }
  } else {
    chatAI.value = [
      {
        origen: 'user',
        tipo: 'texto',

        chat: chatPersistent,
      },
    ]

    if (hasImage) {
      chatAI.value = [
        {
          origen: 'user',
          tipo: 'texto',

          chat: chatPersistent,
        },
        {
          origen: 'user',
          tipo: 'imagen',

          chat: hasImage,
        },
      ]
    }
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
    url_imagen: hasImage,
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
    tipo: 'texto',
  })

  if (route.query.id) {
    //
  } else {
    $router.push({ query: { id: requestId } })
  }

  chatLLM.value = ''
  url_imagen.value = ''
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
      tipo: r.tipo as 'texto' | 'imagen',
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

const uploadFile = async (files: File[]) => {
  const file = files[0]
  /**
   *
   */

  const [_oldName, ...formatArray] = file!.name.split('.')

  const format = formatArray[formatArray.length - 1]

  if (format !== 'jpg' && format !== 'jpeg' && format !== 'png') {
    return toast('warning', 'El formato debe ser .jpg o .png')
  }
  if (!file) {
    return toast('warning', 'No se pudo subir el documento')
  }

  const fileUrl = await uploadFileGcp(file)

  url_imagen.value = fileUrl
}

/* const renderMath = (math: any, displayMode: any) => {
  return `<span  white-space: pre;>${katex.renderToString(math, {
    throwOnError: false,
    displayMode,
    output: 'htmlAndMathml',
  })}</span>`
}
 */

const renderHtml = (html: string) => {
  const markdownContent = md.use(mk).render(html)

  return markdownContent
  /*  const regEx = markdownContent
    .replace(/\$\$([^$]+?)\$\$/g, (_, math) => renderMath(math, true))
    .replace(/\$([^$]+?)\$/g, (_, math) => renderMath(math, false))
    .replace(/(\d)\s*-\s*(\d)/g, '$1 - $2')
    .replace(/<code>([\s\S]*?)<\/code>/g, (match, code) => {
      // Check if <code> contains LaTeX (basic detection)
      if (/\\[a-zA-Z]+|\^|_/.test(code)) {
        return renderMath(code, true) // Convert if it's likely LaTeX
      }
      return match // Keep original if it's normal code
    })
  return regEx */
}

const show = useShowModal()
const handleOpenChange = () => {
  show.value = !show.value
}
</script>
<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="block md:hidden lg:hidden">
        <p
          class="text-sm text-muted-foreground cursor-pointer"
          @click.prevent="handleOpenChange"
        >
          <kbd
            class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
          >
            <span class="text-xs">⌘</span>K
          </kbd>
        </p>
      </div>
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto h-full">
          <div class="border-x border-1 min-h-full border-t">
            <div class="space-y-4 pb-4 py-4">
              <ClientOnly>
                <template v-for="(c, k) in chatAI" :key="k">
                  <div v-if="c.origen === 'llm'" class="px-4">
                    <p
                      class="prose prose-md dark:prose-invert"
                      v-html="renderHtml(c.chat)"
                    ></p>
                  </div>

                  <div
                    v-if="c.origen === 'user'"
                    class="fadeInFast max-w-[75%] gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-secondary text-primary-foreground p-4"
                  >
                    <div
                      v-if="c.tipo === 'texto'"
                      class="prose prose-md dark:prose-invert"
                      v-html="renderHtml(c.chat)"
                    ></div>

                    <div
                      v-if="c.tipo === 'imagen'"
                      class="prose prose-md dark:prose-invert"
                    >
                      <img
                        :src="c.chat"
                        style="max-height: 8vh; object-fit: contain"
                      />
                    </div>
                  </div>
                </template>

                <template v-if="status === 'generating'">
                  <div class="fadeInFast px-4">
                    <p
                      class="prose prose-md dark:prose-invert"
                      v-html="renderHtml(chatLLM)"
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
          <div class="flex flex-row border">
            <div class="basis-1/5" v-if="url_imagen.length > 0">
              <img
                style="object-fit: contain"
                :src="url_imagen"
                class="w-full min-h-24 max-h-24"
              />
            </div>

            <div :class="url_imagen.length === 0 ? 'w-full' : 'basis-4/5'">
              <textarea
                @keydown.enter.prevent="handleEnter"
                ref="textArea"
                class="flex min-h-24 max-h-24 w-full rounded-md bg-background px-4 py-4 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                style="field-sizing: content"
                placeholder="Escribe un mensaje..."
                v-model="inputChat"
              />
            </div>
          </div>

          <div class="flex justify-between">
            <Dropzone
              @files-dropped="uploadFile"
              v-if="url_imagen.length === 0"
            >
              <div class="bg-secondary p-2">
                <LucidePaperclip
                  class="cursor-pointer text-primary-foreground"
                />
              </div>
            </Dropzone>

            <div
              class="bg-secondary p-2"
              v-if="url_imagen.length > 0"
              @click.prevent="url_imagen = ''"
            >
              <LucideX class="cursor-pointer text-primary-foreground" />
            </div>

            <div class="bg-secondary p-2" @click.prevent="nuevoMensaje">
              <LucidePlay class="text-primary-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.prose :where(.katex) {
  font-size: 1em !important; /* Prevent Tailwind from making equations too large */
}

.prose :where(.katex-display) {
  overflow-x: auto; /* Prevent inline equations from overflowing */
  text-align: center;
}

.prose :where(.katex-html) {
  font-family: inherit; /* Ensure text inside KaTeX remains readable */
}

.prose :where(.katex .mathnormal) {
  font-family: inherit !important; /* Avoid KaTeX overriding prose typography */
}
</style>
