<script setup lang="ts">
import {
  LucideAlignJustify,
  LucideHeart,
  LucideSquare,
  LucideSquarePen,
  X,
} from 'lucide-vue-next'

const overlay = ref(false)
const chats = useChatSessions()

const { $router } = useNuxtApp()

const selectItem = (to: string) => {
  if (to === '/logout') {
    logoutToIndex()
    return
  }

  $router.push(to)

  overlay.value = false
}
</script>

<template>
  <div class="w-full flex justify-between items-center">
    <Button variant="outline" @click.prevent="overlay = !overlay">
      <LucideAlignJustify />
    </Button>

    <h1>undefined</h1>

    <Button variant="outline">
      <LucideHeart />
    </Button>
  </div>
  <Sheet :open="overlay">
    <SheetContent class="p-0 m-0" side="left" v-model:overlay="overlay">
      <SheetHeader class="p-0 m-0">
        <SheetTitle class="p-0 px-0">
          <div class="flex w-full justify-end">
            <Button variant="outline" @click.prevent="selectItem('/chat')">
              <LucideSquarePen />
            </Button>
            <Button variant="outline" @click.prevent="overlay = !overlay">
              <X class="w-5 h-5" />
            </Button>
          </div>
          <p>undefined</p>
        </SheetTitle>
        <SheetDescription class="px-4">
          <Command class="w-full px-0">
            <CommandInput class="px-0" placeholder="Busca un chat..." />
            <CommandList class="px-0" style="min-height: 80vh">
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                <!--  <CommandItem @select="selectItem('/')" value="inicio">
              Inicio
            </CommandItem>
            <CommandItem @select="selectItem('/chat')" value="chat">
              Chat
            </CommandItem>
            <CommandItem @select="selectItem('/tareas')" value="tareas">
              Tareas
            </CommandItem>
            <CommandItem @select="selectItem('/notas')" value="notas">
              Notas
            </CommandItem>
            <CommandItem @select="selectItem('/gastos')" value="gastos">
              Gastos
            </CommandItem>

            <CommandItem @select="selectItem('/login')" value="login">
              Login
            </CommandItem>

            <CommandItem @select="selectItem('/logout')" value="cerrar sesión">
              Cerrar sesión
            </CommandItem>

            -->

                <template v-for="(c, k) in chats" :key="k">
                  <CommandItem
                    class="text-start px-0"
                    @select="selectItem(`/chat?id=${c.uuid}`)"
                    :value="`${c.titulo} ${c.id_chat_session}`"
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
