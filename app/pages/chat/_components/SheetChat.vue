<script setup lang="ts">
import {
  LucideAlignJustify,
  LucideHeart,
  LucideHome,
  LucideSquare,
  LucideSquarePen,
  Route,
  X,
} from 'lucide-vue-next'

const showSheet = defineModel<boolean>()
const chats = useChatSessions()

const { $router } = useNuxtApp()
const route = useRoute()
const selectItem = (to: string) => {
  if (to === '/logout') {
    logoutToIndex()
    return
  }

  $router.push(to)

  showSheet.value = false
}
</script>

<template>
  <div class="w-full flex justify-between items-center border-b">
    <Button variant="outline" @click.prevent="showSheet = !showSheet">
      <LucideAlignJustify />
    </Button>

    <h1 @click.prevent="$router.push('/')">undefined</h1>

    <Button variant="outline" @click.prevent="showSheet = !showSheet">
      <LucideAlignJustify />
    </Button>
  </div>
  <Sheet :open="showSheet" :invert="!showSheet">
    <SheetContent class="p-0 m-0" side="left" v-model:overlay="showSheet">
      <SheetHeader class="p-0 m-0">
        <SheetTitle class="p-0 px-0">
          <div class="flex w-full justify-between">
            <Button variant="outline" @click.prevent="$router.push('/')">
              <LucideHome class="w-5 h-5" />
            </Button>

            <div class="flex">
              <Button variant="outline" @click.prevent="selectItem('/chat')">
                <LucideSquarePen />
              </Button>
              <Button variant="outline" @click.prevent="showSheet = !showSheet">
                <X class="w-5 h-5" />
              </Button>
            </div>
          </div>
          <p>undefined</p>
        </SheetTitle>
        <SheetDescription class="px-4">
          <Command class="w-full px-0">
            <CommandInput class="px-0" placeholder="Busca un chat..." />
            <CommandList class="px-0" style="min-height: 80vh">
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                <template v-for="(c, k) in chats" :key="k">
                  <CommandItem
                    class="text-start px-0"
                    :class="
                      route.query.id === c.uuid
                        ? 'bg-accent data-[highlighted]:bg-accent'
                        : 'bg-background data-[highlighted]:bg-background'
                    "
                    @select="selectItem(`/chat?id=${c.uuid}`)"
                    :value="`CHAT: ${c.titulo} ${c.id_chat_session}`"
                  >
                    {{ c.titulo }}
                  </CommandItem>
                </template>
              </CommandGroup>
            </CommandList>
          </Command>
          <div class="pb-8 pt-4 overflow-y-auto h-full space-y-4">
            <p
              class="text-md font-medium text-muted-foreground"
              @select="selectItem('/logout')"
            >
              Cerrar sesión
            </p>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
