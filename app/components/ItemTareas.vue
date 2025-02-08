<script setup lang="ts">
import { LucideEllipsis } from 'lucide-vue-next'

const { $trpc } = useNuxtApp()
const props = defineProps<{
  id_proyecto: number
  to: string
  text: string
  active: boolean
}>()
const showPopover = ref(false)
const showModalDelete = ref(false)

const deleteNota = async () => {
  await $trpc.notes.deleteNote.mutate({ id_note: props.id_proyecto })

  await setNotes()

  toast('ok', 'Se borró la nota')

  showModalDelete.value = false
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
        {{ text }}
      </NuxtLink>

      <!--  <div class="opacity-0 group-hover:opacity-100 transition-opacity">
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
                  value="Nueva tarea"
                  @click.prevent="showModalDelete = true"
                >
                  Borrar nota
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div> -->
    </div>
  </div>

  <!--  <VueModal
    @closeModal="showModalDelete = false"
    v-if="showModalDelete === true"
    title="Borrar nota"
  >
    <h1 class="text-2xl">¿Estás seguro que quieres borrar esta nota?</h1>
    <div class="text-end">
      <Button @click.prevent="deleteNota">Borrar</Button>
    </div>
  </VueModal> -->
</template>
