<script setup lang="ts">
import type { GetUsers } from '~/server/trpc/routers/users'
import VueDynamicTable from '../VueDynamicTable.vue'
const { $router } = useNuxtApp()
const props = defineProps<{
  users: GetUsers
}>()

/**
 *
 */
const { totalPages, filtered, busqueda, page } = useDynamicTable({
  data: props.users,
  limit: 6,
  varColumn: ['company_name', 'name', 'email'],
})
</script>

<template>
  <VueDynamicTable
    v-model:busqueda="busqueda"
    v-model:page="page"
    :totalPages="totalPages"
    :filtered="filtered"
    placeholder="Busca un usuario"
  >
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">#</TableHead>
        <TableHead class="w-[100px]">Nombre</TableHead>
        <TableHead class="w-[100px]">Empresa</TableHead>
        <TableHead class="w-[100px]">Email</TableHead>
        <TableHead class="w-[100px]">Acciones</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="u in filtered" :key="u.id_user">
        <TableCell class="w-[100px]">{{ u.id_user }}</TableCell>
        <TableCell class="w-[100px]">{{ u.name }}</TableCell>
        <TableCell class="w-[100px]">{{ u.company_name }}</TableCell>
        <TableCell class="w-[100px]">{{ u.email }}</TableCell>
        <TableCell class="w-[100px]">
          <Button @click.prevent="$router.push(`/admin/user/${u.id_user}`)"
            >Detalle</Button
          >
        </TableCell>
      </TableRow>
    </TableBody>
  </VueDynamicTable>
</template>
