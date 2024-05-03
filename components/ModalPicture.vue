<script setup lang="ts">
defineProps<{
  src: string
  title: string
}>()
</script>

<template>
  <VueModal>
    <img :src="src" :alt="title" />
  </VueModal>
</template>
