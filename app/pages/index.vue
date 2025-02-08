<script setup lang="ts">
import markdownit from 'markdown-it'
documentTitle('inicio')
definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

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
</script>

<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="flex-[5] overflow-y-scroll" ref="chatContainer">
        <div class="max-w-3xl mx-auto h-full">
          <div class="border-x border-y border-1 min-h-full">
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
                <div class="prose prose-md dark:prose-invert px-4">
                  <ul>
                    <li>
                      <NuxtLink to="/chat">chat</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/tareas">tareas</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/notas">notas</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink to="/notas">gastos</NuxtLink>
                    </li>
                  </ul>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
