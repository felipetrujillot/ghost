<script setup lang="ts">
documentTitle('Nota')
definePageMeta({
  layout: 'notes-layout',
})
const { $trpc } = useNuxtApp()
const route = useRoute()
const id_note = parseInt(route.params.id_note as string)

const { data: note, pending } = $trpc.notes.getNoteById.useQuery({
  id_note,
})
</script>
<template>
  <div class="w-full container-xs ml-auto mr-auto">
    <VueSkeleton v-if="pending" />

    <template v-if="!pending && note">
      <DocumentTitle :title="note.title_note" />
      <Tiptap
        :id_note="id_note"
        :text_note="note.text_note"
        :title_note="note.title_note"
      />
    </template>
  </div>
  <!--  <Textarea /> -->
</template>
