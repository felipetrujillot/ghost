<script setup lang="ts">
documentTitle('Nota')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
const { $trpc } = useNuxtApp()
const route = useRoute()
const id_note = parseInt(route.params.id_note as string)

/**
 *
 */
const { data: note, status } = $trpc.notes.getNoteById.useQuery({
  id_note,
})
/**
 *
 */
const saveNote = async (res: {
  origin: string
  id_note: number
  note_text: string
  note_name: string
}) => {
  const { status, data } = await $trpc.notes.updateNote.mutate({
    id_note: res.id_note,
    note_text: res.note_text,
    note_name: res.note_name,
  })
  if (res.origin === 'shortcut') {
    toast(status, data)
  }
}
</script>
<template>
  <div class="max-w-3xl mx-auto border-x min-h-full">
    <VueSkeleton v-if="status === 'pending'" />

    <template v-if="status === 'success' && note">
      <DocumentTitle :title="note.note_name" />
      <TipTapTitle
        :id_note="id_note"
        :note_text="note.note_text"
        :note_name="note.note_name"
        @saveNote="saveNote"
      />
    </template>
  </div>
</template>
