<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()

documentTitle('Crear Proyecto')
definePageMeta({
  layout: 'admin-layout',
})

const isLoading = ref(false)
const addForm = ref({
  project_name: '',
  project_company: '',
  project_category: '',
  project_description: '',
})
/**
 *
 */
const newProject = async () => {
  isLoading.value = true

  toast('ok', 'Estamos creando tu proyecto')

  const res = await newQuestion(
    `Escríbeme una lista de tareas para poder realizar un proyecto llamado ${addForm.value.project_name} para la empresa ${addForm.value.project_company}, que es del rubro o categoría del área de ${addForm.value.project_category}, este proyecto requiere completarse a través del tiempo y se trata de ${addForm.value.project_description}, cada ítem de la lista deberá tener un titular breve, y una descripción prolongada detallando qué se trata cada punto, la lista debe ser enumerada y el titular debe separarse del contenido con un ":"`
  ).catch((err) => {
    toast('warning', 'La IA no se encuentra disponible')
    isLoading.value = false
    throw err
  })

  const arrayTasks = convertTextToList(res)

  const { status, data } = await $trpc.projects.newProject.mutate({
    project_name: addForm.value.project_name,
    project_description: addForm.value.project_description,
  })

  toast('ok', 'Estamos Añadiendo las tareas a tu proyecto')

  if (status === 'ok') {
    for (let i = 0; i < arrayTasks.length; i++) {
      const t = arrayTasks[i]

      const [title, ...description] = t.split(':')

      const fullDescription = description.join()

      await $trpc.tasks.newTask.mutate({
        id_project: data,
        task_status: 1,
        task_name: title ?? '',
        task_description: fullDescription ?? '',
      })
    }

    isLoading.value = false

    $router.push(`/ai/project/${data}`)
  }
}

/**
 *
 */
const convertTextToList = (fullText: string) => {
  let arrayOfStrings = fullText.split(/\d+\./)

  // Remove empty strings from the array
  arrayOfStrings = arrayOfStrings.filter((str) => str.trim() !== '')

  // Trim each string in the array to remove leading/trailing spaces
  arrayOfStrings = arrayOfStrings.map((str) => str.trim())

  return arrayOfStrings
}
</script>

<template>
  <div class="container-sm space-y-4">
    <h1 class="text-2xl font-bold">Crear nuevo proyecto</h1>
    <p class="text-muted-foreground">Describe tu nuevo proyectos</p>

    <Card>
      <div>
        <Label>Nombre del proyecto</Label>
        <Input
          v-model="addForm.project_name"
          placeholder="Ej: proyecto demostración"
        />
      </div>

      <div>
        <Label>Empresa</Label>
        <Input
          v-model="addForm.project_company"
          placeholder="Ej: Empresa Confidencial"
        />
      </div>

      <div>
        <Label>Categoría</Label>
        <Input
          v-model="addForm.project_category"
          placeholder="Ej: Telecomunicaciones"
        />
      </div>

      <div>
        <Label>Detalle de proyecto</Label>
        <Textarea
          placeholder="Mi proyecto se trata de telecomunicaciones"
          v-model="addForm.project_description"
        />
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <Label>RFP</Label>
          <Input type="file" />
        </div>

        <div>
          <Label>Detalle</Label>
          <Input type="file" />
        </div>
      </div>

      <div class="text-end">
        <Button :disabled="isLoading" @click.prevent="newProject">Crear</Button>
      </div>
    </Card>
  </div>
</template>
