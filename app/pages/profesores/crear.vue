<script setup lang="ts">
import { z } from 'zod'

/**
 * Tabla de cursos
 */
documentTitle('Crear Profesor')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc, $router } = useNuxtApp()

const inputForm = {
  nombre: {
    val: '',
    label: 'Nombre',
    type: 'input',
    placeholder: 'Juan',
    required: true,
    schema: z.string().min(1),
    error: false,
  },
  nombre_segundo: {
    val: '',
    label: 'Segundo nombre',
    type: 'input',
    placeholder: 'Andrés',
    required: false,
    schema: z.string(),
    error: false,
  },
  apellido_paterno: {
    val: '',
    label: 'Apellido Paterno',
    type: 'input',
    placeholder: 'Perez',
    required: true,
    schema: z.string().min(1),
    error: false,
  },
  apellido_materno: {
    val: '',
    label: 'Apellido Materno',
    type: 'input',
    placeholder: 'Contreras',
    required: true,
    schema: z.string().min(1),
    error: false,
  },
  email: {
    val: '',
    label: 'Email',
    type: 'input',
    placeholder: 'Contreras',
    required: true,
    schema: z.string().email(),
    error: false,
  },
  rut: {
    val: '',
    label: 'Rut',
    type: 'input',
    placeholder: '11.111.111-1',
    required: true,
    schema: z.string(),
    error: false,
  },
}

const { form, validateForm, simplifyForm, updateForm, keysForm } =
  useForm(inputForm)

/**
 *
 *
 */
const crearCurso = async () => {
  const hasError = validateForm()

  if (hasError) return toast('warning', 'Debes completar el formulario')

  const params = simplifyForm(form.value)

  const { status, data, id_curso } = await $trpc.profes.addProfesor.mutate(
    params
  )

  if (status !== 'ok')
    return toast('err', 'Hubo un error al intentar crear el profesor')

  toast('ok', 'El profesor se creó correctamente')
  $router.push(`/profesores/${id_curso}`)
}
</script>

<template>
  <div class="flex justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb to="/profesores" text="Profesores / " />
      <VueBreadCrumb text="Crear" />
      <h1 class="text-primary font-bold text-2xl">Crear profesor</h1>
      <h2 class="text-muted-foreground">Formulario de creación de profesor</h2>
    </div>
  </div>

  <Card>
    <form class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <AutoForm v-model="form" :keysForm="keysForm" />
      </div>

      <div class="text-end">
        <Button @click.prevent="crearCurso">Crear</Button>
      </div>
    </form>
  </Card>
</template>
