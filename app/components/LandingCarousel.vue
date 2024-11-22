<script setup lang="ts">
import {
  LucideCheckSquare,
  LucideRows3,
  ShoppingBag,
  ShoppingCart,
  FileText,
} from 'lucide-vue-next'

/**
 *
 */
const pictures = [
  {
    name: 'Punto de Venta',
    alt: 'Screenshot de Punto de Venta Linebox',
    url: 'https://storage.googleapis.com/linebox-bucket/media/landing_pos.webp',
    icon: ShoppingCart,
  },
  {
    name: 'Pagos',
    alt: 'Screenshot de Pagos Linebox',
    url: 'https://storage.googleapis.com/linebox-bucket/media/landing_ventas.webp',
    icon: LucideCheckSquare,
  },
  {
    name: 'Productos',
    alt: 'Screenshot de productos Linebox',
    url: 'https://storage.googleapis.com/linebox-bucket/media/landing_productos2.webp',
    icon: ShoppingBag,
  },
  {
    name: 'Inventario',
    alt: 'Screenshot de inventarios Linebox',
    url: 'https://storage.googleapis.com/linebox-bucket/media/landing_inventario.webp',
    icon: LucideRows3,
  },
  {
    name: 'Reportes',
    alt: 'Screenshot de productos Linebox',
    url: 'https://storage.googleapis.com/linebox-bucket/media/landing_reportes.webp',
    icon: FileText,
  },
]

const currentImage = ref(0)

/**
 *
 * @param pictureNumber
 */
const selectPicture = async (pictureNumber: number) => {
  currentImage.value = pictureNumber
}
</script>

<template>
  <div class="bg-white py-16 container lg:px-24 fadeInFast min-h-screen">
    <div class="max-w-4xl ml-auto mr-auto space-y-6 h-full">
      <h1
        class="text-4xl font-normal text-center tracking-tight text-gray-900 sm:text-6xl"
      >
        Lorem ipsum lorem ipsum
      </h1>

      <p class="text-xl leading-8 text-gray-600 mt-4 text-center">
        Lorem ipsum lorem ipsum
      </p>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card
          v-for="(p, k) in pictures"
          :key="k"
          @click.prevent="selectPicture(k)"
          class="cursor-pointer space-y-0 md:space-y-2 py-2 md:py-6"
          :class="k === currentImage ? 'bg-primary text-white shadow-lg' : ''"
        >
          <div class="hidden md:block lg:block">
            <div class="flex justify-center">
              <component :is="p.icon" v-if="p.icon" class="h-8 w-8" />
            </div>
          </div>
          <p class="text-center tracking-tight font-normal text-lg">
            {{ p.name }}
          </p>
        </Card>
      </div>

      <Card class="p-0 w-full shadow-none space-y-0 relative shadow-xl">
        <div class="flex items-center h-8 space-x-1.5 px-3">
          <div class="w-2.5 h-2.5 rounded-full bg-[#EC6A5F]"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-[#F4BF50]"></div>
          <div class="w-2.5 h-2.5 rounded-full bg-[#61C454]"></div>
        </div>

        <div class="relative aspect-[16/10]">
          <template v-for="(p, k) in pictures" :key="k">
            <div class="absolute">
              <img
                :class="k === currentImage ? 'opacity-1' : 'opacity-0'"
                class="inset-0 w-full aspect-[16/10] left-0 transition-opacity duration-500 rounded-xl"
                :src="p.url"
                style="object-fit: cover"
                :alt="p.alt"
                loading="lazy"
              />
            </div>
          </template>
        </div>
      </Card>
    </div>
  </div>
</template>
