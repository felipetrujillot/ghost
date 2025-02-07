<script setup lang="ts">
import markdownit from 'markdown-it'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

documentTitle('Nota')
definePageMeta({
  layout: 'user-layout',
})
const { $trpc, $router } = useNuxtApp()

const textoMd = `
## Admin
It's hard to overstate how powerful large language models have become. Sadly, the apps we use to talk to them keep getting worse.

That's why we built T3 Chat.

`

type ChatAI = {
  origen: 'llm' | 'user'
  chat: string
}

const chatAI = ref<ChatAI[]>([
  {
    origen: 'llm',
    chat: textoMd,
  },
  {
    origen: 'user',
    chat: 'Hola',
  },
])

const nuevoMensaje = async () => {
  if (inputChat.value.length === 0) return

  chatAI.value.push({
    origen: 'user',
    chat: inputChat.value,
  })

  inputChat.value = ''

  await nextTick()
  scrollToBottom()
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

const textoFormateado = (text: string) => {
  return text.replace(/\n/g, '<br>')
}
const chatContainer = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  scrollToBottom()

  textArea.value.focus()
})

const textArea = ref()
const inputChat = ref('')
</script>
<template>
  <div
    class="relative overflow-y-scroll flex-1 w-full min-h-full justify-between"
  >
    <div class="h-screen flex flex-col h-full">
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto py-4 border-r border-l h-full">
          <div class="space-y-4">
            <ClientOnly>
              <template v-for="(c, k) in chatAI" :key="k">
                <div v-if="c.origen === 'llm'" class="fadeInFast px-4">
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
            </ClientOnly>
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
