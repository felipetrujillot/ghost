<script setup lang="ts">
defineProps<{
  title: string;
  active?: boolean;
}>();
</script>

<template>
  <h1
    :class="active === true ? 'text-white' : 'text-sky-300'"
    class="text-6xl font-extrabold tracking-tighter cursor-pointer hover:text-white"
  >
    {{ title }}
  </h1>
</template>
