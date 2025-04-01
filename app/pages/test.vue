<script setup lang="ts">
import { LucidePaperclip } from 'lucide-vue-next'

documentTitle('inicio')
definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})

const { $trpc_stream } = useNuxtApp()

const response = ref('')

/**
 *
 */
/* const streamR = async () => {
  response.value = ''

  const res = await $trpc_stream.chat.experimentalPrompt.mutate()
  //status.value = 'generating'

  for await (const line of res) {
    try {
      response.value += line
    } catch (err) {
      console.log(err)
    }
  }
} */

const url_imagen = ref('')

const uploadFile = async (files: File[]) => {
  const file = files[0]
  /**
   *
   */

  const [_oldName, ...formatArray] = file!.name.split('.')

  const format = formatArray[formatArray.length - 1]

  if (format !== 'jpg' && format !== 'jpeg' && format !== 'png') {
    return toast('warning', 'El formato debe ser .jpg o .png')
  }
  if (!file) {
    return toast('warning', 'No se pudo subir el documento')
  }

  const formData = new FormData()

  formData.set('name', 'John Doe')
  formData.set('occupation', 'tRPC Extraordinaire')

  /*   formData.append('document', file, file.name)

  console.log(formData)
 */
  const res = await $trpc_stream.chat.experimentalPrompt.mutate(formData)

  for await (const line of res) {
    try {
      response.value += line
    } catch (err) {
      console.log(err)
    }
  }
  return
  /* const fileUrl = await uploadFileGcp(file)

  url_imagen.value = fileUrl */
}
</script>

<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      {{ response }}

      <!--  <Button @click.prevent="streamR">Stream</Button> -->

      <Dropzone @files-dropped="uploadFile" v-if="url_imagen.length === 0">
        <div class="bg-secondary p-2">
          <LucidePaperclip class="cursor-pointer text-primary-foreground" />
        </div>
      </Dropzone>
    </div>
  </div>
</template>
