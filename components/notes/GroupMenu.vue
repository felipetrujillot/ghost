<script setup lang="ts">
import { Ellipsis } from 'lucide-vue-next'
import type { GetNotes } from '~/server/trpc/routers/notes'
const { $trpc, $router } = useNuxtApp()
const props = defineProps<{ item: GetNotes[0] }>()

const open = ref(false)

/**
 *
 */
const newNote = async () => {
  const { status, data } = await $trpc.notes.newNote.mutate({
    note_text: `<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>`,
    note_name: 'Nueva Nota',
    id_group_note: props.item.id_group_note,
  })

  $router.push(`/ai/note/${data}`)
}
</script>
<template>
  <Accordion
    type="single"
    class="w-full"
    collapsible
    :default-value="item.id_group_note.toString()"
  >
    <AccordionItem :value="item.id_group_note.toString()" class="border-none">
      <div class="flex w-full items-center justify-between gap-2">
        <div class="w-full">
          <AccordionTrigger>
            {{ item.group_name }}
          </AccordionTrigger>
        </div>

        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Ellipsis @click.prevent="" class="h-4 w-4 cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent class="w-[180px] p-0">
            <Command>
              <div>
                <Button
                  @click.prevent="newNote"
                  variant="outline"
                  class="hover:bg-primary justify-start hover:text-white w-full rounded-none"
                >
                  <a class="text-md font-medium"> Nueva nota</a>
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <AccordionContent class="space-y-1 gap-2">
        <NuxtLink
          :to="`/ai/note/${n.id_note}`"
          v-for="n in item.notes"
          class="flex items-center gap-3 rounded-lg px-3 transition-all hover:text-primary"
        >
          {{ n.note_name }}
        </NuxtLink>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
