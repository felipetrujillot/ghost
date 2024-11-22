<script setup lang="ts">
import type { GetProfesores } from '~~/server/trpc/routers/profes'

const props = defineProps<{
  profes: GetProfesores
}>()

const profes = ref(props.profes)
const { totalPages, filtered, busqueda, page } = useDynamicTableRef({
  data: profes,
  limit: 6,
  varColumn: [
    'nombre',
    'nombre_segundo',
    'apellido_paterno',
    'apellido_materno',
    'rut',
  ],
})
/* 
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
 */
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
      placeholder="Busca un profesor"
    >
      <!--  <template #header>
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
      </template> -->
      <TableHeader>
        <TableRow>
          <TableHead> Nombre </TableHead>
          <TableHead> Apellidos </TableHead>
          <TableHead> Rut </TableHead>
          <TableHead> Estado </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="(c, k) in filtered"
          :key="k"
          class="cursor-pointer"
          @click.prevent="$router.push(`/profesores/${c.id_profesor}`)"
        >
          <TableCell>{{ c.nombre }}</TableCell>
          <TableCell>
            {{ c.apellido_paterno }} {{ c.apellido_materno }}
          </TableCell>
          <TableCell>
            {{ c.rut }}
          </TableCell>

          <TableCell>
            <Badge> Activo </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </VueDynamicTable>
  </Card>
</template>
