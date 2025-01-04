<script setup lang="ts">
type InputField = {
  val: number
  placeholder: string
  type: 'input'
}

const model = defineModel<InputField>()
</script>
<template>
  {{ model }}
</template>
