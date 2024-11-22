<script setup lang="ts">
import { z } from 'zod'

/**
 * Tabla de cursos
 */
documentTitle('Crear curso')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc, $router } = useNuxtApp()

const { categoriaSeleccionada, categorias } = useCategorias([
  'Detalle curso',
  'Alumnos',
] as const)
</script>

<template>
  <div class="flex flex-wrap justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb to="/cursos" text="Cursos / " />
      <VueBreadCrumb text="Detalle Curso" />
      <h1 class="text-primary font-bold text-2xl">Detalle curso</h1>
      <h2 class="text-muted-foreground">Información sobre el curso</h2>
    </div>
  </div>
  <TabsNavigation v-model="categoriaSeleccionada" :categorias="categorias" />

  <Card>
    <div>
      <p class="text-muted-foreground">
        El curso se añadirá al año/semestre actual
      </p>
    </div>
  </Card>
</template>
