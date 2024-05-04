<script setup lang="ts">
definePageMeta({
  layout: 'add-layout',
})

const pictures = [
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/20231128_191320.jpg',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/1714701394602.JPG',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/1714701136910.JPG',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/20240113173840_IMG_9547.JPG',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/20240113174955_IMG_9644.JPG',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/20240113173633_IMG_9525.JPG',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/20231128_121455(0).jpg',
  },
  {
    name: '',
    url: 'https://storage.googleapis.com/ghostpalace/20231128_121751.jpg',
  },
  /* {
    name: '',
    url: 'https://images.pexels.com/photos/2600964/pexels-photo-2600964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/21945939/pexels-photo-21945939/free-photo-of-woman-sitting-behind-red-curtain.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/19346493/pexels-photo-19346493/free-photo-of-portrait-of-woman-wearing-kimono-in-blur.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/22703015/pexels-photo-22703015/free-photo-of-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/21856170/pexels-photo-21856170/free-photo-of-a-black-and-white-photo-of-a-long-hallway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/21230602/pexels-photo-21230602/free-photo-of-a-tennis-court-with-a-shadow-on-it.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/22240892/pexels-photo-22240892/free-photo-of-a-black-and-white-photo-of-a-man-walking-down-the-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/20141251/pexels-photo-20141251/free-photo-of-cockburn-st-edinburgh.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: '',
    url: 'https://images.pexels.com/photos/14209208/pexels-photo-14209208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }, */
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
    const columnIndex = index % 3 // Modulo 3 to distribute images across columns
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
