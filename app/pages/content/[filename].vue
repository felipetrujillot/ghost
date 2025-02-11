<script setup lang="ts">
import Tiptap from '~/components/Tiptap.vue'
const { $trpc } = useNuxtApp()
import markdownit from 'markdown-it'
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

/**
 *
 */
onMounted(async () => {
  const file = await $trpc.markdown.getFile.query()

  const m = md.render(file)
  text.value = m
  isLoading.value = true
  return
})

const isLoading = ref(false)
const text = ref('')

const saveNote = async (text: string) => {
  await $trpc.markdown.updateFile.mutate({
    text,
  })

  console.log('here')
}
/**
 *
 */
const commitNotas = async () => {
  await $trpc.markdown.commitFiles.mutate()
}
</script>

<template>
  <div v-if="isLoading === true">
    <Tiptap :text="text" @saveNote="saveNote" />

    <Button @click.prevent="commitNotas">avance</Button>
  </div>
</template>
