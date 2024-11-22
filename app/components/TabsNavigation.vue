<script setup lang="ts">
defineProps<{
  categorias: readonly string[]
}>()

const categoriaSeleccionada = defineModel<string>()
</script>
<template>
  <div class="flex-wrap hidden md:flex">
    <div
      v-for="c in categorias"
      :key="c"
      :class="
        categoriaSeleccionada === c ? 'border-primary' : 'border-gray-300'
      "
      style="border-bottom-width: 2px"
      class="border border-t-0 border-l-0 border-r-0 pb-2 cursor-pointer"
      @click.prevent="categoriaSeleccionada = c"
    >
      <p
        class="text-center font-medium text-sm mx-4"
        :class="
          categoriaSeleccionada === c ? 'text-primary' : 'text-muted-foreground'
        "
      >
        {{ c }}
      </p>
    </div>
  </div>

  <div class="block md:hidden">
    <Select v-model="categoriaSeleccionada">
      <SelectTrigger class="rounded-full">
        <SelectValue placeholder="Selecciona una Industria" class="" />
      </SelectTrigger>
      <SelectContent class="rounded-2xl">
        <SelectGroup>
          <SelectItem v-for="(c, k) in categorias" :key="k" :value="c">
            {{ c }}</SelectItem
          >
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
