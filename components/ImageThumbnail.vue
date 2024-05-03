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
  <div style="min-height: 100vh; min-width: 100vw" class="relative bg-black">
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
        <div class="flex justify-center">
          <div class="relative">
            <h1
              class="text-9xl p-0 m-0 font-semibold tracking-widest uppercase text-white"
            >
              BLOODBATH
            </h1>

            <div class="flex justify-between px-2 m-0 p-0">
              <h2
                class="left-0 text-start tracking-widest text-white uppercase"
              >
                Polyphia
              </h2>

              <h2 class="left-0 text-start tracking-widest text-white">
                @gh0stpalace
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
