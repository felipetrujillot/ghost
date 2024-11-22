<script setup lang="ts">
import TableAlumnos from './_components/TableAlumnos.vue'
/**
 * Tabla de cursos
 */
documentTitle('Alumnos')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc } = useNuxtApp()

const { data, status } = $trpc.alumnos.getAlumnos.useQuery()
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
      >Nuevo alumno</Button
    >
  </div>

  <VueSkeleton v-if="status === 'pending'" />

  <template v-if="status === 'success' && data">
    <TableAlumnos :alumnos="data" />
  </template>
</template>
