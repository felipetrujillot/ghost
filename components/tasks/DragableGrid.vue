<script setup lang="ts">
import { SquarePen } from 'lucide-vue-next'
import type { GetTasksByIdProject } from '~/server/trpc/routers/tasks'
const { $trpc } = useNuxtApp()
const props = defineProps<{
  tasks: GetTasksByIdProject
}>()

const tasksRef = ref(props.tasks)

const filterTask = (status: number) => {
  return tasksRef.value.filter((t) => t.task_status === status)
}

/**
 *
 */
const startDrag = (
  event: DragEvent,
  item: { id_task: number; task_name: string }
) => {
  if (!event.dataTransfer) return

  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id_task', item.id_task.toString())
}

/**
 *
 */
const onDrop = (event: DragEvent, newStatus: number) => {
  if (!event.dataTransfer) return

  const id_task = parseInt(event.dataTransfer.getData('id_task'))

  /* tasksRef.value = tasksRef.value.filter((t) => {
    if (t.id_task !== id_task) return t
  })
 */

  $trpc.tasks.updateTask
    .mutate({
      id_task: id_task,
      task_status: newStatus,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      toast('err', 'Hubo un problema al intentar actualizar la información')
      throw err
    })
  tasksRef.value.forEach((t) => {
    if (t.id_task === id_task) {
      t.task_status = newStatus
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <Card
      class="p-2 h-80"
      @drop="onDrop($event, 1)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Badge variant="secondary"> Sin empezar </Badge>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(1)"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <p class="text-md">
          {{ t.task_name }}
        </p>
      </Card>
    </Card>

    <Card
      class="p-2 h-80"
      @drop="onDrop($event, 2)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Badge> En Curso </Badge>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(2)"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <div class="flex justify-between gap-2">
          <!--   <p class="text-md">
            {{ t.task_name }}
          </p> -->
          <Textarea v-model="t.task_name" class="min-h-10" />
          <SquarePen :size="20" />
        </div>
      </Card>
    </Card>

    <Card
      class="p-2 h-80"
      @drop="onDrop($event, 3)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Badge class="bg-green-700"> Listo </Badge>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(3)"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <p class="text-md">
          {{ t.task_name }}
        </p>
      </Card>
    </Card>

    <Card
      class="p-2 h-80"
      @drop="onDrop($event, 4)"
      @dragenter.prevent
      @dragover.prevent
    >
      <Badge variant="outline"> Archivados </Badge>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(4)"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <p class="text-md">
          {{ t.task_name }}
        </p>
      </Card>
    </Card>
  </div>
</template>
