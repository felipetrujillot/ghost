<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import { SquarePen } from 'lucide-vue-next'
import type { GetTasksByIdProject } from '~/server/trpc/routers/tasks'
const { $trpc } = useNuxtApp()
const props = defineProps<{ task: GetTasksByIdProject[0] }>()

const editTask = ref(false)
const modelTask = ref(props.task)
const taskRef = ref()
const emit = defineEmits(['emitUpdateTask'])
const overlay = ref(false)

/**
 *
 */
const formatStatus = computed(() => {
  if (props.task.task_status === 0) return 'Archivado'
  if (props.task.task_status === 1) return 'Sin Empezar'
  if (props.task.task_status === 2) return 'En curso'
  if (props.task.task_status === 3) return 'Listo'
  return 'Sin Empezar'
})
/**
 *
 */
const updateTask = () => {
  $trpc.tasks.updateTask
    .mutate({
      id_task: modelTask.value.id_task,
      task_status: modelTask.value.task_status,
      task_name: modelTask.value.task_name,
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
const saveInput = () => {
  updateTask()
  editTask.value = false
}

/**
 *
 */
const openSheet = () => {
  if (editTask.value === false) {
    overlay.value = true
  }
}
/**
 *
 */
const { focused } = useFocus(taskRef)

/**
 *
 */
const changeEditTask = async () => {
  editTask.value = !editTask.value
  await nextTick()
  focused.value = !focused.value
}
</script>

<template>
  <Sheet :open="overlay">
    <div @click.prevent="openSheet">
      <div class="flex justify-between gap-2">
        <div class="w-full">
          <p class="text-sm min-h-6" v-if="!editTask">
            {{ task.task_name }}
          </p>

          <template v-if="editTask">
            <div class="min-h-6">
              <Textarea
                v-model="modelTask.task_name"
                ref="taskRef"
                rows="10"
                class="focus-visible:ring-offset-0 p-0 m-0 min-h-0 min-h-5 border-none border-0"
                @keyup.enter="saveInput"
              />
            </div>
          </template>
        </div>
        <div class="flex">
          <SquarePen :size="20" @click.prevent="changeEditTask" />
        </div>
      </div>
      <!--  <i class="bi bi-grid"></i>&nbsp; Abrir -->
    </div>
    <SheetContent side="right" v-model:overlay="overlay">
      <SheetHeader>
        <SheetTitle class="text-3xl">{{ task.task_name }}</SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
      <div class="pt-4 pb-8 overflow-y-auto h-full space-y-4">
        <p class="text-md font-medium text-muted-foreground">
          Creado el: {{ formatearTimeStamp(task.created_at).nuevaFecha }}
          {{ formatearTimeStamp(task.created_at).nuevaHora }}
        </p>

        <p class="text-md font-medium text-muted-foreground">
          Responsable: Sin definir
        </p>

        <p class="text-md font-medium text-muted-foreground">
          Estado: {{ formatStatus }}
        </p>
        <p>
          {{ task.task_description }}
        </p>
      </div>
    </SheetContent>
  </Sheet>
</template>
