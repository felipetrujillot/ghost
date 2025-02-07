<script setup lang="ts">
documentTitle('Inicio')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
</script>

<template>
  <div class="container-xs py-4 space-y-4">
    <h1 class="text-2xl">Bienvenido a la plataforma</h1>

    <div class="grid grid-cols-2 gap-4">
      <Card>Preguntas y Evaluaciones</Card>
      <Card>Libro de clases</Card>
      <Card>Planificación</Card>
      <Card>Portal de profesores</Card>
    </div>
  </div>
</template>
