<script setup lang="ts">
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
      class="top-10 translate-y-0 max-h-[90dvh] z-50 bg-black p-0 rounded-none"
    >
      <a
        class="cursor-pointer text-end text-2xl absolute right-0 pr-4 pt-2"
        @click.prevent="$emit('closeModal')"
      >
        X
      </a>

      <DialogHeader v-show="false">
        <DialogTitle></DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>

      <div class="overflow-y-auto max-h-[90dvh]">
        <slot />
      </div>
    </DialogContent>
  </Dialog>
</template>
