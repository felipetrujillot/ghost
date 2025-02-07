<script setup lang="ts">
documentTitle('Nota')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})

const { $trpc, $router } = useNuxtApp()

const gasto = ref(0)
</script>
<template>
  <div class="container-xs space-y-4">
    <VueBreadCrumb text="Inicio / " to="/" />
    <VueBreadCrumb text="Gastos" />

    <h1 class="text-primary font-bold text-2xl">Gastos</h1>

    <Input v-model="gasto" />
    <!--   <TipTapTitle
      :id_note="0"
      :note_text="content"
      note_name="Nueva Nota"
      @saveNote="saveNote"
    /> -->
  </div>
</template>
