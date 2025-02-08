<script setup lang="ts">
import { LucideEllipsis } from 'lucide-vue-next'

const { $trpc } = useNuxtApp()

const props = defineProps<{
  uuid: string
  to: string
  text: string
  active: boolean
}>()

const showPopover = ref(false)
const showModalDelete = ref(false)
const showModalUpdate = ref(false)

const chatTitle = ref(props.text)

/**
 *
 */
const deleteChat = async () => {
  await $trpc.chat.deleteChat.mutate({ id: props.uuid })

  await setChatSessions()

  toast('ok', 'Se borró el chat')

  showModalDelete.value = false
  showPopover.value = false
}

/**
 *
 */
const updateTitle = async () => {
  if (chatTitle.value.length === 0)
    return toast('warning', 'Debes seleccionar un título')

  await $trpc.chat.updateTitle.mutate({
    id: props.uuid,
    titulo: chatTitle.value,
  })

  await setChatSessions()

  toast('ok', 'Se actualizó el nombre')

  showModalUpdate.value = false
  showPopover.value = false
}
</script>

<template>
  <div :class="active ? 'bg-secondary' : ''">
    <div class="flex justify-between items-center group px-4">
      <NuxtLink
        :to="to"
        class="flex-grow py-2"
        :class="active ? 'text-white bg-secondary' : 'text-muted-foreground'"
      >
        {{ text.length > 0 ? text : 'Sin nombre' }}
      </NuxtLink>

      <div class="opacity-0 group-hover:opacity-100 transition-opacity">
        <Popover v-model:open="showPopover">
          <PopoverTrigger as-child>
            <LucideEllipsis
              class="cursor-pointer min-w-4 min-h-4 h-4 w-4 max-h-4 max-w-4"
            />
          </PopoverTrigger>
          <PopoverContent class="w-[180px] p-0">
            <Command>
              <CommandGroup>
                <CommandItem
                  value="Borrar nota"
                  @click.prevent="showModalDelete = true"
                >
                  Borrar nota
                </CommandItem>

                <CommandItem
                  value="Renombrar"
                  @click.prevent="showModalUpdate = true"
                >
                  Renombrar
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>

  <VueModal
    @closeModal="showModalDelete = false"
    v-if="showModalDelete === true"
    title="Borrar Chat"
  >
    <h1>¿Estás seguro que quieres borrar este chat?</h1>
    <div class="text-end">
      <Button @click.prevent="deleteChat">Borrar</Button>
    </div>
  </VueModal>

  <VueModal
    @closeModal="showModalUpdate = false"
    v-if="showModalUpdate === true"
    title="Actualizar nombre"
  >
    <div class="px-4 space-y-4">
      <div class="space-y-1">
        <Label>Título</Label>
        <Input v-model="chatTitle" placeholder="Título" />
      </div>

      <div class="text-end">
        <Button @click.prevent="updateTitle">Aceptar</Button>
      </div>
    </div>
  </VueModal>
</template>
