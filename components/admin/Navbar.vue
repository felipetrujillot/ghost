<script setup lang="ts">
import { CircleUser, CircleUserRound } from 'lucide-vue-next'
const open = ref(false)

const route = useRoute()

const logout = () => {
  logoutToIndex()
}
</script>

<template>
  <header class="h-16">
    <div
      style="z-index: 1"
      class="flex fixed h-16 bg-background border-b items-center w-screen min-w-screen"
    >
      <div class="flex container">
        <nav class="flex items-center space-x-4 lg:space-x-6">
          <img src="/icon.svg" width="20" height="20" />
          <NuxtLink
            to="/admin/users"
            class="text-sm font-medium transition-colors hover:text-primary"
            :class="
              route.path === `/admin/users` ? '' : 'text-muted-foreground'
            "
          >
            Usuarios
          </NuxtLink>

          <NuxtLink
            to="/admin/companies"
            :class="
              route.path === `/admin/companies` ? '' : 'text-muted-foreground'
            "
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Empresas
          </NuxtLink>

          <NuxtLink
            to="/notes"
            :class="route.path === `/notes` ? '' : 'text-muted-foreground'"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Notas
          </NuxtLink>

          <NuxtLink
            to="/projects"
            :class="route.path === `/projects` ? '' : 'text-muted-foreground'"
            class="text-sm font-medium transition-colors hover:text-primary"
          >
            Proyectos
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center space-x-4">
          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <Button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 outline-none relative h-8 w-8 rounded-full"
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
                <span
                  class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full h-8 w-8"
                >
                  <CircleUserRound :size="24" />

                  <!--  <img
                    role="img"
                    class="h-full w-full object-cover"
                    alt="@shadcn"
                    style=""
                  /> --></span
                >
              </Button>
              <!-- 
              <a class="text-gray-900 cursor-pointer dark:text-white">
                Bienvenido
                <i class="bi bi-caret-down-fill"></i>
              </a> -->
            </PopoverTrigger>
            <PopoverContent class="w-[180px] p-0">
              <Command>
                <CommandGroup>
                  <CommandItem
                    value="settings"
                    @click.prevent=";(open = false), $router.push('/settings')"
                  >
                    Configuraciones
                  </CommandItem>

                  <CommandItem value="quit" @click.prevent="logout">
                    Salir
                  </CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  </header>
</template>
