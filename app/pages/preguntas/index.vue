<script setup lang="ts">
documentTitle('Banco de preguntas')

definePageMeta({
  layout: 'user-layout',
})

const preguntas = [
  {
    id_pregunta: 1,
    asignatura: 'Matemáticas',
    nivel: '7° Básico',
    eje: 'Números',
    habilidad: 'Resolver problemas',
    tipo: 'Selección múltiple',
  },

  {
    id_pregunta: 2,
    asignatura: 'Ciencias naturales',
    nivel: 'I° Medio',
    eje: 'Biología',
    habilidad: 'Comprender',
    tipo: 'Pregunta respuesta',
  },
  {
    id_pregunta: 3,
    asignatura: 'Ciencias naturales',
    nivel: 'I° Medio',
    eje: 'Física',
    habilidad: 'Aplicar',
    tipo: 'Verdadero y falso',
  },
  {
    id_pregunta: 4,
    asignatura: 'Matemáticas',
    nivel: 'III° Medio',
    eje: 'Geometría',
    habilidad: 'Aplicar',
    tipo: 'Selección única',
  },
  {
    id_pregunta: 5,
    asignatura: 'Matemáticas',
    nivel: 'IV° Medio',
    eje: 'Probabilidad y estadística',
    habilidad: 'Aplicar',
    tipo: 'Selección única',
  },
]

const asignatura = ref('')

const { totalPages, filtered, busqueda, page } = useDynamicTable({
  data: preguntas,
  limit: 6,
  varColumn: ['asignatura', 'nivel', 'eje', 'habilidad', 'tipo'],
})
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-primary font-bold text-2xl">Banco de preguntas</h1>
      <h2 class="text-muted-foreground">
        Busca y administra tus preguntas por categorías
      </h2>
    </div>
    <Button @click.prevent="$router.push('/preguntas/nueva')"
      >Nueva pregunta</Button
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

          <div>
            <Select v-model="asignatura">
              <SelectTrigger class="rounded-full">
                <SelectValue placeholder="Tipo" class="" />
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
          <TableHead> Asignatura </TableHead>
          <TableHead> Nivel </TableHead>
          <TableHead> Eje </TableHead>
          <TableHead> Habilidad </TableHead>
          <TableHead> Tipo </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(c, k) in filtered"
          :key="k"
          class="cursor-pointer"
          @click.prevent="$router.push(`/preguntas/${c.id_pregunta}`)"
        >
          <TableCell>{{ c.asignatura }}</TableCell>
          <TableCell>{{ c.nivel }}</TableCell>
          <TableCell>{{ c.eje }}</TableCell>
          <TableCell>{{ c.habilidad }}</TableCell>
          <TableCell>
            <Badge>
              {{ c.tipo }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </VueDynamicTable>
  </Card>
</template>
