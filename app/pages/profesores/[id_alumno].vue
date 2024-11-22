<script setup lang="ts">
import { z } from 'zod'

/**
 * Tabla de cursos
 */
documentTitle('Detalle Alumno')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc, $router } = useNuxtApp()

const route = useRoute()
const id_alumno = parseInt(route.params.id_alumno as string)
const { categoriaSeleccionada, categorias } = useCategorias([
  'Detalle alumno',
  'Apoderado',
  'Antecedentes',
] as const)

const { status, data } = $trpc.alumnos.getAlumnoId.useQuery({ id_alumno })
</script>

<template>
  <div class="flex flex-wrap justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb to="/alumnos" text="Alumnos / " />
      <VueBreadCrumb text="Detalle alumno" />
      <h1 class="text-primary font-bold text-2xl">Detalle alumno</h1>
      <h2 class="text-muted-foreground">Información sobre el alumno</h2>
    </div>
  </div>
  <TabsNavigation v-model="categoriaSeleccionada" :categorias="categorias" />

  <VueSkeleton v-if="status === 'pending'" />
  <Card v-if="status === 'success' && data">
    <div>
      <p>{{ data }}</p>
    </div>
  </Card>
</template>
