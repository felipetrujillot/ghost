<script setup lang="ts">
import { routeLocationKey } from 'vue-router'
import InputChat from './_components/InputChat.vue'
import RenderChat from './_components/RenderChat.vue'
import SheetChat from './_components/SheetChat.vue'

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
documentTitle('chat')

const statusChat = ref<'idle' | 'pending' | 'generating' | 'success'>('idle')
const isRedirecting = ref(false)
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
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight - chatContainer.value.clientHeight,
      behavior: 'instant',
    })
  }
}

/**
 *
 */
const isNewChat = computed(() => {
  const routeSlug = route.query.id
  console.log({ routeSlug })
  if (typeof routeSlug === 'undefined') {
    useChatId.value = ''
    return true
  } else if (typeof routeSlug === 'string') {
    useChatId.value = routeSlug
    return routeSlug!
  }

  useChatId.value = ''

  return true
})

/**
 *
 * @param responseChat
 */
const onSuccessChat = (responseChat: string) => {
  addItemsChat([
    {
      chat: responseChat,
      origen: 'llm',
      tipo: 'texto',
    },
  ])

  setChatSessions()
  isRedirecting.value = false
}

/**
 *
 * @param params
 */
const nuevoMensaje = async (params: ChatAI[]) => {
  if (isNewChat.value === true) {
    clearChat()
  }

  addItemsChat(params)

  if (isNewChat.value === true) {
    await newChatSession()
    isRedirecting.value = true
    router.replace(`/chat?id=${useChatId.value}`)
  }

  addPrompt(params, onSuccessChat)
}

const checkScrollPosition = () => {
  if (chatContainer.value) {
    const scrollHeight = chatContainer.value.scrollHeight
    const clientHeight = chatContainer.value.clientHeight

    const scrollTop = chatContainer.value.scrollTop

    const res = scrollHeight - scrollTop

    isAtBottom.value = res - 200 <= clientHeight
  }
}

const handleView = async () => {
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
  await timeSleep(0.1)

  await scrollToBottom()
}

onMounted(async () => {
  await handleView()
})
/**
 *
 */
watch(route, async () => {
  if (isRedirecting.value === true) return
  await handleView()
})

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
