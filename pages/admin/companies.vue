<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})

const { data: companies, pending } =
  await $trpc.companies.getCompanies.useQuery()
</script>
<template>
  <h1 class="text-2xl font-bold">Empresas</h1>

  <VueSkeleton v-if="pending" />
  <Card v-if="!pending">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">#</TableHead>
          <TableHead class="w-[100px]">Nombre</TableHead>
          <TableHead class="w-[100px]">email</TableHead>
          <TableHead class="w-[100px]">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="c in companies" :key="c.id_company">
          <TableCell class="w-[100px]">{{ c.id_company }}</TableCell>
          <TableCell class="w-[100px]">{{ c.company_name }}</TableCell>
          <TableCell class="w-[100px]">{{ c.company_rut }}</TableCell>
          <TableCell class="w-[100px]">
            <Button
              @click.prevent="$router.push(`/admin/company/${c.id_company}`)"
              >Detalle</Button
            >
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
