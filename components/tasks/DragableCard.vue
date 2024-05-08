<script setup lang="ts">
import { SquarePen } from 'lucide-vue-next'
import type { GetTasksByIdProject } from '~/server/trpc/routers/tasks'
const { $trpc } = useNuxtApp()
const props = defineProps<{ task: GetTasksByIdProject[0] }>()

const editTask = ref(false)
const refTask = ref(props.task)
const emit = defineEmits(['emitUpdateTask'])

const updateTask = () => {
  $trpc.tasks.updateTask
    .mutate({
      id_task: refTask.value.id_task,
      task_status: refTask.value.task_status,
      task_name: refTask.value.task_name,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      toast('err', 'Hubo un problema al intentar actualizar la información')
      throw err
    })

  emit('emitUpdateTask', refTask.value)
}

const saveInput = () => {
  updateTask()
  editTask.value = false
}
</script>

<template>
  <div class="flex justify-between gap-2">
    <div class="w-full">
      <p class="text-sm min-h-6" v-if="!editTask">
        {{ task.task_name }}
      </p>

      <template v-if="editTask">
        <div class="min-h-6">
          <Textarea
            v-model="refTask.task_name"
            class="focus-visible:ring-offset-0 p-0 m-0 min-h-0 min-h-5 border-none border-0"
            @keyup.enter="saveInput"
          />
        </div>
      </template>
    </div>
    <div class="flex">
      <SquarePen :size="20" @click.prevent="editTask = !editTask" />
    </div>
  </div>
</template>
