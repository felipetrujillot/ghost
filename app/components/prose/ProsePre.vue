<template>
  <div class="py-4">
    <div class="w-full bg-popover">
      <div class="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="outline" @click.prevent="copyToClipboard">
                <LucideClipboard />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copiar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
    <pre
      ref="codeRef"
      class="dark:bg-popover bg-secondary px-4 overflow-x-scroll font-mono"
      :class="$props.class"
    >
      <slot />
    </pre>
  </div>
</template>

<script setup lang="ts">
import { LucideClipboard } from 'lucide-vue-next'

const codeRef = ref<HTMLElement | null>(null)

function copyToClipboard() {
  const el = codeRef.value
  if (el) {
    const text = el.innerText
    navigator.clipboard
      .writeText(text)

      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }
}

defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})
</script>

<style>
pre code .line {
  display: block;
}
</style>
