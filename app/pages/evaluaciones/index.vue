<script setup lang="ts">
documentTitle('Banco de preguntas')

definePageMeta({
  layout: 'user-layout',
})

const preguntas = [
  {
    id_evaluacion: 1,
    preguntas: 5,
    asignatura: 'Matemáticas',
    nivel: '7° Básico',
    nombre_evaluacion: 'Evaluación parcial °1',
    fecha: '22-01-2024',
    estado: 'Activa',
  },

  {
    id_evaluacion: 2,
    preguntas: 6,
    asignatura: 'Ciencias naturales',
    nivel: 'I° Medio',
    nombre_evaluacion: 'Tema 2, ciencias',
    fecha: '12-03-2024',
    estado: 'Activa',
  },
  {
    id_evaluacion: 3,
    preguntas: 7,
    asignatura: 'Ciencias naturales',
    nivel: 'I° Medio',
    nombre_evaluacion: 'Tema 3, Física',
    fecha: '15-03-2024',
    estado: 'Activa',
  },
  {
    id_evaluacion: 4,
    preguntas: 9,
    asignatura: 'Matemáticas',
    nivel: 'III° Medio',
    nombre_evaluacion: 'Geometría 3',
    fecha: '18-03-2024',
    estado: 'Activa',
  },
  {
    id_evaluacion: 5,
    preguntas: 12,
    asignatura: 'Matemáticas',
    nivel: 'IV° Medio',
    nombre_evaluacion: 'Probabilidad y estadística',
    fecha: '21-03-2024',
    estado: 'Activa',
  },
]

const asignatura = ref('')

const { totalPages, filtered, busqueda, page } = useDynamicTable({
  data: preguntas,
  limit: 6,
  varColumn: ['asignatura', 'nivel', 'nombre_evaluacion'],
})
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-primary font-bold text-2xl">Evaluaciones</h1>
      <h2 class="text-muted-foreground">Listado de mis evaluaciones</h2>
    </div>
    <Button @click.prevent="$router.push('/evaluaciones/nueva')"
      >Nueva evaluación</Button
    >
  </div>

  <Card>
    <VueDynamicTable
      v-model:busqueda="busqueda"
      v-model:page="page"
      :total-pages="totalPages"
      :filtered="filtered"
      placeholder="Busca una pregunta"
    >
      <template #header>
        <div class="flex flex-wrap gap-4">
          <div>
            <Select v-model="asignatura">
              <SelectTrigger class="rounded-full">
                <SelectValue placeholder="Asignatura" class="" />
              </SelectTrigger>
              <SelectContent class="rounded-2xl">
                <SelectGroup>
                  <SelectLabel>Asignatura</SelectLabel>
                  <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select v-model="asignatura">
              <SelectTrigger class="rounded-full">
                <SelectValue placeholder="Nivel" class="" />
              </SelectTrigger>
              <SelectContent class="rounded-2xl">
                <SelectGroup>
                  <SelectLabel>Asignatura</SelectLabel>
                  <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </template>
      <TableHeader>
        <TableRow>
          <TableHead> Evaluación </TableHead>
          <TableHead> Preguntas </TableHead>
          <TableHead> Asignatura </TableHead>
          <TableHead> Nivel </TableHead>
          <TableHead> Fecha </TableHead>
          <TableHead> Estado </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(c, k) in filtered"
          :key="k"
          class="cursor-pointer"
          @click.prevent="$router.push(`/evaluaciones/${c.id_evaluacion}`)"
        >
          <TableCell>{{ c.nombre_evaluacion }}</TableCell>
          <TableCell>
            <Badge>
              {{ c.preguntas }}
            </Badge>
          </TableCell>
          <TableCell>{{ c.asignatura }}</TableCell>
          <TableCell>{{ c.nivel }}</TableCell>
          <TableCell>{{ c.fecha }}</TableCell>
          <TableCell>
            <Badge>
              {{ c.estado }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </VueDynamicTable>
  </Card>
</template>
