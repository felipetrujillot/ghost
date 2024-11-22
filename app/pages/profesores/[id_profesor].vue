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
const id_profesor = parseInt(route.params.id_profesor as string)
const { categoriaSeleccionada, categorias } = useCategorias([
  'Detalle profesor',
] as const)

const { status, data } = $trpc.profes.getProfesorId.useQuery({ id_profesor })
</script>

<template>
  <div class="flex flex-wrap justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb to="/profesores" text="Profesores / " />
      <VueBreadCrumb text="Detalle profesor" />
      <h1 class="text-primary font-bold text-2xl">Detalle profesor</h1>
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
