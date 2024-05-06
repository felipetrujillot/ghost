<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()
documentTitle('Admin - Empresas')

definePageMeta({
  layout: 'admin-layout',
})

const { data: companies, pending } =
  await $trpc.companies.getCompanies.useQuery()
</script>
<template>
  <h1 class="text-2xl font-bold">Empresas</h1>

  <VueSkeleton v-if="pending" />
  <Card v-if="!pending && companies">
    <AdminCompaniesTable :companies="companies" />
  </Card>
</template>
