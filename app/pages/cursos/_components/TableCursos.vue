<script setup lang="ts">
import type { GetCursos } from '~~/server/trpc/routers/cursos'

const props = defineProps<{
  cursos: GetCursos
}>()

const cursos = ref(props.cursos)
const { totalPages, filtered, busqueda, page } = useDynamicTableRef({
  data: cursos,
  limit: 6,
  varColumn: ['nombre_curso', 'nivel_curso', 'created_at'],
})

const nivel = [
  'I° Básico',
  'II° Básico',
  'III° Básico',
  'IV° Básico',
  'V° Básico',
  'VI° Básico',
  'VII° Básico',
  'VIII° Básico',
  'I° Medio',
  'II° Medio',
  'III° Medio',
  'IV° Medio',
] as const

const nivelSelect = ref('')

watch(nivelSelect, () => {
  alert('TODO FILTRO')
})
</script>

<template>
  <Card>
    <VueDynamicTable
      v-model:busqueda="busqueda"
      v-model:page="page"
      :total-pages="totalPages"
      :filtered="filtered"
      placeholder="Busca un curso"
    >
      <template #header>
        <div class="flex flex-wrap gap-4">
          <div>
            <Select v-model="nivelSelect">
              <SelectTrigger class="rounded-full">
                <SelectValue placeholder="Nivel" class="" />
              </SelectTrigger>
              <SelectContent class="rounded-2xl">
                <SelectGroup>
                  <SelectLabel>Nivel</SelectLabel>
                  <SelectItem v-for="(c, k) in nivel" :key="k" :value="c">{{
                    c
                  }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </template>
      <TableHeader>
        <TableRow>
          <TableHead> Nombre curso </TableHead>
          <TableHead> Nivel </TableHead>
          <TableHead> Alumnos </TableHead>
          <TableHead> Estado </TableHead>
          <TableHead> Fecha </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(c, k) in filtered"
          :key="k"
          class="cursor-pointer"
          @click.prevent="$router.push(`/cursos/${c.id_curso}`)"
        >
          <TableCell>{{ c.nombre_curso }}</TableCell>
          <TableCell>
            {{ c.nivel_curso }}
          </TableCell>
          <TableCell>
            <Badge>0</Badge>
          </TableCell>

          <TableCell>
            <Badge> Activo </Badge>
          </TableCell>
          <TableCell>{{
            formatearTimeStamp(c.created_at).nuevaFecha
          }}</TableCell>
        </TableRow>
      </TableBody>
    </VueDynamicTable>
  </Card>
</template>
