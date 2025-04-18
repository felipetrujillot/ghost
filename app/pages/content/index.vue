<script setup lang="ts">
const { $trpc } = useNuxtApp()

import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const de = await parseMarkdown('# hola')
const d = await queryCollection('docs').first()
</script>

<template>
  {{ de }}
  <!--  <MDC :value="de" /> -->
  <!-- <ContentRenderer v-if="data" :value="data" /> -->
</template>
