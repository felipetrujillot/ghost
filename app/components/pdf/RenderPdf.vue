<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, toRef, watch } from 'vue'
import { AnnotationLayer, TextLayer } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { PDFLinkService } from 'pdfjs-dist/web/pdf_viewer.mjs'
import type {
  OnProgressParameters,
  PDFDocumentProxy,
  PDFPageProxy,
  PageViewport,
} from 'pdfjs-dist'

import type { PasswordRequestParams, Source } from './types'
import {
  addPrintStyles,
  createPrintIframe,
  downloadPdf,
  emptyElement,
  releaseChildCanvases,
} from './utils'
import { useVuePdfEmbed } from 'vue-pdf-embed'
import { LucideZoomIn, LucideZoomOut } from 'lucide-vue-next'
import { autoResetRef } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    /**
     * Whether to enable an annotation layer.
     */
    annotationLayer?: boolean
    /**
     * Desired page height.
     */
    height?: number
    /**
     * Root element identifier (inherited by page containers with page number
     * postfixes).
     */
    id?: string
    /**
     * Path for annotation icons, including trailing slash.
     */
    imageResourcesPath?: string
    /**
     * Number of the page to display.
     */
    page?: number
    /**
     * Desired page rotation angle.
     */
    rotation?: number
    /**
     * Desired ratio of canvas size to document size.
     */
    scale?: number
    /**
     * Source of the document to display.
     */
    source: Source
    /**
     * Whether to enable a text layer.
     */
    textLayer?: boolean
    /**
     * Desired page width.
     */
    width?: number

    // metadata?: MetadataPdf[]

    originalFilename?: string
  }>(),
  {
    rotation: 0,
    scale: 1,
  },
)

const emit = defineEmits<{
  (e: 'internal-link-clicked', value: number): void
  (e: 'loaded', value: PDFDocumentProxy): void
  (e: 'loading-failed', value: Error): void
  (e: 'password-requested', value: PasswordRequestParams): void
  (e: 'progress', value: OnProgressParameters): void
  (e: 'rendered'): void
  (e: 'rendering-failed', value: Error): void
  (e: 'new-page', value: number): void
}>()

const pageNums = shallowRef<number[]>([])
const pageScales = ref<number[]>([])
const root = shallowRef<HTMLDivElement | null>(null)

let renderingController: { isAborted: boolean; promise: Promise<void> } | null =
  null

const { doc } = useVuePdfEmbed({
  onError: (e) => {
    pageNums.value = []
    emit('loading-failed', e)
  },
  onPasswordRequest({ callback, isWrongPassword }) {
    emit('password-requested', { callback, isWrongPassword })
  },
  onProgress: (progressParams) => {
    emit('progress', progressParams)
  },
  source: toRef(props, 'source'),
})

const linkService = computed(() => {
  if (!doc.value || !props.annotationLayer) {
    return null
  }

  const service = new PDFLinkService()
  service.setDocument(doc.value)
  service.setViewer({
    scrollPageIntoView: ({ pageNumber }: { pageNumber: number }) => {
      emit('internal-link-clicked', pageNumber)
    },
  })
  return service
})

/**
 * Downloads the PDF document.
 * @param filename - Predefined filename to save.
 */
const download = async (filename: string) => {
  if (!doc.value) {
    return
  }

  const data = await doc.value.getData()
  //const metadata = await doc.value.getMetadata()
  const suggestedFilename =
    // @ts-expect-error: contentDispositionFilename is not typed
    filename ?? metadata.contentDispositionFilename ?? ''
  downloadPdf(data, suggestedFilename)
}

/**
 * Returns an array of the actual page width and height based on props and
 * aspect ratio.
 * @param ratio - Page aspect ratio.
 */
const getPageDimensions = (ratio: number): [number, number] => {
  let width: number
  let height: number

  if (props.height && !props.width) {
    height = props.height
    width = height / ratio
  } else {
    width = props.width ?? root.value!.clientWidth
    height = width * ratio
  }

  return [width, height]
}

/**
 * Prints a PDF document via the browser interface.
 * @param dpi - Print resolution.
 * @param filename - Predefined filename to save.
 * @param allPages - Whether to ignore the page prop and print all pages.
 */
const print = async (dpi = 300, filename = '', allPages = false) => {
  if (!doc.value) {
    return
  }

  const printUnits = dpi / 72
  const styleUnits = 96 / 72
  let container: HTMLDivElement
  let iframe: HTMLIFrameElement
  let title: string | undefined

  try {
    container = window.document.createElement('div')
    container.style.display = 'none'
    window.document.body.appendChild(container)
    iframe = await createPrintIframe(container)

    const pageNums =
      props.page && !allPages
        ? [props.page]
        : [...Array(doc.value.numPages + 1).keys()].slice(1)

    await Promise.all(
      pageNums.map(async (pageNum, i) => {
        const page = await doc.value!.getPage(pageNum)
        const viewport = page.getViewport({
          scale: 1,
          rotation: 0,
        })

        if (i === 0) {
          const sizeX = (viewport.width * printUnits) / styleUnits
          const sizeY = (viewport.height * printUnits) / styleUnits
          addPrintStyles(iframe, sizeX, sizeY)
        }

        const canvas = window.document.createElement('canvas')
        canvas.width = viewport.width * printUnits
        canvas.height = viewport.height * printUnits
        container.appendChild(canvas)
        const canvasClone = canvas.cloneNode() as HTMLCanvasElement
        iframe.contentWindow!.document.body.appendChild(canvasClone)

        await page.render({
          canvasContext: canvas.getContext('2d')!,
          intent: 'print',
          transform: [printUnits, 0, 0, printUnits, 0, 0],
          viewport,
        }).promise

        canvasClone.getContext('2d')!.drawImage(canvas, 0, 0)
      }),
    )

    if (filename) {
      title = window.document.title
      window.document.title = filename
    }

    iframe.contentWindow?.focus()
    iframe.contentWindow?.print()
  } finally {
    if (title) {
      window.document.title = title
    }

    releaseChildCanvases(container!)
    container!.parentNode?.removeChild(container!)
  }
}

/**
 * Renders the PDF document as canvas element(s) and additional layers.
 */
const render = async () => {
  if (!doc.value || renderingController?.isAborted) {
    return
  }

  try {
    pageNums.value = props.page
      ? [props.page]
      : [...Array(doc.value.numPages + 1).keys()].slice(1)
    pageScales.value = Array(pageNums.value.length).fill(1)

    await Promise.all(
      pageNums.value.map(async (pageNum, i) => {
        const page = await doc.value!.getPage(pageNum)
        if (renderingController?.isAborted) {
          return
        }
        const pageRotation =
          ((props.rotation % 90 === 0 ? props.rotation : 0) + page.rotate) % 360
        const [canvas, canvasMetadata] = Array.from(
          root.value!.getElementsByClassName('vue-pdf-embed__page')[i].children,
        ) as [HTMLCanvasElement, HTMLCanvasElement]

        const isTransposed = !!((pageRotation / 90) % 2)
        const viewWidth = page.view[2] - page.view[0]
        const viewHeight = page.view[3] - page.view[1]
        const [actualWidth, actualHeight] = getPageDimensions(
          isTransposed ? viewWidth / viewHeight : viewHeight / viewWidth,
        )
        const cssWidth = `${Math.floor(actualWidth)}px`
        const cssHeight = `${Math.floor(actualHeight)}px`
        const pageWidth = isTransposed ? viewHeight : viewWidth
        const pageScale = actualWidth / pageWidth
        const viewport = page.getViewport({
          scale: pageScale,
          rotation: pageRotation,
        })

        pageScales.value[i] = pageScale

        canvas.style.display = 'block'
        canvas.style.width = cssWidth
        canvas.style.height = cssHeight

        /*  canvasMetadata.style.display = 'block'
        canvasMetadata.style.width = cssWidth
        canvasMetadata.style.height = cssHeight
 */
        const renderTasks = [
          renderPage(
            page,
            viewport.clone({
              scale: viewport.scale * window.devicePixelRatio * props.scale,
            }),
            canvas,
            //canvasMetadata
          ),
        ]

        /*  if (props.textLayer) {
          renderTasks.push(
            renderPageTextLayer(
              page,
              viewport.clone({
                dontFlip: true,
              }),
              div1
            )
          )
        }

        if (props.annotationLayer) {
          renderTasks.push(
            renderPageAnnotationLayer(
              page,
              viewport.clone({
                dontFlip: true,
              }),
              div2 || div1
            )
          )
        } */

        return Promise.all(renderTasks)
      }),
    )

    if (!renderingController?.isAborted) {
      emit('rendered')
    }
  } catch (e) {
    pageNums.value = []
    pageScales.value = []

    if (!renderingController?.isAborted) {
      emit('rendering-failed', e as Error)
    }
  }
}

const mapColor = (input: string) => {
  if (input === 'Caption') return '#FFC300'
  if (input === 'Footnote') return '#581845'
  if (input === 'Formula') return '#FF5733'
  if (input === 'List item') return '#42E8B4'
  if (input === 'Page footer') return '#FF5733'
  if (input === 'Page header') return '#581845'
  if (input === 'Picture') return '#C70039'
  if (input === 'Section header') return '#FF3D00'
  if (input === 'Table') return '#FF8C00'
  if (input === 'Text') return '#606060'
  if (input === 'Title') return '#002EFF'

  return 'black'
}

const isMouseInBox = (
  mouseX: number,
  mouseY: number,
  box: {
    x: number
    y: number
    width: number
    height: number
    color: string
    type: string
  },
) => {
  return (
    mouseX >= box.x &&
    mouseX <= box.x + box.width &&
    mouseY >= box.y &&
    mouseY <= box.y + box.height
  )
}

const renderMetadata = async (
  page: PDFPageProxy,
  canvas: HTMLCanvasElement,
  metadata: MetadataPdf[],
) => {
  const ocrData: {
    x: number
    y: number
    width: number
    height: number
    color: string
    type: string
  }[] = []

  metadata.forEach((c) => {
    if (c.page_number === page._pageIndex + 1) {
      const r = convertCoordinates({
        canvas: {
          page: page._pageIndex,
          height: canvas.height,
          width: canvas.width,
        },
        data: c,
      })
      ocrData.push(r)
    }
  })

  if (ocrData.length === 0) return

  const context = canvas.getContext('2d')

  if (!context) return
  // Draw bounding boxes
  context.lineWidth = 2

  ocrData.forEach((box) => {
    context.strokeStyle = box.color
    context.strokeRect(box.x, box.y, box.width, box.height)
  })

  canvas.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect() // Get the size and position of the canvas
    const scaleX = canvas.width / rect.width // Horizontal scale factor
    const scaleY = canvas.height / rect.height // Vertical scale factor
    const mouseX = (event.clientX - rect.left) * scaleX // Adjust for canvas scaling
    const mouseY = (event.clientY - rect.top) * scaleY
    // context.strokeRect(mouseX, mouseY, 10, 10)
    canvas.style.cursor = 'default'
    context.clearRect(0, 0, canvas.width, canvas.height)
    ocrData.forEach((box) => {
      context.strokeStyle = box.color
      context.strokeRect(box.x, box.y, box.width, box.height)
    })
    ocrData.forEach((box) => {
      if (isMouseInBox(mouseX, mouseY, box)) {
        canvas.style.cursor = 'pointer'

        // Display the text near the box
        context.fillStyle = box.color
        context.font = '28px Barlow'
        context.fillText(box.type, box.x, box.y - 5) // Show text above the box
      }
    })
  })
  canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect() // Get the size and position of the canvas
    const scaleX = canvas.width / rect.width // Horizontal scale factor
    const scaleY = canvas.height / rect.height // Vertical scale factor

    const mouseX = (event.clientX - rect.left) * scaleX // Adjust for canvas scaling
    const mouseY = (event.clientY - rect.top) * scaleY

    context.strokeRect(mouseX, mouseY, 10, 10)
    // Check if mouse clicked inside any box
    ocrData.forEach((box) => {
      if (isMouseInBox(mouseX, mouseY, box)) {
        console.log('pressed')
        // Trigger alert with the box's text
      }
    })
  })
}

/**
 * Renders the page content.
 * @param page - Page proxy.
 * @param viewport - Page viewport.
 * @param canvas - HTML canvas.
 */
const renderPage = async (
  page: PDFPageProxy,
  viewport: PageViewport,
  canvas: HTMLCanvasElement,
  // canvasMetadata: HTMLCanvasElement
) => {
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({
    canvasContext: canvas.getContext('2d')!,
    viewport,
  }).promise

  /* if (props.metadata) {
    canvasMetadata.width = viewport.width
    canvasMetadata.height = viewport.height
    renderMetadata(page, canvasMetadata, props.metadata)
  } */
}

type MetadataPdf = {
  left: number
  top: number
  width: number
  height: number
  page_number: number
  page_width: number
  page_height: number
  text: string
  type: string
}
type InputConverter = {
  canvas: {
    page: number
    height: number
    width: number
  }
  data: MetadataPdf
}

/**
 *
 * @param param0
 */
const convertCoordinates = ({ canvas, data }: InputConverter) => {
  const x = (canvas.width * data.left) / data.page_width
  const y = (canvas.height * data.top) / data.page_height

  const width = (canvas.width * data.width) / data.page_width
  const height = (canvas.height * data.height) / data.page_height

  return {
    x: x,
    y: y,
    width: width,
    height: height,
    color: mapColor(data.type),
    type: data.type,
    text: data.text,
  }
}

/**
 * Renders the annotation layer for the specified page.
 * @param page - Page proxy.
 * @param viewport - Page viewport.
 * @param container - HTML container.
 */
const renderPageAnnotationLayer = async (
  page: PDFPageProxy,
  viewport: PageViewport,
  container: HTMLDivElement,
) => {
  emptyElement(container)
  new AnnotationLayer({
    accessibilityManager: null,
    annotationCanvasMap: null,
    annotationEditorUIManager: null,
    div: container,
    page,
    viewport,
  }).render({
    annotations: await page.getAnnotations(),
    div: container,
    imageResourcesPath: props.imageResourcesPath,
    linkService: linkService.value!,
    page,
    renderForms: false,
    viewport,
  })
}

/**
 * Renders the text layer for the specified page.
 * @param page - Page proxy.
 * @param viewport - Page viewport.
 * @param container - HTML container.
 */
const renderPageTextLayer = async (
  page: PDFPageProxy,
  viewport: PageViewport,
  container: HTMLElement,
) => {
  emptyElement(container)
  new TextLayer({
    container,
    textContentSource: await page.getTextContent(),
    viewport,
  }).render()
}

watch(
  doc,
  (newDoc) => {
    if (newDoc) {
      emit('loaded', newDoc)
    }
  },
  { immediate: true },
)

watch(
  () => [
    doc.value,
    props.annotationLayer,
    props.height,
    props.imageResourcesPath,
    props.page,
    props.rotation,
    props.scale,
    props.textLayer,
    props.width,
  ],
  async ([newDoc]) => {
    if (newDoc) {
      if (renderingController) {
        renderingController.isAborted = true
        await renderingController.promise
      }

      releaseChildCanvases(root.value)
      renderingController = {
        isAborted: false,
        promise: render(),
      }

      await renderingController.promise
      renderingController = null
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  releaseChildCanvases(root.value)
})

defineExpose({
  doc,
  download,
  print,
})

const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 5) // Limit max zoom (e.g., 5x)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.1) // Limit min zoom (e.g., 0.1x)
}

const zoomLevel = ref(1)

const updatePage = (val: number) => {
  emit('new-page', val)
  //doc.value.set
  //pageNums.value = [1, 2]
}

const refPage = ref(props.page)
watch(pageNums, () => {
  refPage.value = props.page
})
</script>

<template>
  <div class="flex w-full justify-between">
    <h1 class="line-clamp-1 font-medium">
      {{ originalFilename }}
    </h1>

    <div class="z-10 flex flex-row-reverse gap-4">
      <LucideZoomIn
        class="cursor-pointer min-w-6 min-h-6 h-6 w-6 max-h-6 max-w-6 hover:text-primary"
        @click.prevent="zoomIn"
      />

      <LucideZoomOut
        class="cursor-pointer min-w-6 min-h-6 h-6 w-6 max-h-6 max-w-6 hover:text-primary"
        @click.prevent="zoomOut"
      />
    </div>
  </div>

  <div
    class="relative w-full h-full"
    :id="zoomLevel === 1 ? 'paginaLevel' : 'nopaginaLevel'"
    :style="zoomLevel === 1 ? 'overflow-y: auto' : ''"
  >
    <div
      class="relative w-full h-full"
      :id="zoomLevel !== 1 ? 'paginaZoomLevel' : 'nopaginaZoom'"
      :style="zoomLevel !== 1 ? 'overflow: auto' : ''"
    >
      <div
        class="w-full"
        style="width: inherit; height: inherit"
        :style="{ transform: `scale(${zoomLevel})` }"
      >
        <div :id="id" ref="root">
          <div v-for="(pageNum, i) in pageNums" :key="pageNum">
            <div
              :id="id && `${id}-${pageNum}`"
              class="vue-pdf-embed__page"
              :style="{
                '--scale-factor': pageScales[i],
                position: 'relative',
              }"
            >
              <canvas />
            </div>
          </div>
        </div>

        <template v-if="doc">
          <div class="flex justify-center pt-2">
            <Pagination
              v-model:page="refPage"
              v-slot="{ page }"
              @update:page="updatePage"
              :items-per-page="1"
              :total="doc.numPages"
              :sibling-count="1"
              show-edges
              :default-page="page"
            >
              <PaginationList
                v-slot="{ items }"
                class="flex items-center gap-1"
              >
                <!--  <PaginationFirst /> -->
                <PaginationPrev />

                <template v-for="(item, index) in items">
                  <PaginationListItem
                    v-if="item.type === 'page'"
                    :key="index"
                    :value="item.value"
                    as-child
                  >
                    <Button
                      class="w-10 h-10 p-0"
                      :variant="item.value === page ? 'default' : 'outline'"
                    >
                      {{ item.value }}
                    </Button>
                  </PaginationListItem>
                  <PaginationEllipsis
                    class="text-primary"
                    v-else
                    :key="item.type"
                    :index="index"
                  />
                </template>

                <PaginationNext />
                <!--    <PaginationLast /> -->
              </PaginationList>
            </Pagination>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
