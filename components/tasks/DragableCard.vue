<script setup lang="ts">
import { useFocus } from '@vueuse/core'
import Tiptap from '../Tiptap.vue'
import { LucideEllipsis } from 'lucide-vue-next'
import type { GetUsersByIdProject } from '~/server/trpc/routers/projects'

import type { GetTasksByIdProject } from '~/server/trpc/routers/tasks'
const { $trpc } = useNuxtApp()
const props = defineProps<{
  task: GetTasksByIdProject[0]
  projectUsers: GetUsersByIdProject
}>()
const taskRef = ref()
const editTask = ref(false)
const modelTask = ref(props.task)
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
const removeTask = () => {
  modelTask.value.active = 0
  updateTask()
}

const backlogTask = () => {
  modelTask.value.task_status = 5
  updateTask()
}
/**
 *
 */
const updateTask = () => {
  $trpc.tasks.updateTask
    .mutate({
      id_task: modelTask.value.id_task,
      task_status: modelTask.value.task_status,
      task_name: modelTask.value.task_name,
      task_description: modelTask.value.task_description,
      active: modelTask.value.active,
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
  if (editTask.value === false) {
    overlay.value = true

    await nextTick()

    focused.value = true
  }
}

/**
 *
 */
const changeEditTask = async () => {
  editTask.value = !editTask.value
}

/**
 *
 * @param text
 */
const saveNote = (text: string) => {
  modelTask.value.task_description = text
  updateTask()
  toast('ok', 'Se actualizó la información')
}

/**
 *
 */
const { focused } = useFocus(taskRef)
</script>

<template>
  <Sheet :open="overlay">
    <div>
      <div class="flex justify-between gap-2">
        <div class="w-full py-2" @click.prevent="openSheet">
          <p class="text-sm min-h-6">
            {{ task.task_name }}
          </p>
        </div>
        <div class="flex py-2">
          <Popover>
            <PopoverTrigger as-child>
              <LucideEllipsis
                @click.prevent="changeEditTask"
                :size="20"
                class="cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent class="w-[180px] p-0">
              <Command>
                <Button
                  variant="outline"
                  @click.prevent="removeTask"
                  class="hover:bg-primary justify-start hover:text-white w-full rounded-none"
                >
                  Borrar Nota
                </Button>

                <Button
                  variant="outline"
                  @click.prevent="backlogTask"
                  class="hover:bg-primary justify-start hover:text-white w-full rounded-none"
                >
                  Enviar a Backlog
                </Button>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
    <SheetContent side="right" v-model:overlay="overlay">
      <SheetHeader>
        <SheetTitle>
          <Textarea
            ref="taskRef"
            class="text-2xl font-bold m-0 p-0 min-h-1 resize border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            v-model="modelTask.task_name"
          ></Textarea>
        </SheetTitle>
        <SheetDescription> </SheetDescription>
      </SheetHeader>
      <div class="pt-4 pb-8 overflow-y-auto h-full space-y-4">
        <p class="text-md font-medium text-muted-foreground">
          Creado el: {{ formatearTimeStamp(task.created_at).nuevaFecha }}
          {{ formatearTimeStamp(task.created_at).nuevaHora }}
        </p>

        <div class="flex justify-between">
          <p class="text-md font-medium text-muted-foreground">Responsables:</p>

          <div class="cursor-pointer">
            <p class="text-md font-medium text-muted-foreground">
              <Popover>
                <PopoverTrigger class="flex items-center gap-1"
                  >&nbsp;Asignar

                  <LucideEllipsis
                    @click.prevent="changeEditTask"
                    :size="20"
                    class="cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent class="p-0">
                  <Button
                    v-for="u in projectUsers"
                    :key="u.id_user"
                    variant="outline"
                    class="w-full rounded-none justify-start"
                  >
                    {{ u.name }} {{ u.lastname }} ({{ u.email }})
                  </Button>
                </PopoverContent>
              </Popover>
            </p>
          </div>
        </div>

        <div>fdsfsd</div>

        <p class="text-md font-medium text-muted-foreground">Fecha Límite:</p>

        <p class="text-md font-medium text-muted-foreground">
          Estado: {{ formatStatus }}
        </p>

        <Tiptap :text="modelTask.task_description" @saveNote="saveNote" />
      </div>
    </SheetContent>
  </Sheet>
</template>
