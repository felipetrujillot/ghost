<script setup lang="ts">
import type { ZodType } from 'zod'

type InputField = {
  val: string | number
  label: string
  placeholder: string | number
  required: boolean
  type: string
  select?: unknown
  schema: ZodType
  error: boolean
}

const model = defineModel<InputField>()
</script>
<template>
  <div>
    {{ model }}
    <Input v-model="model!.val" />
  </div>
</template>
