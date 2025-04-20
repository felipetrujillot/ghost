<script setup lang="ts">
defineProps<{ chat: ChatAI }>()

function escapeHTML(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
</script>

<template>
  <template v-if="chat.origen === 'llm'">
    <MDC :value="chat.chat" class="space-y-6" />
  </template>

  <div
    v-if="chat.origen === 'user'"
    class="fadeInFast max-w-[75%] gap-2 rounded-lg py-2 text-sm ml-auto bg-secondary text-primary-foreground p-4"
  >
    <template v-if="chat.tipo === 'texto'">
      <div
        class="prose prose-md dark:prose-invert"
        style="white-space: pre-wrap"
        v-html="escapeHTML(chat.chat)"
      ></div>
    </template>

    <div v-if="chat.tipo === 'imagen'" class="prose prose-md dark:prose-invert">
      <img :src="chat.chat" style="max-height: 8vh; object-fit: contain" />
    </div>

    <div v-if="chat.tipo === 'pdf'" class="prose prose-md dark:prose-invert">
      <a :href="chat.chat" target="_blank"> Ver pdf </a>
    </div>
  </div>
</template>
