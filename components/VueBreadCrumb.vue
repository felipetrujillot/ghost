<script setup lang="ts">
defineProps<{
  text: string
  icon?: string
  to?: string
}>()
</script>

<template>
  <nuxt-link v-if="to" :to="to" class="text-sm text-blue-600">
    {{ text }}
  </nuxt-link>
  <a v-if="!to" class="text-sm text-muted-foreground">
    {{ text }}
  </a>
</template>
