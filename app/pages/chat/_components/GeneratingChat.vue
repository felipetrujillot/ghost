<script setup lang="ts">
const route = useRoute()
const { $trpc, $trpc_stream } = useNuxtApp()

const chatLLM = ref('')
const [routeSlug] = route.params.slug as string[]
const status = ref<'idle' | 'pending' | 'generating' | 'success'>('idle')

const emit = defineEmits<{
  (
    e: 'updateStatus',
    payload: 'idle' | 'pending' | 'generating' | 'success',
  ): void
}>()

const enableChat = async () => {
  const chatPersistent = chatLLM.value

  let requestId = ''

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
    url_imagen: '',
    url_pdf: '',
  })
  const randomDelay = () =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * 30 + 10))

  for await (const char of res) {
    try {
      chatLLM.value += char

      await randomDelay()
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 *
 */
onMounted(async () => {
  //await enableChat()
})
</script>

<template>
  <Skeleton class="h-8 rounded" v-if="status === 'pending'" />

  <MDC :value="chatLLM" class="space-y-6" />
</template>
