<script setup lang="ts">
const { $trpc } = useNuxtApp()

documentTitle('Proyectos')
definePageMeta({
  layout: 'admin-layout',
})

const { data: projects, pending } = $trpc.projects.getProjects.useQuery()
const tabs = ref('resumen')
</script>

<template>
  <div class="container-sm space-y-4">
    <h1 class="text-2xl font-bold">Mis Proyectos</h1>
    <p class="text-muted-foreground">Listado de tus proyectos</p>

    <VueSkeleton v-if="pending" />

    <template v-if="!pending && projects">
      <div class="grid grid-cols-3 align-stretch gap-4">
        <Card
          @click.prevent="$router.push(`/ai/project/${p.id_project}`)"
          class="cursor-pointer"
          v-for="p in projects"
          :key="p.id_project"
        >
          <h1 class="text-xl font-bold">
            {{ p.project_name }}
          </h1>

          <p>1 participante</p>

          <p class="text-sm text-end">Progreso: {{ p.progress }}%</p>
          <Progress :model-value="p.progress" />
        </Card>
      </div>
    </template>
  </div>
</template>
