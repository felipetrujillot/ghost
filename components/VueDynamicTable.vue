<script setup lang="ts">
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

defineProps<{
  filtered: object[]
  totalPages: number
  placeholder: string
}>()
const route = useRoute()
const router = useRouter()

const scrollToTop = () => {
  //window.scrollTo({ top: 50, left: 0, behavior: 'instant' })
}

const page = defineModel<number>('page')
const busqueda = defineModel<string>('busqueda')

/**
 *
 * @param pageNumber
 */
const updatePage = async (pageNumber: number) => {
  page.value! += pageNumber
  scrollToTop()

  await nextTick()
  router.push(`?page=${page.value}`)
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
  <div class="grid grid-cols-4 gap-4">
    <slot name="header" />
    <div class="col-span-4 col-start-1 md:col-span-1 md:col-start-4">
      <div class="flex gap-0">
        <Input
          class="rounded-r-none"
          :placeholder="placeholder"
          type="text"
          v-model="busqueda"
        />

        <Button
          class="rounded-l-none"
          variant="outline"
          @click.prevent="busqueda = ''"
        >
          <X />
          <!--           <i
            class="ph ph-magnifying-glass text-xl"
            v-if="busqueda!.length === 0"
          ></i>
          <i
            class="ph ph-x-circle hand text-xl"
            v-if="busqueda!.length > 0"
          ></i> -->
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

  <div class="text-end mt-auto" v-if="filtered.length > 0">
    <div class="flex justify-end text-3xl">
      <ChevronLeft v-if="page === 1" class="text-gray-500" :size="30" />

      <!-- <i v-if="page === 1" class="ph ph-caret-left text-gray-500"></i> -->
      <ChevronLeft
        :size="30"
        @click.prevent="updatePage(-1)"
        v-if="page! > 1"
        class="text-primary cursor-pointer"
      />
      <ChevronRight
        :size="30"
        @click.prevent="updatePage(1)"
        v-if="page! < totalPages"
        class="text-primary cursor-pointer"
      />

      <!--   <i
        v-if="page! > 1"
        class="ph ph-caret-left cursor-pointer text-primary"
        @click.prevent="updatePage(-1)"
      ></i>
      <i
        v-if="page! < totalPages"
        class="ph ph-caret-right cursor-pointer text-primary"
        @click.prevent="updatePage(1)"
      ></i> -->

      <ChevronRight
        :size="30"
        v-if="page === totalPages"
        class="text-gray-500"
      />
      <!--  <i v-if="page === totalPages" class="ph ph-caret-right text-gray-500">
      </i> -->
    </div>
    <div class="text-sm me-2">{{ page }} de {{ totalPages }}</div>
  </div>
</template>
