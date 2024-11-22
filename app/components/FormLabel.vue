<script setup lang="ts">
defineProps<{
  label?: string
  required?: boolean
}>()

const modelError = defineModel<boolean>('error')
</script>

<template>
  <div class="space-y-1" @click.prevent="modelError = false">
    <Label v-if="label" :class="error === true ? 'text-destructive' : ''">
      {{ label }} <span v-if="required" class="text-destructive">*</span></Label
    >

    <slot />
    <Label v-if="error" class="fadeInFast text-destructive text-xs">
      Este campo es requerido
    </Label>
  </div>
</template>
