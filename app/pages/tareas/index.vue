<script setup lang="ts">
import { LucideEllipsis } from 'lucide-vue-next'
documentTitle('tareas')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})

/**
 *
 */
const { $trpc, $router } = useNuxtApp()

const popoverPendientes = ref(false)
const popoverProceso = ref(false)
const popoverCompletadas = ref(false)
</script>
<template>
  <div class="container space-y-4 h-screen">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <div class="min-h-full flex flex-col border-r border-l border-y">
        <div class="px-4 h-14 border-b">
          <div class="flex h-full items-center">
            <h1 class="text-lg">Pendientes</h1>
          </div>
        </div>
        <div class="flex-1 overflow-y-scroll t">
          <div class="space-y-2"></div>
        </div>
      </div>

      <div class="min-h-full flex flex-col border-r border-l border-y">
        <div class="px-4 h-14 border-b">
          <div class="flex h-full items-center">
            <h1 class="text-lg">En proceso</h1>
          </div>
        </div>
        <div class="flex-1 overflow-y-scroll t">
          <div class="space-y-2"></div>
        </div>
      </div>

      <div class="min-h-full flex flex-col border-r border-l border-y">
        <div class="px-4 h-14 border-b">
          <div class="flex h-full items-center">
            <h1 class="text-lg">Completadas</h1>
          </div>
        </div>
        <div class="flex-1 overflow-y-scroll t">
          <div class="space-y-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
