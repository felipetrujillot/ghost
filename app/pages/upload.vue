<script setup lang="ts">
import { LucideFileImage, LucideXCircle } from 'lucide-vue-next'
/**
 *
 */
const filesDropHeader = async (files: File[]) => {
  const file = files[0]

  const [_oldName, ...formatArray] = file!.name.split('.')

  const format = formatArray[formatArray.length - 1]

  if (!file) {
    return toast('warning', 'No se pudo subir el documento')
  }

  const fileUrl = await uploadFileGcp(file)

  inputForm.value.url_imagen = fileUrl
}

const uploadProgress = ref(0)

const uploadFile = async (files: File[]) => {
  /**
   *
   */
  const file = files[0]

  const [_oldName, ...formatArray] = file!.name.split('.')

  const format = formatArray[formatArray.length - 1]

  if (format !== 'jpg' && format !== 'jpeg') {
    return toast('warning', 'El formato debe ser .jpg')
  }
  if (!file) {
    return toast('warning', 'No se pudo subir el documento')
  }

  const fileUrl = await uploadFileGcp(file)

  form.value.header_imagen = fileUrl
}

const inputForm = ref({
  url_imagen: '',
})

/**
 * Sube archivo
 * Retorna url de gcp
 * PÚBLICO
 * @param file
 * @returns
 */
const uploadFileGcp = async (file: File) => {
  const formData = new FormData()
  formData.append('document', file, file.name)

  const url = `/api/save`

  /**
   */

  const res = await $fetch(url, {
    method: 'POST',
    body: formData,
  })

  return res
}
</script>

<template>
  <div class="min-h-screen min-w-screen flex overflow-x-hidden">
    <div class="flex-1 flex justify-center items-center">
      <div class="max-w-lg container mx-auto px-2">
        <Card>
          <div class="space-y-2">
            <h1 class="text-primary text-center font-bold text-xl">
              Selecciona una imagen
            </h1>
            <Dropzone @files-dropped="uploadFile">
              <div class="border rounded-lg border-dashed cursor-pointer p-4">
                <div class="flex justify-center items-center h-full">
                  <div class="space-y-2 text-center">
                    <div class="flex justify-center">
                      <LucideFileImage class="center text-primary" :size="30" />
                    </div>
                    <h1 class="">
                      Arrastra la imagen o presiona aquí para subirla.
                    </h1>
                    <h2 class="text-sm text-muted-foreground">
                      Formato .jpg o .png soportado.
                    </h2>
                    <div v-if="uploadProgress > 0">
                      Progreso: {{ uploadProgress }}%
                    </div>
                  </div>
                </div>
              </div>
            </Dropzone>
          </div>

          <div class="space-y-4">
            <div
              class="flex mb-4 gap-4 items-center"
              v-if="inputForm.url_imagen.length > 0"
            >
              <div class="flex justify-start items-center w-full gap-4">
                <LucideXCircle
                  class="min-w-6 min-h-6 text-red-500 cursor-pointer"
                  @click.prevent="inputForm.url_imagen = ''"
                />

                <p>{{ inputForm.url_imagen }}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
