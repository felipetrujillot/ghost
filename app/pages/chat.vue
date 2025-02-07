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

- [ ] Arreglar bienvenida
- [ ] Multipartner
	- CRUD Multipartner
	- Preguntas análisis x partner
	- Usuarios x partner
## IA

- [ ] Restaurar módulos de IA
## Panel supervisor

- [ ] Listado licitaciones
- [ ] Filtros
	- [ ] Poder flitrar múltiples


  - [ ] Restaurar módulos de IA
## Panel supervisor

- [ ] Listado licitaciones
- [ ] Filtros
	- [ ] Poder flitrar múltiples


  - [ ] Restaurar módulos de IA
## Panel supervisor

- [ ] Listado licitaciones
- [ ] Filtros
	- [ ] Poder flitrar múltiples


  - [ ] Restaurar módulos de IA
## Panel supervisor

- [ ] Listado licitaciones
- [ ] Filtros
	- [ ] Poder flitrar múltiples
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
})
const inputChat = ref('')
</script>
<template>
  <div
    class="relative overflow-y-scroll flex-1 w-full min-h-full justify-between"
  >
    <div class="h-screen flex flex-col h-full">
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto py-4">
          <div class="space-y-4">
            <ClientOnly>
              <template v-for="(c, k) in chatAI" :key="k">
                <div v-if="c.origen === 'llm'">
                  <p
                    class="prose prose-md dark:prose-invert"
                    v-html="md.render(c.chat)"
                  ></p>
                </div>

                <div
                  v-if="c.origen === 'user'"
                  class="max-w-[75%] gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-secondary text-primary-foreground p-4"
                >
                  <div v-html="md.render(c.chat)"></div>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="flex-[1]">
        <div class="max-w-3xl mx-auto min-h-full flex-1">
          <Textarea
            @keydown.enter.prevent="handleEnter"
            class="text-md"
            style="field-sizing: content; max-height: 20vh; min-height: 20vh"
            placeholder="Escribe un mensaje..."
            v-model="inputChat"
          />
        </div>
      </div>
    </div>
  </div>
</template>
