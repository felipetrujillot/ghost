<script setup lang="ts">
documentTitle('Nota')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})
const { $trpc, $router } = useNuxtApp()

/**
 *
 */
const updateSaveNote = async (res: {
  id_note: number
  note_text: string
  note_name: string
}) => {
  const { data } = await $trpc.notes.addNote.mutate({
    note_text: res.note_text,
    note_name: res.note_name,
    id_note_group: 1,
  })

  $router.push(`/notas/${data}`)

  await setNotes()
}

const content = ``
</script>
<template>
  <div class="max-w-3xl mx-auto border-x min-h-full">
    <TipTapTitle
      :id_note="0"
      :note_text="content"
      note_name="Nueva Nota"
      @saveNote="updateSaveNote"
    />
  </div>
</template>
