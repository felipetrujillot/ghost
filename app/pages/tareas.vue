<script setup lang="ts">
documentTitle('Nota')
definePageMeta({
  layout: 'user-layout',
})
const { $trpc, $router } = useNuxtApp()

/**
 *
 */
const saveNote = async (res: {
  id_note: number
  note_text: string
  note_name: string
}) => {
  const { data } = await $trpc.notes.newNote.mutate({
    note_text: res.note_text,
    note_name: res.note_name,
  })

  $router.push(`/note/${data}`)
}
</script>
<template>
  <div class="container-xs">
    <!--   <TipTapTitle
      :id_note="0"
      :note_text="content"
      note_name="Nueva Nota"
      @saveNote="saveNote"
    /> -->
  </div>
</template>
