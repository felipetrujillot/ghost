<script setup lang="ts">
const { $trpc } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})
documentTitle('Admin - Usuarios')

const { data: users, pending } = await $trpc.user.getUsers.useQuery()
</script>
<template>
  <h1 class="text-2xl font-bold">Usuarios</h1>

  <VueSkeleton v-if="pending" />
  <Card v-if="!pending && users">
    <AdminUsersTable :users="users" />
  </Card>
</template>
