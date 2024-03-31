<template>
  <div
    class="w-full h-full fixed mix-blend-multiply min-w-screen min-h-screen bg-gradient-to-t from-blue-500"
  ></div>
  <div
    class="w-full h-full fixed mix-blend-multiply min-w-screen min-h-screen bg-gradient-to-t from-sky-100"
  ></div>

  <div class="fixed bg-white w-1/3 h-full"></div>
  <div class="w-full h-full bg-blue-100 min-w-screen min-h-screen">
    <div class="w-full flex items-center h-full min-h-screen">
      <div class="fixed">
        <h1
          class="text-orientation font-extrabold tracking-tighter text-nowrap italic"
        >
          <span class="text-gray-500"> 01 </span>
          MAIN
        </h1>
      </div>
      <div class="w-full h-full min-h-screen flex items-center">
        <div class="h-full flex flex-col justify-center items-center w-full">
          <MenuButton title="SKILL" :active="true" />
          <MenuButton title="ITEM" />
          <MenuButton title="EQUIP" />
          <MenuButton title="PERSONA" />
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
