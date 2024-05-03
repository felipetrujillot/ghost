<template>
  <div class="fixed bg-black w-1/3 h-full"></div>
  <div class="w-full h-full bg-neutral-900 min-w-screen min-h-screen">
    <div class="w-full flex items-center h-full min-h-screen">
      <div class="fixed">
        <h1
          class="text-orientation font-extrabold tracking-tighter text-nowrap italic"
        >
          <span class="text-gray-500"> GH </span>
          <span class="text-white"> 0ST </span>
        </h1>
      </div>
      <div class="w-full h-full min-h-screen flex items-center">
        <div class="w-full text-end container container-sm">
          <div class="flex flex-col gap-3">
            <MenuButton title="SKILL" :active="true" />
            <MenuButton title="ITEM" />
            <MenuButton title="EQUIP" />
            <MenuButton title="PERSONA" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.text-orientation {
  font-size: 40vh;
  line-height: 30vh;
  writing-mode: vertical-lr;
}
</style>
