<script setup lang="ts">
import { ChevronDown, Ellipsis } from 'lucide-vue-next'

const preguntas = [
  {
    name: 'Preguntas',
    to: '/preguntas',
  },
  {
    name: 'Evaluaciones',
    to: '/evaluaciones',
  },
  /*   {
    name: 'Cursos',
    to: '/cursos',
  }, */
]

const clases = [
  {
    name: 'Profesores',
    to: '/profesores',
  },
  {
    name: 'Cursos',
    to: '/cursos',
  },
  {
    name: 'Alumnos',
    to: '/alumnos',
  },
]
const open = ref(false)
const route = useRoute()
</script>

<template>
  <div class="bg-muted/40 min-h-screen">
    <AdminNavbar />

    <div class="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div class="hidden lg:block">
        <div class="flex flex-col gap-2" style="width: 250px">
          <div
            class="fixed flex flex-col justify-between border-r py-4 bg-muted/40 h-full"
            style="width: 250px"
          >
            <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
              <h1
                class="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0"
              >
                Preguntas y evaluaciones
              </h1>
              <template v-for="(item, k) in preguntas" :key="k">
                <NuxtLink
                  :to="`${item.to}`"
                  :class="
                    route.path === item.to
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  "
                  class="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                >
                  {{ item.name }}
                </NuxtLink>
              </template>

              <div class="mt-4"></div>
              <h1
                class="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0"
              >
                Libro de clases
              </h1>

              <template v-for="(item, k) in clases" :key="k">
                <NuxtLink
                  :to="`${item.to}`"
                  :class="
                    route.path === item.to
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  "
                  class="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm"
                >
                  {{ item.name }}
                </NuxtLink>
              </template>
            </nav>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div class="space-y-4">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
