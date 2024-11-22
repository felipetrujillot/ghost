<script setup lang="ts">
import TableCursos from './_components/TableCursos.vue'
/**
 * Tabla de cursos
 */
documentTitle('Cursos')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc } = useNuxtApp()

const { data, status } = $trpc.cursos.getCursos.useQuery()
</script>

<template>
  <div class="flex justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb text="Cursos" />

      <h1 class="text-primary font-bold text-2xl">Cursos</h1>
      <h2 class="text-muted-foreground">Listado de cursos</h2>
    </div>
    <Button @click.prevent="$router.push('/cursos/crear')">Nuevo curso</Button>
  </div>

  <VueSkeleton v-if="status === 'pending'" />

  <template v-if="status === 'success' && data">
    <TableCursos :cursos="data" />
  </template>
</template>
