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

const {
  data: projectUsers,
  pending: pendingUsers,
  refresh: refreshUsers,
} = $trpc.projects.getUsersByIdProject.useQuery({
  id_project,
})
</script>

<template>
  <VueSkeleton v-if="pending || pendingProject || pendingUsers" />
  <template
    v-if="
      !pending &&
      data &&
      !pendingProject &&
      project &&
      !pendingUsers &&
      projectUsers
    "
  >
    <div>
      <VueBreadCrumb text="NoName / " />
      <VueBreadCrumb text="Proyectos / " to="/projects" />
      <VueBreadCrumb
        text="Detalle Proyecto / "
        :to="`/project/${id_project}`"
      />
      <VueBreadCrumb text="Tareas" />
      <h1 class="text-2xl font-bold">{{ project.project_name }}</h1>
      <p class="text-muted-foreground">Mis tareas</p>
    </div>

    <DocumentTitle :title="project.project_name" />

    <TasksDragableGrid :tasks="data" :projectUsers="projectUsers" />
  </template>
</template>
