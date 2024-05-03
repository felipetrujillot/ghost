<script setup lang="ts">
defineProps<{
  src: string
  title: string
}>()

const showModal = ref(false)
</script>

<template>
  <ModalPicture
    v-if="showModal"
    :src="src"
    :title="title"
    @closeModal="showModal = false"
  />
  <img :src="src" :alt="title" @click.prevent="showModal = true" />
</template>
