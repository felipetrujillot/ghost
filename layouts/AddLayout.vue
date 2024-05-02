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
    <!--  <Navbar title="RRHH" :role="1" />
    <SidebarRrhh /> -->

    <div class="w-full min-h-screen" style="overflow-x: scroll">
      <div class="container w-full h-full px-4 md:px-8 py-4">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainSlot {
  min-height: 100vh !important;
  overflow-x: auto;
}
.slotClass {
  padding-top: 55px !important;
}

.gradient-background {
  background: rgb(248, 249, 251);
  background: linear-gradient(
    to bottom right,
    rgb(235, 240, 252) 0%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 75%,
    rgb(235, 240, 252) 100%
  );
  /* You can also add additional styles here */
}
</style>
