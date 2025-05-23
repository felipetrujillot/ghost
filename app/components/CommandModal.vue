<script setup lang="ts">
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'

const route = useRoute()
const notas = useNotes()
const chats = useChatSessions()
const tareasProyectos = useProyectosTareas()

const open = useShowModal()

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) e.preventDefault()
  },
})

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1]) handleOpenChange()
})

function handleOpenChange() {
  open.value = !open.value
}

const { $router } = useNuxtApp()

const selectItem = (to: string) => {
  if (to === '/logout') {
    logoutToIndex()
    return
  }

  $router.push(to)
  open.value = false
}
const changeTheme = (th: 'dark' | 'light') => {
  setTheme(th)
  open.value = false
}
</script>

<template>
  <div>
    <p
      class="text-sm text-muted-foreground cursor-pointer"
      @click.prevent="handleOpenChange"
    >
      <kbd
        class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
      >
        <span class="text-xs">⌘</span>K
      </kbd>
    </p>
    <CommandDialog v-model:open="open">
      <div class="p-4">
        <CommandInput :auto-focus="true" placeholder="Busca un menú..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem @select="selectItem('/')" value="inicio">
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

            <CommandItem @select="changeTheme('dark')" value="dark">
              Modo oscuro
            </CommandItem>

            <CommandItem @select="changeTheme('light')" value="light">
              Modo día
            </CommandItem>

            <CommandItem @select="selectItem('/logout')" value="cerrar sesión">
              Cerrar sesión
            </CommandItem>

            <template v-for="(grupo, k) in notas" :key="k">
              <template v-for="(n, i) in grupo.notes" :key="i">
                <CommandItem
                  @select="selectItem(`/notas/${n.id_note}`)"
                  :value="`NOTA: ${n.note_name} ${n.id_note}`"
                >
                  Nota: {{ n.note_name }}
                </CommandItem>
              </template>
            </template>

            <template v-if="route.name === 'chat'">
              <template v-for="(c, k) in chats" :key="k">
                <CommandItem
                  @select="selectItem(`/chat?id=${c.uuid}`)"
                  :value="`CHAT: ${c.titulo} ${c.id_chat_session}`"
                >
                  Chat: {{ c.titulo }}
                </CommandItem>
              </template>
            </template>

            <template v-for="(c, k) in tareasProyectos" :key="k">
              <CommandItem
                @select="selectItem(`/tareas/${c.id_proyecto}`)"
                :value="`Tareas: ${c.nombre_proyecto} ${c.id_proyecto}`"
              >
                Tareas: {{ c.nombre_proyecto }}
              </CommandItem>
            </template>
          </CommandGroup>
        </CommandList>
      </div>
    </CommandDialog>
  </div>
</template>
