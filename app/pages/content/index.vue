<script setup lang="ts">
const route = useRoute()

const { $trpc } = useNuxtApp()
const { data } = await useAsyncData('docs', () => queryCollection('docs').all())

const newFile = async () => {
  const res = await $trpc.markdown.addFile.mutate()
  console.log(res)
}
</script>

<template>
  <div>
    <p v-for="d in data">{{ d.title }} {{ d.path }}</p>
  </div>

  <Button @click.prevent="newFile">newfile</Button>
</template>
