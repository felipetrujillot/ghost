<script setup lang="ts">
import type { GetCompanies } from '~/server/trpc/routers/companies'
import VueDynamicTable from '../VueDynamicTable.vue'
const { $router } = useNuxtApp()
const props = defineProps<{
  companies: GetCompanies
}>()

/**
 *
 */
const { totalPages, filtered, busqueda, page } = useDynamicTable({
  data: props.companies,
  limit: 6,
  varColumn: ['company_name'],
})
</script>

<template>
  <VueDynamicTable
    v-model:busqueda="busqueda"
    v-model:page="page"
    :totalPages="totalPages"
    :filtered="filtered"
    placeholder="Busca una empresa"
  >
    <TableHeader>
      <TableRow>
        <TableHead class="w-[1px]">#</TableHead>
        <TableHead class="w-[100px]">Empresa</TableHead>
        <TableHead class="w-[100px]">Rut</TableHead>
        <TableHead class="w-[100px]">Contacto</TableHead>
        <TableHead class="w-[100px]">Acciones</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="c in filtered" :key="c.id_company">
        <TableCell class="w-[1px]">{{ c.id_company }}</TableCell>
        <TableCell class="w-[100px]">{{ c.company_name }}</TableCell>
        <TableCell class="w-[100px]">{{ c.company_rut }}</TableCell>
        <TableCell class="w-[100px]">{{ c.company_phone }}</TableCell>
        <TableCell class="w-[100px]">
          <Button
            @click.prevent="$router.push(`/admin/company/${c.id_company}`)"
            >Detalle</Button
          >
        </TableCell>
      </TableRow>
    </TableBody>
  </VueDynamicTable>
</template>
