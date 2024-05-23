<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next'

const { $trpc, $router } = useNuxtApp()
documentTitle('Proyecto')
definePageMeta({
  layout: 'admin-layout',
})

const route = useRoute()
const id_project = parseInt(route.params.id_project as string)
const { data: project, pending } = $trpc.projects.getProjectById.useQuery({
  id_project,
})

const open = ref(false)
</script>

<template>
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
          <p class="text-end">Progreso: {{ project.progress }}%</p>
          <Progress :model-value="project.progress" />
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

      <Card>
        <h1 class="text-2xl font-bold">Participantes</h1>

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
            <TableRow>
              <TableCell>Felipe</TableCell>
              <TableCell>hola@hola.cl</TableCell>
              <TableCell>Colaborador</TableCell>
              <TableCell>
                <Popover v-model:open="open">
                  <PopoverTrigger as-child>
                    <Ellipsis :size="20" class="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent class="w-[180px] p-0">
                    <Command>
                      <div>
                        <Button
                          variant="outline"
                          class="hover:bg-primary justify-start hover:text-white w-full rounded-none"
                        >
                          <a class="text-md font-medium"> Editar</a>
                        </Button>
                      </div>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </template>
  </div>
</template>
