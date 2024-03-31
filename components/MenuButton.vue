<script setup lang="ts">
defineProps<{
  title: string;
  active?: boolean;
}>();
</script>

<template>
  <div>
    <h1
      :class="active === true ? 'text-dark-900' : 'text-sky-300'"
      class="text-6xl font-extrabold tracking-tighter"
    >
      {{ title }}
    </h1>
  </div>
</template>
