<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import Tiptap from '../Tiptap.vue'
import { LucideEllipsis, LucideXCircle } from 'lucide-vue-next'

import type { GetTareasByIdProyecto } from '~~/server/trpc/routers/tareas'
const { $trpc } = useNuxtApp()
const props = defineProps<{
  tarea: GetTareasByIdProyecto[0]
}>()
const taskRef = ref()
const editTask = ref(false)
const modelTask = ref(props.tarea)
const emit = defineEmits(['emitUpdateTask'])
const overlay = ref(false)

/**
 *
 */
const removeTask = () => {
  modelTask.value.activo = 0
  updateTask()
}

const backlogTask = () => {
  modelTask.value.estado_tarea = 'Archivado'
  updateTask()
}

/**
 *
 */
const updateTask = () => {
  $trpc.tareas.updateTarea
    .mutate({
      id_tarea: modelTask.value.id_tarea,
      estado_tarea: modelTask.value.estado_tarea,
      nombre_tarea: modelTask.value.nombre_tarea,
      descripcion_tarea: modelTask.value.descripcion_tarea,
      activo: modelTask.value.activo,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      toast('err', 'Hubo un problema al intentar actualizar la información')
      throw err
    })

  emit('emitUpdateTask', modelTask.value)
}

/**
 *
 */
const openSheet = async () => {
  overlay.value = true

  await nextTick()

  focused.value = true
}

/**
 *
 * @param text
 */
const saveNote = (text: string) => {
  modelTask.value.descripcion_tarea = text
  updateTask()
  toast('ok', 'Se actualizó la información')
}

/**
 *
 */
const { focused } = useFocus(taskRef)
</script>

<template>
  <div>
    <div class="flex justify-between gap-2">
      <div class="w-full py-2" @click.prevent="openSheet">
        <p class="text-sm min-h-6">
          {{ tarea.nombre_tarea }}
        </p>
      </div>
      <div class="flex py-2">
        <Popover>
          <PopoverTrigger as-child>
            <LucideEllipsis :size="20" class="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent class="w-[180px] p-0">
            <Command>
              <CommandGroup heading="Opciones">
                <CommandItem value="delete" @click.prevent="removeTask">
                  Borrar Nota
                </CommandItem>

                <CommandItem value="backlog" @click.prevent="backlogTask">
                  Enviar a Backlog
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
  <Sheet :open="overlay">
    <SheetContent side="right" v-model:overlay="overlay">
      <SheetHeader>
        <SheetTitle>
          <Textarea
            ref="taskRef"
            class="text-2xl font-bold m-0 p-0 min-h-1 resize border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            v-model="modelTask.nombre_tarea"
          ></Textarea>
        </SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
      <div class="pt-4 pb-8 overflow-y-auto h-full space-y-4">
        <p class="text-md font-medium text-muted-foreground">
          Creado el: {{ formatearTimeStamp(tarea.created_at).nuevaFecha }}
          {{ formatearTimeStamp(tarea.created_at).nuevaHora }}
        </p>

        <p class="text-md font-medium text-muted-foreground">
          Estado: {{ tarea.estado_tarea }}
        </p>

        <Tiptap :text="modelTask.descripcion_tarea" @saveNote="saveNote" />
      </div>
    </SheetContent>
  </Sheet>
</template>
