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
      <Toaster />
    </NuxtLayout>
  </div>
</template>

<style>
.container-sm {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
}

.container-xs {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 720px;
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
