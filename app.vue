<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "dark",
  },
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.container-sm {
  max-width: 960px;
}
</style>
