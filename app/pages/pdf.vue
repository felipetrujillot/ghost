<script setup lang="ts">
import markdownit from 'markdown-it'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
})

const { source, statusDoc, metadata, selectedFilename, pdfScroll, scrollTo } =
  useDocsPdf()

/**
 *
 * @param doc
 */
const fetchDoc = async () => {
  statusDoc.value = 'pending'

  const res = await fetch(
    'https://storage.googleapis.com/hubdesign-repositorio/public/uploads/1744593157873-RFP%20Previred%20v1.0%20%20Bases%20Tecnicas.pdf',
  )

  const pdfData = await res.arrayBuffer()
  selectedFilename.value =
    'https://storage.googleapis.com/hubdesign-repositorio/public/uploads/1744593157873-RFP%20Previred%20v1.0%20%20Bases%20Tecnicas.pdf'

  /*  const getMetadata = await $trpc.documentos.getMetadata.query({
    id_normativa_documento: id_normativa_documento,
  })

  metadata.value = getMetadata */

  source.value = pdfData
  statusDoc.value = 'success'

  await timeSleep(1)
}

onMounted(async () => {
  return await fetchDoc()
})
const page = ref(1)

const newPage = (val: number) => {
  page.value = val
}

const t = await $fetch('/api/test')

/* const selectedContent = () => {
    
    return t.map((c) => {
        if(c.)
    })
} */
</script>

<template>
  <div class="container">
    <div class="flex flex-col md:flex-row flex-col-reverse gap-4">
      <div class="basis-2/4">
        <div v-if="statusDoc === 'success' && source" class="px-7">
          <ClientOnly>
            <PdfRenderPdf @new-page="newPage" :page="page" :source="source" />
          </ClientOnly>
        </div>
      </div>
      <div class="basis-2/4">
        <div class="space-y-8">
          <div v-for="a in t[page - 1]">
            <span class="underline text-orange-500">{{ a.type }}</span>

            <!-- <p>
              {{ a.text }}
            </p> -->
            <div
              style="white-space: pre-wrap"
              v-html="md.render(a.text)"
              class="dark:prose-invert !max-w-none prose prose-sm sm:prose lg:prose-md xl:prose-md focus:outline-none prose-p:leading-normal prose-p:m-0 prose-a:leading-normal prose-a:m-0 prose-h1:leading-normal prose-h1:m-0 prose-h2:leading-normal prose-h2:m-0 prose-h3-a:leading-normal prose-h3:m-0 prose-h4-a:leading-normal prose-h4:m-0 prose-h5-a:leading-normal prose-h5:m-0 prose-h6-a:leading-normal prose-h6:m-0 prose-li-a:leading-normal prose-li:m-0 prose-ul-a:leading-normal prose-ul:m-0"
            ></div>
            <!-- <template v-if="a.type === 'title'">
              <div>
                <span class="underline text-orange-500">{{ a.type }}</span>

                <h1 style="white-space: pre-wrap" class="text-2xl font-bold">
                  {{ a.text }}
                </h1>
              </div>
            </template>

            <template v-if="a.type === 'paragraph'">
              <div>
                <span class="underline text-blue-500">{{ a.type }}</span>

                <p style="white-space: pre-wrap">{{ a.text }}</p>
              </div>
            </template>

            <template v-if="a.type === 'header'">
              <div>
                <p style="white-space: pre-wrap">
                  <span class="underline text-green-500">{{ a.type }}</span>
                  {{ a.text }}
                </p>
              </div>
            </template>

            <template v-if="a.type === 'footer'">
              <div>
                <span class="underline text-red-500">{{ a.type }}</span>
                <p style="white-space: pre-wrap">
                  {{ a.text }}
                </p>
              </div>
            </template> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
