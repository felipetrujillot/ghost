<script setup lang="ts">
import { LucidePencil, LucideSquarePen } from 'lucide-vue-next'

const { $trpc } = useNuxtApp()
const { status, data } = $trpc.chat.getChatSessions.useQuery()

const route = useRoute()
</script>

<template>
  <div class="min-h-screen">
    <div
      class="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr] min-h-screen"
    >
      <div class="hidden lg:block">
        <div class="flex flex-col gap-2" style="width: 250px">
          <div
            class="fixed flex flex-col justify-between border-r py-4 h-full"
            style="width: 250px"
          >
            <nav class="grid items-start text-sm font-medium">
              <!--   <h1
                class="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0"
              >
                Menús
              </h1> -->
              <div class="border-b pb-4 px-4">
                <div class="flex justify-between items-center">
                  <CommandModal />
                  <LucideSquarePen
                    :size="16"
                    v-if="route.path === '/chat'"
                    @click.prevent="$router.push('/chat')"
                    class="hover:text-primary cursor-pointer"
                  />
                </div>
              </div>

              <div
                class="px-2 lg:px-4 py-4 overflow-y-auto max-h-screen"
                v-if="route.path === '/chat'"
              >
                <div class="flex flex-col gap-4">
                  <template v-for="(item, k) in data" :key="k">
                    <NuxtLink
                      :to="`/chat?id=${item.uuid}`"
                      :class="
                        route.query.id === item.uuid
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      "
                    >
                      {{ item.titulo }}
                    </NuxtLink>
                  </template>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-1">
        <main class="flex flex-1 flex-col">
          <div class="flex-1">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
