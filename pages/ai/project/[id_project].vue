<script setup lang="ts">
const { $trpc } = useNuxtApp()
documentTitle('Tareas')
definePageMeta({
  layout: 'admin-layout',
})
const tabs = ref('tablero')
const route = useRoute()
const id_project = parseInt(route.params.id_project as string)

const { data: project, pending: pendingProject } =
  $trpc.projects.getProjectById.useQuery({
    id_project,
  })

const { data, pending } = $trpc.tasks.getTasksByIdProject.useQuery({
  id_project,
})
</script>

<template>
  <VueSkeleton v-if="pending || pendingProject" />
  <template v-if="!pending && data && !pendingProject && project">
    <h1 class="text-2xl font-bold">{{ project.project_name }}</h1>

    <DocumentTitle :title="project.project_name" />
    <Tabs default-value="tablero" v-model="tabs">
      <TabsList>
        <TabsTrigger value="tablero"> Tablero </TabsTrigger>
        <TabsTrigger value="chat"> Todas las tareas </TabsTrigger>
      </TabsList>

      <TabsContent value="tablero"> </TabsContent>
      <TabsContent value="chat"> </TabsContent>
    </Tabs>

    <TasksDragableGrid :tasks="data" />
  </template>
</template>
