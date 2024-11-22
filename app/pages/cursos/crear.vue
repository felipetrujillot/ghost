<script setup lang="ts">
import { z } from 'zod'

/**
 * Tabla de cursos
 */
documentTitle('Crear curso')

definePageMeta({
  layout: 'user-layout',
})

const { $trpc, $router } = useNuxtApp()
const nivel = [
  'I° Básico',
  'II° Básico',
  'III° Básico',
  'IV° Básico',
  'V° Básico',
  'VI° Básico',
  'VII° Básico',
  'VIII° Básico',
  'I° Medio',
  'II° Medio',
  'III° Medio',
  'IV° Medio',
] as const

const inputForm = {
  nombre_curso: {
    val: '',
    label: 'Nombre curso',
    type: 'input',
    placeholder: 'Curso ejemplo 1',
    required: true,
    schema: z.string().min(1),
    error: false,
  },
  nivel_curso: {
    val: '',
    label: 'Nivel',
    type: 'select',
    select: nivel.map((r) => {
      return {
        val: r,
        text: r,
      }
    }),
    placeholder: 'Selecciona un nivel',
    required: true,
    schema: z.enum(nivel),
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

  const { status, data, id_curso } = await $trpc.cursos.addCurso.mutate(params)

  if (status !== 'ok')
    return toast('err', 'Hubo un error al intentar crear el curso')

  toast('ok', 'El curso se creó correctamente')
  $router.push(`/cursos/${id_curso}`)
}
</script>

<template>
  <div class="flex justify-between">
    <div>
      <VueBreadCrumb text="Tueducas / " />
      <VueBreadCrumb to="/cursos" text="Cursos / " />
      <VueBreadCrumb text="Crear" />
      <h1 class="text-primary font-bold text-2xl">Crear curso</h1>
      <h2 class="text-muted-foreground">Listado de cursos</h2>
    </div>
  </div>

  <Card>
    <div>
      <p class="text-muted-foreground">
        El curso se añadirá al año/semestre actual
      </p>
    </div>
    <form class="space-y-4">
      <AutoForm v-model="form" :keysForm="keysForm" />

      <div class="text-end">
        <Button @click.prevent="crearCurso">Crear</Button>
      </div>
    </form>
  </Card>
</template>
