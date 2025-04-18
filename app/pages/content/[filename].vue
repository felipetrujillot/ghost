<script setup lang="ts">
import Tiptap from '~/components/Tiptap.vue'
const { $trpc } = useNuxtApp()

const route = useRoute()
const filename = route.params.filename as string
/**
 *
 */
onMounted(async () => {
  const file = await $trpc.markdown.getFile.query()

  text.value = file
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
  await $trpc.markdown.commitFiles.mutate({
    filename,
  })
}
</script>

<template>
  <div v-if="isLoading === true">
    {{ text }}
    <!--  <Tiptap :text="text" @saveNote="saveNote" /> -->

    <Button @click.prevent="commitNotas">avance</Button>
  </div>
</template>
