<script setup lang="ts">
import type { GetNotes } from '~/server/trpc/routers/notes'
const route = useRoute()

defineProps<{
  notes: GetNotes
  pending: boolean
}>()
const { $trpc, $router } = useNuxtApp()
/**
 *
 */
const newNote = async () => {
  const { status, data } = await $trpc.notes.newNote.mutate({
    note_text: '',
    note_name: 'Nueva Nota',
  })

  $router.push(`/note/${data}`)
}
</script>

<template>
  <div class="hidden lg:block">
    <div class="flex flex-col gap-2" style="width: 280px">
      <div
        class="fixed flex flex-col justify-between border-r py-4 bg-muted/40 h-full"
        style="width: 280px"
      >
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <template v-if="!pending">
            <template v-for="n in notes">
              <NuxtLink
                :to="`/note/${n.id_note}`"
                :class="
                  route.path === `/note/${n.id_note}`
                    ? 'text-primary'
                    : 'text-muted-foreground'
                "
                class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
              >
                {{ n.note_name }}
              </NuxtLink>
            </template>
          </template>
        </nav>
        <div class="mb-20 text-end px-4">
          <Button @click.prevent="newNote">Nuevo</Button>
        </div>
      </div>
    </div>
  </div>
</template>
