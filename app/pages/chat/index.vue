<script setup lang="ts">
import {
  LucideArrowUp,
  LucideEllipsis,
  LucideFileText,
  LucidePaperclip,
  LucidePlay,
  LucideX,
} from 'lucide-vue-next'
import ModalConfigs from './_components/ModalConfigs.vue'
import SheetChat from './_components/SheetChat.vue'
import { FocusScope } from 'reka-ui'

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
documentTitle('chat')

const { $trpc, $router, $trpc_stream } = useNuxtApp()

const route = useRoute()

const chatLLM = ref('')
const url_imagen = ref('')
const url_pdf = ref('')
const status = ref<'idle' | 'pending' | 'generating'>('idle')

const textoMd = `
## undefined

built with nuxt.
`
type ChatAI = {
  origen: 'llm' | 'user'
  tipo: 'imagen' | 'texto' | 'pdf'
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
  const hasPdf = url_pdf.value
  const chatPersistent = inputChat.value

  inputChat.value = ''
  url_imagen.value = ''
  url_pdf.value = ''

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
    } else if (hasPdf) {
      chatAI.value.push({
        origen: 'user',
        tipo: 'texto',
        chat: chatPersistent,
      })
      chatAI.value.push({
        origen: 'user',
        tipo: 'pdf',
        chat: hasPdf,
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

    if (hasPdf) {
      chatAI.value = [
        {
          origen: 'user',
          tipo: 'texto',

          chat: chatPersistent,
        },
        {
          origen: 'user',
          tipo: 'pdf',

          chat: hasPdf,
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
    url_pdf: hasPdf,
  })

  const randomDelay = () =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * 30 + 10))

  status.value = 'generating'

  for await (const char of res) {
    try {
      chatLLM.value += char

      await randomDelay()
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

  setChatSessions()
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

  //textArea.value.focus()
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
      tipo: r.tipo as 'texto' | 'imagen' | 'pdf',
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

  //textArea.value.focus()
})

const uploadFile = async (files: File[]) => {
  const file = files[0]
  /**
   *
   */

  const [_oldName, ...formatArray] = file!.name.split('.')

  const format = formatArray[formatArray.length - 1]

  if (
    format !== 'jpg' &&
    format !== 'jpeg' &&
    format !== 'png' &&
    format !== 'pdf'
  ) {
    return toast('warning', 'El formato debe ser .jpg, .png o .pdf')
  }
  if (!file) {
    return toast('warning', 'No se pudo subir el documento')
  }

  const fileUrl = await uploadFileGcp(file)

  if (format === 'pdf') {
    url_pdf.value = fileUrl
  } else {
    url_imagen.value = fileUrl
  }
}

/*  const mark = marked.parse(latexString)
  return mark
  const markdownContent = md.use(mk).render(latexString)

  return markdownContent */

const showPopover = ref(false)
const showModalConfig = ref(false)
const showSheet = ref(false)
</script>
<template>
  <ModalConfigs v-if="showModalConfig" @closeModal="showModalConfig = false" />
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="block md:hidden lg:hidden">
        <SheetChat v-model="showSheet" />
      </div>
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto h-full">
          <div class="border-x border-1 min-h-full border-t">
            <div class="space-y-4 pb-4 py-4">
              <ClientOnly>
                <template v-for="(c, k) in chatAI" :key="k">
                  <div
                    v-if="c.origen === 'llm'"
                    class="px-4 w-full max-w-full overflow-x-auto fadeInFast"
                  >
                    <AsyncHtml :chat="c.chat" />
                  </div>

                  <div
                    v-if="c.origen === 'user'"
                    class="fadeInFast max-w-[75%] gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-secondary text-primary-foreground p-4"
                  >
                    <div
                      v-if="c.tipo === 'texto'"
                      class="prose prose-md dark:prose-invert"
                    >
                      {{ c.chat }}
                    </div>

                    <div
                      v-if="c.tipo === 'imagen'"
                      class="prose prose-md dark:prose-invert"
                    >
                      <img
                        :src="c.chat"
                        style="max-height: 8vh; object-fit: contain"
                      />
                    </div>

                    <div
                      v-if="c.tipo === 'pdf'"
                      class="prose prose-md dark:prose-invert"
                    >
                      <a :href="c.chat" target="_blank"> Ver pdf </a>
                    </div>
                  </div>
                </template>

                <template v-if="status === 'generating'">
                  <div
                    class="px-4 w-full max-w-full overflow-x-auto fadeInFast"
                  >
                    <AsyncHtml :chat="chatLLM" />
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

            <div class="basis-1/5" v-if="url_pdf.length > 0">
              <div class="w-full flex min-h-24 justify-center items-center">
                <LucideFileText class="h-10 w-10" />
              </div>
            </div>

            <div :class="url_imagen.length === 0 ? 'w-full' : 'basis-4/5'">
              <FocusScope>
                <textarea
                  ref="textArea"
                  @keydown.enter.prevent="handleEnter"
                  class="flex min-h-24 max-h-24 w-full rounded-md bg-background px-4 py-4 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  style="field-sizing: content"
                  placeholder="Escribe un mensaje..."
                  v-model="inputChat"
                />
              </FocusScope>
            </div>
          </div>

          <div class="flex justify-between border-x h-12">
            <div>
              <Popover v-model:open="showPopover">
                <PopoverTrigger as-child>
                  <div class="border-x p-4 cursor-pointer">
                    <LucideEllipsis
                      class="text-primary-foreground h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent class="w-[180px] p-0">
                  <Command>
                    <CommandGroup>
                      <CommandItem
                        value="Configuraciones"
                        @click.prevent="showModalConfig = true"
                      >
                        Configuraciones
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div class="flex">
              <DropzoneClick
                @files-dropped="uploadFile"
                v-if="url_imagen.length === 0 && url_pdf.length === 0"
              >
                <div class="border-x cursor-pointer p-4">
                  <LucidePaperclip
                    class="text-primary-foreground h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4"
                  />
                </div>
              </DropzoneClick>

              <div
                class="border-x cursor-pointer p-4"
                v-if="url_imagen.length > 0 || url_pdf.length > 0"
                @click.prevent="
                  () => {
                    url_imagen = ''
                    url_pdf = ''
                  }
                "
              >
                <LucideX
                  class="text-primary-foreground h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4"
                />
              </div>

              <div
                class="bg-secondary border-x p-4 cursor-pointer"
                @click.prevent="nuevoMensaje"
              >
                <LucideArrowUp
                  class="text-primary-foreground h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4"
                />
              </div>
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
