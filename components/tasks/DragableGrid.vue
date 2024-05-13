<script setup lang="ts">
import type { GetTasksByIdProject } from '~/server/trpc/routers/tasks'
const { $trpc } = useNuxtApp()
const props = defineProps<{
  tasks: GetTasksByIdProject
}>()

/**
 *
 */
const route = useRoute()
const id_project = parseInt(route.params.id_project as string)
const tasksRef = ref(props.tasks)

/**
 *
 */
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

  const foundTask = tasksRef.value.filter((t) => {
    if (t.id_task === id_task) return t
  })

  /**
   *
   */
  $trpc.tasks.updateTask
    .mutate({
      id_task: id_task,
      task_status: newStatus,
      task_name: foundTask[0].task_name,
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

/**
 *
 */
const emitUpdateTask = (t: GetTasksByIdProject[0]) => {
  tasksRef.value.forEach((task) => {
    if (task.id_task === t.id_task) {
      task = t
    }
  })
}

/**
 *
 */
const newTask = async (taskStatus: number) => {
  const { status, data } = await $trpc.tasks.newTask.mutate({
    id_project,
    task_name: '',
    task_description: '',
    task_status: taskStatus,
  })

  if (status === 'ok') {
    tasksRef.value.push(data)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card
      class="p-2 min-h-80"
      @drop="onDrop($event, 1)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="flex justify-between">
        <Badge variant="secondary"> Sin empezar </Badge>
        <p
          class="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          @click.prevent="newTask(1)"
        >
          Nueva tarea
        </p>
      </div>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(1)"
        :key="t.id_task"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <TasksDragableCard :task="t" @emitUpdateTask="emitUpdateTask" />
      </Card>
    </Card>

    <Card
      class="p-2 min-h-80"
      @drop="onDrop($event, 2)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="flex justify-between">
        <Badge> En Curso </Badge>

        <p
          class="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          @click.prevent="newTask(2)"
        >
          Nueva tarea
        </p>
      </div>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(2)"
        :key="t.id_task"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <TasksDragableCard :task="t" @emitUpdateTask="emitUpdateTask" />
      </Card>
    </Card>

    <Card
      class="p-2 min-h-80"
      @drop="onDrop($event, 3)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="flex justify-between">
        <Badge class="bg-green-700"> Listo </Badge>
        <p
          class="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          @click.prevent="newTask(3)"
        >
          Nueva tarea
        </p>
      </div>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(3)"
        :key="t.id_task"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <TasksDragableCard :task="t" @emitUpdateTask="emitUpdateTask" />
      </Card>
    </Card>

    <Card
      class="p-2 min-h-80"
      @drop="onDrop($event, 4)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="flex justify-between">
        <Badge variant="outline"> Archivados </Badge>

        <p
          class="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          @click.prevent="newTask(4)"
        >
          Nueva tarea
        </p>
      </div>

      <Card
        class="p-2 cursor-pointer bg-muted/40"
        v-for="t in filterTask(4)"
        :key="t.id_task"
        draggable="true"
        @dragstart="startDrag($event, t)"
      >
        <TasksDragableCard :task="t" @emitUpdateTask="emitUpdateTask" />
      </Card>
    </Card>
  </div>
</template>
