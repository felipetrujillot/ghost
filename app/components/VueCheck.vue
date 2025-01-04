<script setup lang="ts">
import { LucideCheck } from 'lucide-vue-next'

defineProps<{
  disabled?: boolean
  status: boolean
}>()
</script>

<template>
  <div class="items-center flex space-x-2">
    <Button
      :disabled="disabled"
      class="p-0 h-6 w-6 rounded-2xl"
      :variant="status === false ? 'outline' : 'default'"
    >
      <LucideCheck v-if="status" :size="16" />
    </Button>
  </div>
</template>
