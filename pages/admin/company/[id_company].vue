<script setup lang="ts">
const { $trpc } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})
const route = useRoute()

const id_company = parseInt(route.params.id_company as string)

const { data: company, pending } =
  await $trpc.companies.getCompanyById.useQuery({
    id_company,
  })
</script>
<template>
  <h1 class="text-2xl font-bold">Detalle Empresa</h1>
  <p class="text-muted-foreground">Administra una empresa al detalle</p>
  <VueSkeleton v-if="pending" />
  <Card v-if="!pending">{{ company }} </Card>
</template>
