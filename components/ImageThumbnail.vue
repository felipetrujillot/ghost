<script setup lang="ts">
const text = ref("");
const file = ref();

/**
 *
 */
const newScreen = computed(() => {
  if (file.value) {
    console.log(file.value);
    return "here";
  }
});
</script>

<template>
  <div style="min-height: 100vh; min-width: 100vw" class="relative">
    <div>
      <img
        class="absolute"
        src="https://storage.googleapis.com/linebox-bucket/pexels-merlin-lightpainting-10874585.jpg"
        style="height: 100vh; width: 100vw; filter: blur(12px)"
      />
    </div>
    <div
      style="min-height: 100vh"
      class="flex justify-center items-center relative"
    >
      <div class="container container-sm">
        <div>
          <h1
            class="text-9xl font-semibold text-center tracking-widest uppercase"
          >
            Reverie
          </h1>
          <h2 class="text-start tracking-widest" style="max-width: inherit">
            Polyphia
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
