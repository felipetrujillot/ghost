<script setup lang="ts">
import TableProfesores from './_components/TableProfesores.vue'
/**
 * Tabla de cursos
 */
documentTitle('Alumnos')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc } = useNuxtApp()

const { data, status } = $trpc.profes.getProfesores.useQuery()
</script>

<template>
  <div class="flex justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb text="Cursos" />

      <h1 class="text-primary font-bold text-2xl">Profesores</h1>
      <h2 class="text-muted-foreground">Listado de profesores</h2>
    </div>
    <Button @click.prevent="$router.push('/profesores/crear')"
      >Nuevo profesor</Button
    >
  </div>

  <VueSkeleton v-if="status === 'pending'" />

  <template v-if="status === 'success' && data">
    <TableProfesores :profes="data" />
  </template>
</template>
