<script setup lang="ts">
useHead({
  title: `GhostPalace`,
  meta: [
    { name: "description", content: "Bienvenido al Software que te cuida" },
  ],
});
/**
 *
 */
</script>

<template>
  <div class="flex min-w-full min-h-full">
    <div class="w-full min-h-screen" style="overflow-x: scroll">
      <div class="container container-sm w-full h-full px-4 md:px-8 py-4">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
