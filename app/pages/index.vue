<script setup lang="ts">
documentTitle('Inicio')

definePageMeta({
  layout: 'user-layout',
})
</script>

<template>
  <div class="space-y-4 p-4 lg:p-6">
    <h1 class="text-primary font-bold text-2xl">Bienvenido a la plataforma</h1>

    <div class="grid grid-cols-2 gap-4">
      <Card>Preguntas y Evaluaciones</Card>
      <Card>Libro de clases</Card>
      <Card>Planificación</Card>
      <Card>Portal de profesores</Card>
    </div>
  </div>
</template>
