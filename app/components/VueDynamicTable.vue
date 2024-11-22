<script setup lang="ts">
import { X, ChevronLeft, ChevronRight, LucideSearch } from 'lucide-vue-next'

const props = defineProps<{
  filtered: object[]
  totalPages: number
  placeholder: string
  autoScroll?: boolean
}>()
const route = useRoute()
const router = useRouter()

const scrollToTop = () => {
  window.scrollTo({ top: 50, left: 0, behavior: 'instant' })
}

const page = defineModel<number>('page')
const busqueda = defineModel<string>('busqueda')

/**
 *
 * @param pageNumber
 */
const updatePage = async (pageNumber: number) => {
  page.value! += pageNumber
  if (props.autoScroll) {
    scrollToTop()
  }

  await nextTick()
  router.replace(`?page=${page.value}`)
}

/**
 *
 * @param obj
 */
const isEmpty = (obj: object) => {
  return Object.keys(obj).length === 0
}

onMounted(() => {
  const routeQuery = route.query
  if (isEmpty(routeQuery)) return
  page.value = parseInt(routeQuery.page as unknown as string)
})

watch(busqueda, () => {
  const routeQuery = route.query
  if (isEmpty(routeQuery)) return

  page.value = 1
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <slot name="header" />
    <div class="col-span-2 col-start-1 md:col-span-1 md:col-start-4">
      <div class="flex gap-0">
        <Input
          v-model="busqueda"
          class="rounded-r-none w-48"
          :placeholder="placeholder"
          type="text"
        />

        <Button
          class="rounded-l-none border-input text-input"
          variant="outline"
          @click.prevent="busqueda = ''"
        >
          <X v-if="busqueda!.length > 0" :size="16" class="text-gray-600" />
          <LucideSearch
            v-if="busqueda!.length === 0"
            :size="16"
            class="text-gray-600"
          />
        </Button>
      </div>
    </div>
  </div>

  <div>
    <template v-if="filtered!.length === 0">
      <div class="text-center text-lg mt-5">No se encontró la búsqueda</div>
    </template>

    <Table v-if="filtered!.length > 0">
      <slot />
    </Table>
  </div>

  <div v-if="filtered.length > 0" class="text-end mt-auto">
    <div class="flex justify-end text-3xl">
      <ChevronLeft v-if="page === 1" class="text-gray-500" :size="30" />

      <!-- <i v-if="page === 1" class="ph ph-caret-left text-gray-500"></i> -->
      <ChevronLeft
        v-if="page! > 1"
        :size="30"
        class="text-primary cursor-pointer"
        @click.prevent="updatePage(-1)"
      />
      <ChevronRight
        v-if="page! < totalPages"
        :size="30"
        class="text-primary cursor-pointer"
        @click.prevent="updatePage(1)"
      />

      <ChevronRight
        v-if="page === totalPages"
        :size="30"
        class="text-gray-500"
      />
    </div>
    <div class="text-sm me-2">{{ page }} de {{ totalPages }}</div>
  </div>
</template>
