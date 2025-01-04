<script setup lang="ts">
import { LucideCheck } from 'lucide-vue-next'

const props = defineProps<{
  text?: string
  disabled?: boolean
}>()
const model = defineModel<number>()

/**
 *
 */
const updateModel = () => {
  if (props.disabled) return

  if (model.value === 1) model.value = 0
  if (model.value === 0) model.value = 1
}
</script>

<template>
  <div class="items-center flex space-x-2" @click="updateModel">
    <Button
      :disabled="disabled"
      class="p-0 h-6 w-6 rounded-2xl"
      :variant="model === 0 ? 'outline' : 'default'"
    >
      <LucideCheck v-if="model === 1" :size="16" />
    </Button>

    <Label v-if="text" :class="disabled ? 'text-muted-foreground' : ''">
      {{ text }}
    </Label>
  </div>
</template>
