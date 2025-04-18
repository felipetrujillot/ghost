<script setup lang="ts">
definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})

const uploadFile = async (files: File[]) => {
  const file = files[0]
  /**
   *
   */

  if (!file) throw new Error('ERROR con archivo')

  if (file.type !== 'application/pdf') {
    return toast('warning', 'El formato debe ser .pdf')
  }
}

const url_imagen = ref('')
</script>

<template>
  <div class="container">
    <div class="flex flex-row">
      <div class="basis-2/4">1</div>

      <div class="basis-2/4">
        <DropzoneClick
          @files-dropped="uploadFile"
          v-if="url_imagen.length === 0"
        >
          <div class="bg-secondary p-2">
            <LucidePaperclip class="cursor-pointer text-primary-foreground" />
          </div>
        </DropzoneClick>
      </div>
    </div>
  </div>
</template>
