<script setup lang="ts">
import { ClipboardCopy } from 'lucide-vue-next'
const { $trpc } = useNuxtApp()

documentTitle('RFP')
definePageMeta({
  layout: 'admin-layout',
})
const route = useRoute()
const id_project = parseInt(route.params.id_project as string)
/**
 *
 */
const { data: project, pending } = $trpc.projects.getProjectById.useQuery({
  id_project,
})

const text = `
<body>
    <h1>Carta de Presentación</h1>
    <p>Nombre:</p>
    <input type="text" id="nombre">
    <p>Apellidos:</p>
    <input type="text" id="apellidos">
    <p>Dirección:</p>
    <input type="text" id="direccion">
    <p>Ciudad:</p>
    <input type="text" id="ciudad">
    <p>Fecha:</p>
    <input type="date" id="fecha">
    <button onclick="generarCarta()">Generar Carta</button>
    <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
</body>
`
/**
 *
 * @param textSaved
 */
const saveNote = (textSaved: string) => {
  console.log('here')
}
const tabs = ref('resumen')
</script>

<template>
  <div class="w-full container-sm ml-auto mr-auto space-y-4">
    <div>
      <VueBreadCrumb text="NoName / " />
      <VueBreadCrumb text="Proyectos / " to="/projects" />
      <VueBreadCrumb
        text="Detalle Proyecto / "
        :to="`/project/${id_project}`"
      />
      <VueBreadCrumb text="Propuesta" />
      <h1 class="text-2xl font-bold">Mi Propuesta</h1>
      <p class="text-muted-foreground">Detalle de tu Propuesta</p>
    </div>

    <VueSkeleton v-if="pending" />

    <div class="space-y-4" v-if="!pending && project">
      <Card>
        <Tiptap :text="text" @saveNote="saveNote" />
      </Card>
    </div>
  </div>
</template>
