<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { any, type ZodType } from 'zod'

documentTitle('Nota')
definePageMeta({
  layout: 'add-layout',
})

type FormSchema = {
  val: string | number
  label: string
  placeholder: string | number
  required: boolean
  type: 'input' | 'input_number'
  select?: unknown
  schema: ZodType
  error: boolean
}

const useForm = <T extends Record<string, FormSchema>>(inputForm: T) => {
  const form = ref(inputForm)
  type InputFormKeys = keyof typeof inputForm

  const keysForm: InputFormKeys[] = Object.keys(inputForm) as InputFormKeys[]

  return { form, keysForm }
}

const { form, keysForm } = useForm({
  title: {
    val: '',
    label: 'Title',
    placeholder: 'Ejemplo',
    type: 'input',
    required: false,
    error: false,
    schema: any(),
  },
  quantity: {
    val: 0,
    label: 'Title',
    placeholder: 'Ejemplo',
    type: 'input_number',
    required: false,
    error: false,
    schema: any(),
  },
})

/**
 *
 */
const componentType = {
  input: {
    comp: defineAsyncComponent(() => import('../components/InputComp.vue')),
    tab: 'input',
  },

  input_number: {
    comp: defineAsyncComponent(() => import('../components/InputComp.vue')),
    tab: 'input_number',
  },
}
</script>

<template>
  <Card>
    <template v-for="i in keysForm">
      <component :is="componentType[form[i]!.type].comp" v-model="form[i]" />
    </template>
  </Card>
</template>
