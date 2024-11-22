<script setup lang="ts">
import { LucideX } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'

defineProps<{
  title?: string
  size?: string
  styleCss?: string
}>()

/**
 *
 */
const emits = defineEmits<{
  (e: 'closeModal'): void
}>()

/**
 *
 */
const escapeKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emits('closeModal')
  }
}

/**
 * Métodos de inicio y cierre de modal
 * Genéricos
 */
onMounted(() => {
  document.addEventListener('keydown', escapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', escapeKey)
})
</script>

<template>
  <Dialog :open="true">
    <DialogContent
      :class="size"
      class="top-10 translate-y-0 bg-neutral-50 dark:bg-background max-h-[90dvh] z-50 rounded-xl"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ title }}</h1>

        <LucideX
          :size="24"
          class="cursor-pointer"
          @click.prevent="$emit('closeModal')"
        />
      </div>

      <DialogHeader v-show="false">
        <DialogTitle></DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>

      <div class="overflow-y-auto max-h-[80dvh] space-y-4">
        <slot />
      </div>
    </DialogContent>
  </Dialog>
</template>
