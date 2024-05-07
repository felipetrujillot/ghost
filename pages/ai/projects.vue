<script setup lang="ts">
const { $trpc } = useNuxtApp()

documentTitle('RFP')
definePageMeta({
  layout: 'admin-layout',
})

const tabs = ref('resumen')
</script>

<template>
  <div class="container container-sm space-y-4">
    <h1 class="text-2xl font-bold">Mis Proyectos'</h1>
    <p class="text-muted-foreground">Listado de tus proyectos</p>
  </div>
</template>
