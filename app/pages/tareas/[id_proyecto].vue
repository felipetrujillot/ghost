<script setup lang="ts">
import { LucideEllipsis } from 'lucide-vue-next'
import type { GetTareasByIdProyecto } from '~~/server/trpc/routers/tareas'
documentTitle('Tareas')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
const { $trpc, $router } = useNuxtApp()
const route = useRoute()
const id_proyecto = parseInt(route.params.id_proyecto as string)

const tareas = ref<GetTareasByIdProyecto>([])
/**
 *
 */
const filterTask = (status: string) => {
  return tareas.value!.filter((t) => {
    if (t.activo === 1 && t.estado_tarea === status) return t
  })
}

/**
 *
 */
const startDrag = (
  event: DragEvent,
  item: { id_tarea: number; nombre_tarea: string }
) => {
  if (!event.dataTransfer) return

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id_tarea', item.id_tarea.toString())
}

/**
 *
 */
const emitUpdateTask = (t: GetTareasByIdProyecto[0]) => {
  tareas.value!.forEach((tarea) => {
    if (tarea.id_tarea === t.id_tarea) {
      tarea = t
    }
  })
}

/**
 *
 * @param estadoTarea
 */
const addTarea = async (estadoTarea: string) => {
  await $trpc.tareas.addTarea.mutate({
    id_proyecto,
    estado_tarea: estadoTarea,
    nombre_tarea: 'Nueva tarea',
    descripcion_tarea: '',
  })
  await updateGetTareas()

  popoverPendientes.value
  popoverProceso.value
  popoverCompletadas.value
}

/**
 *
 */
const onDrop = (event: DragEvent, newStatus: string) => {
  if (!event.dataTransfer) return

  const id_tarea = parseInt(event.dataTransfer.getData('id_tarea'))

  const foundTask = tareas.value!.filter((t) => {
    if (t.id_tarea === id_tarea) return t
  })

  /**
   *
   */
  $trpc.tareas.updateTarea
    .mutate({
      id_tarea: id_tarea,
      estado_tarea: newStatus,
      nombre_tarea: foundTask[0]!.nombre_tarea,
      descripcion_tarea: foundTask[0]!.descripcion_tarea,
      activo: foundTask[0]!.activo,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      toast('err', 'Hubo un problema al intentar actualizar la información')
      throw err
    })

  tareas.value!.forEach((t) => {
    if (t.id_tarea === id_tarea) {
      t.estado_tarea = newStatus
    }
  })
}
/**
 *
 */

const popoverPendientes = ref(false)
const popoverProceso = ref(false)
const popoverCompletadas = ref(false)

const updateGetTareas = async () => {
  /**
   *
   */
  const res = await $trpc.tareas.getTareasByIdProyecto.query({
    id_proyecto,
  })

  tareas.value = res
}
onMounted(async () => {
  await updateGetTareas()
})
</script>
<template>
  <div class="container space-y-4 h-screen">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <div class="space-y-4 py-4 min-h-full flex flex-col border-r border-l">
        <div class="px-4">
          <div class="group flex items-center justify-between">
            <h1 class="text-lg">Pendientes</h1>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover v-model:open="popoverPendientes">
                <PopoverTrigger as-child>
                  <LucideEllipsis
                    class="cursor-pointer min-w-4 min-h-4 h-4 w-4 max-h-4 max-w-4"
                  />
                </PopoverTrigger>
                <PopoverContent class="w-[180px] p-0">
                  <Command>
                    <CommandGroup heading="Opciones">
                      <CommandItem
                        value="Nueva tarea"
                        @click.prevent="addTarea('Pendiente')"
                      >
                        Nueva tarea
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div
          class="flex-1 overflow-y-scroll"
          @drop="onDrop($event, 'Pendiente')"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="space-y-4">
            <div
              class="cursor-pointer bg-secondary py-0"
              v-for="t in filterTask('Pendiente')"
              :key="t.id_tarea"
              draggable="true"
              @dragstart="startDrag($event, t)"
            >
              <TasksDragableCard :tarea="t" @emitUpdateTask="emitUpdateTask" />
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4 py-4 min-h-full flex flex-col border-r border-l">
        <div class="px-4">
          <div class="group flex items-center justify-between">
            <h1 class="text-lg">En proceso</h1>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover v-model:open="popoverProceso">
                <PopoverTrigger as-child>
                  <LucideEllipsis
                    class="cursor-pointer min-w-4 min-h-4 h-4 w-4 max-h-4 max-w-4"
                  />
                </PopoverTrigger>
                <PopoverContent class="w-[180px] p-0">
                  <Command>
                    <CommandGroup heading="Opciones">
                      <CommandItem
                        value="Nueva tarea"
                        @click.prevent="addTarea('En proceso')"
                      >
                        Nueva tarea
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div
          class="flex-1 overflow-y-scroll"
          @drop="onDrop($event, 'En proceso')"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="space-y-4">
            <div
              class="cursor-pointer bg-secondary py-0"
              v-for="t in filterTask('En proceso')"
              :key="t.id_tarea"
              draggable="true"
              @dragstart="startDrag($event, t)"
            >
              <TasksDragableCard :tarea="t" @emitUpdateTask="emitUpdateTask" />
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4 py-4 min-h-full flex flex-col border-r border-l">
        <div class="px-4">
          <div class="group flex items-center justify-between">
            <h1 class="text-lg">Completadas</h1>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover v-model:open="popoverCompletadas">
                <PopoverTrigger as-child>
                  <LucideEllipsis
                    class="cursor-pointer min-w-4 min-h-4 h-4 w-4 max-h-4 max-w-4"
                  />
                </PopoverTrigger>
                <PopoverContent class="w-[180px] p-0">
                  <Command>
                    <CommandGroup heading="Opciones">
                      <CommandItem
                        value="Nueva tarea"
                        @click.prevent="addTarea('Completada')"
                      >
                        Nueva tarea
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div
          class="flex-1 overflow-y-scroll"
          @drop="onDrop($event, 'Completada')"
          @dragenter.prevent
          @dragover.prevent
        >
          <div class="space-y-4">
            <div
              class="cursor-pointer bg-secondary py-0"
              v-for="t in filterTask('Completada')"
              :key="t.id_tarea"
              draggable="true"
              @dragstart="startDrag($event, t)"
            >
              <TasksDragableCard :tarea="t" @emitUpdateTask="emitUpdateTask" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
