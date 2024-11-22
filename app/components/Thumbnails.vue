<script setup lang="ts">
/**
 *
 */
const pictures = [
  {
    name: 'Mona y Diana',
    url: 'https://storage.googleapis.com/ghostpalace/20231128_191320.jpg',
  },
  {
    name: 'Diana',
    url: 'https://storage.googleapis.com/ghostpalace/20231128_121455(0).jpg',
  },
  {
    name: 'Diana',
    url: 'https://storage.googleapis.com/ghostpalace/20231128_121751.jpg',
  },
  {
    name: 'Stgo',
    url: 'https://storage.googleapis.com/ghostpalace/1714701394602.JPG',
  },
  {
    name: 'Stgo',
    url: 'https://storage.googleapis.com/ghostpalace/1714701136910.JPG',
  },
  {
    name: 'Los molles',
    url: 'https://storage.googleapis.com/ghostpalace/20240113173840_IMG_9547.JPG',
  },
  {
    name: 'Los molles',
    url: 'https://storage.googleapis.com/ghostpalace/20240113174955_IMG_9644.JPG',
  },
  {
    name: 'Los molles',
    url: 'https://storage.googleapis.com/ghostpalace/20240113173633_IMG_9525.JPG',
  },
]
/**
 *
 */
const format = () => {
  type Test = {
    firstColumn: typeof pictures
    secondColumn: typeof pictures
    thirdColumn: typeof pictures
  }
  const newObject: Test = {
    firstColumn: [],
    secondColumn: [],
    thirdColumn: [],
  }
  pictures.forEach((p, index) => {
    const columnIndex = index % 3
    switch (columnIndex) {
      case 0:
        newObject.firstColumn.push(p)
        break
      case 1:
        newObject.secondColumn.push(p)
        break
      case 2:
        newObject.thirdColumn.push(p)
        break
      default:
        break
    }
  })
  return newObject
}
</script>

<template>
  <div class="my-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="flex flex-col gap-8">
        <div
          class="cursor-pointer"
          v-for="(p, k) in format().firstColumn"
          :key="k"
        >
          <VuePicture :src="p.url" :title="p.name" />
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <div
          class="cursor-pointer"
          v-for="(p, k) in format().secondColumn"
          :key="k"
        >
          <VuePicture :src="p.url" :title="p.name" />
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <div
          class="cursor-pointer"
          v-for="(p, k) in format().thirdColumn"
          :key="k"
        >
          <VuePicture :src="p.url" :title="p.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}
.gallery-item {
  position: relative;
  width: 100%;
}
.gallery-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>
