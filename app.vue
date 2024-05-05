<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'dark',
  },
})
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

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  animation: fade 0.3s ease-in-out;
}
.fadeInFast {
  animation: fade 0.2s ease-in-out;
}
</style>
