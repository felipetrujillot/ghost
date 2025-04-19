<script setup lang="ts">
import InputChat from './_components/InputChat.vue'
import RenderChat from './_components/RenderChat.vue'
import SheetChat from './_components/SheetChat.vue'

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
documentTitle('chat')

const status = ref<'idle' | 'pending' | 'generating' | 'success'>('idle')

const { $trpc } = useNuxtApp()
const route = useRoute()

const showSheet = ref(false)
const inputChat = ref('')

const chatAI = ref<ChatAI[]>(DEFAULT_CHAT)
const chatContainer = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

onMounted(async () => {
  status.value = 'pending'
  const routeSlug = route.params.slug

  if (typeof routeSlug === 'undefined') {
    status.value = 'success'
    return []
  }

  if (typeof routeSlug === 'object') {
    const res = await $trpc.chat.getChatId.query({
      requestId: routeSlug[0]!,
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

    status.value = 'success'

    await nextTick()
    scrollToBottom()
    return
  }

  status.value = 'success'

  return []
})

/**
 *
 * @param params
 */
const nuevoMensaje = (params: ChatAI[]) => {
  chatAI.value.push(...params)
}
</script>

<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="block md:hidden lg:hidden">
        <SheetChat v-model="showSheet" />
      </div>
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto h-full">
          <div class="border-x border-1 min-h-full border-t">
            <div class="space-y-4 py-4 px-4">
              <Skeleton class="h-8 rounded" v-if="status === 'pending'" />
              <template v-if="status === 'success'">
                <template v-for="(chat, k) in chatAI" :key="k">
                  <RenderChat :chat="chat" />
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-[1]">
        <InputChat v-model="inputChat" @nuevoMensaje="nuevoMensaje" />
      </div>
    </div>
  </div>
</template>
