<script setup lang="ts">
import { LucideEllipsis } from 'lucide-vue-next'
documentTitle('Tareas')

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
      <div class="space-y-4 py-4 min-h-full flex flex-col border-r border-l">
        <div class="px-4">
          <div class="group flex items-center justify-between">
            <h1 class="text-lg">Pendientes</h1>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <Popover v-model:open="popoverPendientes">
                <PopoverTrigger as-child>
                  <LucideEllipsis
                    class="cursor-pointer min-w-4 min-h-4 h-4 w-4 max-h-4 max-w-4"
                  />
                </PopoverTrigger>
                <PopoverContent class="w-[180px] p-0">
                  <Command>
                    <CommandGroup>
                      <CommandItem value="Nueva tarea">
                        Nueva tarea
                      </CommandItem>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-y-scroll">
          <div class="space-y-2">
            <Card class="cursor-pointer bg-secondary">
              <div class="group flex items-center justify-between">
                <p>Tarea pendiente</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div class="space-y-4 py-4 min-h-full flex flex-col border-r border-l">
        <div class="px-4">
          <h1 class="text-lg">En proceso</h1>
        </div>
        <div class="flex-1 overflow-y-scroll">
          <div class="space-y-2">
            <Card class="cursor-pointer bg-secondary">Hola</Card>
          </div>
        </div>
      </div>

      <div class="space-y-4 py-4 min-h-full flex flex-col border-r border-l">
        <div class="px-4">
          <h1 class="text-lg">Completadas</h1>
        </div>
        <div class="flex-1 overflow-y-scroll">
          <div class="space-y-2">
            <Card class="cursor-pointer bg-secondary">Hola</Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
