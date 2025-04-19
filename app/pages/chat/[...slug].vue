<script setup lang="ts">
import InputChat from './_components/InputChat.vue'
import RenderChat from './_components/RenderChat.vue'
import SheetChat from './_components/SheetChat.vue'

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
documentTitle('chat')

const statusChat = ref<'idle' | 'pending' | 'generating' | 'success'>('idle')

const route = useRoute()
const router = useRouter()

const chatAI = useChat()

const { chatLLM, addPrompt, status: statusGeneration } = useGeneratingChat()

const showSheet = ref(false)
const inputChat = ref('')

const chatContainer = ref<HTMLElement | null>(null)
const useChatId = useIdChat()
const isAtBottom = ref(false)

const scrollToBottom = async () => {
  await nextTick()
  await timeSleep(0.2)
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight - chatContainer.value.clientHeight,
      behavior: 'instant',
    })
    /*  chatContainer.value.scrollTop =
      chatContainer.value.scrollHeight - chatContainer.value.clientHeight */
  }
}

/**
 *
 */
const isNewChat = computed(() => {
  const routeSlug = route.params.slug
  if (typeof routeSlug === 'undefined') {
    return true
  } else if (typeof routeSlug === 'object') {
    return routeSlug[0]!
  }
  return true
})

/**
 *
 * @param params
 */
const nuevoMensaje = async (params: ChatAI[]) => {
  if (isNewChat.value) {
    clearChat()
  }

  addItemsChat(params)

  if (isNewChat.value) {
    await newChatSession()
  }

  const onSuccessChat = () => {
    addItemsChat([
      {
        chat: chatLLM.value,
        origen: 'llm',
        tipo: 'texto',
      },
    ])

    if (isNewChat.value) {
      router.push(`/chat/${useChatId.value}`)
    }
  }

  addPrompt(params, onSuccessChat)
}

/**
 *
 */
onMounted(async () => {
  clearChat()
  statusChat.value = 'pending'

  if (typeof isNewChat.value === 'string') {
    await selectChatById(isNewChat.value)
    statusChat.value = 'success'
  } else {
    addItemsChat(DEFAULT_CHAT)
    statusChat.value = 'success'
  }
  await nextTick()

  await scrollToBottom()
})

const checkScrollPosition = () => {
  if (chatContainer.value) {
    const scrollHeight = chatContainer.value.scrollHeight
    const clientHeight = chatContainer.value.clientHeight

    const scrollTop = chatContainer.value.scrollTop

    const res = scrollHeight - scrollTop

    isAtBottom.value = res - 200 <= clientHeight
  }
}

onMounted(() => {
  chatContainer.value?.addEventListener('scroll', checkScrollPosition)
  checkScrollPosition()
})

onBeforeUnmount(() => {
  chatContainer.value?.removeEventListener('scroll', checkScrollPosition)
})
</script>

<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="block md:hidden lg:hidden">
        <SheetChat v-model="showSheet" />
      </div>
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto h-full relative">
          <div class="border-x border-1 min-h-full border-t">
            <div class="space-y-4 py-4 px-4">
              <Skeleton
                class="h-8 rounded"
                v-if="
                  statusChat === 'pending' ||
                  (statusChat === 'generating' && chatLLM.length === 0)
                "
              />
              <template v-if="statusChat === 'success'">
                <template v-for="(chat, k) in chatAI" :key="k">
                  <RenderChat :chat="chat" />
                </template>
              </template>

              <template v-if="statusGeneration === 'error'">
                <h1>
                  Hubo un error intentando generar el contenido, intenta
                  refrescando el navegador
                </h1>
              </template>
              <Skeleton
                class="h-8 rounded"
                v-if="statusGeneration === 'pending' && chatLLM.length === 0"
              />
              <template v-if="statusGeneration === 'pending'">
                <MDC :value="chatLLM" class="space-y-6" />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-[1]">
        <InputChat
          v-model="inputChat"
          @nuevoMensaje="nuevoMensaje"
          @scrollToBottom="scrollToBottom"
          :isAtBottom="isAtBottom"
        />
      </div>
    </div>
  </div>
</template>
