<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()
/**
 *
 */
documentTitle('Proyecto')
definePageMeta({
  layout: 'admin-layout',
})

/**
 *
 */
const route = useRoute()
const id_project = parseInt(route.params.id_project as string)
const { data: project, pending } = $trpc.projects.getProjectById.useQuery({
  id_project,
})

/**
 *
 */
const {
  data: projectUsers,
  pending: pendingUsers,
  refresh: refreshUsers,
} = $trpc.projects.getUsersByIdProject.useQuery({
  id_project,
})

/**
 *
 */
const showModalAddUser = ref(false)

/**
 *
 */
const closeModalAddUser = async () => {
  showModalAddUser.value = false
  refreshUsers()
}
</script>

<template>
  <ProjectModalAddUser
    v-if="showModalAddUser"
    :id_project="id_project"
    @closeModal="closeModalAddUser"
  />
  <div class="w-full container-sm ml-auto mr-auto space-y-4">
    <div>
      <VueBreadCrumb text="NoName / " />
      <VueBreadCrumb text="Proyectos / " to="/projects" />
      <VueBreadCrumb text="Detalle Proyecto " />
      <h1 class="text-2xl font-bold">Proyecto</h1>
      <p class="text-muted-foreground">Detalle de tu Proyecto</p>
    </div>

    <VueSkeleton v-if="pending" />
    <template v-if="!pending && project">
      <Card>
        <h1 class="text-2xl font-bold">
          {{ project.project_name }}
        </h1>

        <div class="space-y-2">
          <h2 class="text-muted-foreground">
            Empresa: {{ project.project_company }}
          </h2>

          <h2 class="text-muted-foreground">
            Categoría: {{ project.project_category }}
          </h2>

          <h2 class="text-muted-foreground">
            Fecha Inicio:
            {{ formatearTimeStamp(project.created_at).nuevaFecha }}
            {{ formatearTimeStamp(project.created_at).nuevaHora }}
          </h2>
        </div>
        <p>
          {{ project.project_description }}
        </p>
      </Card>

      <div class="grid grid-cols-3 gap-4 items-stretch">
        <Card>
          <p class="text-end">Estado Proyecto: {{ project.progress }}%</p>

          <h1 class="text-2xl font-semibold">Borrador</h1>
          <!--  <Progress :model-value="project.progress" /> -->
        </Card>

        <Card>
          <div class="flex flex-col h-full justify-between">
            <div>
              <h3 class="text-2xl font-semibold">RFP</h3>
              <p class="text-sm text-muted-foreground">Documentos relevantes</p>
            </div>

            <div class="mt-4">
              <Button
                @click.prevent="$router.push(`/project/${id_project}/rfp`)"
                class="w-full"
                size="sm"
              >
                Ver RFP
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div class="flex flex-col h-full justify-between">
            <div>
              <h3 class="text-2xl font-semibold">Tareas</h3>
              <p class="text-sm text-muted-foreground">Mis tareas asignadas</p>
            </div>

            <div class="mt-4">
              <Button
                @click.prevent="$router.push(`/project/${id_project}/tasks`)"
                class="w-full"
                size="sm"
              >
                Ver Tareas
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card v-if="!pendingUsers && projectUsers">
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Colaboradores</h1>

          <Button @click.prevent="showModalAddUser = true"
            >Nuevo Colaborador</Button
          >
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <template v-for="u in projectUsers" :key="u.id_user">
              <ProjectUserRow :u="u" />
            </template>
          </TableBody>
        </Table>
      </Card>
    </template>
  </div>
</template>
