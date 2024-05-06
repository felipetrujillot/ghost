<script setup lang="ts">
const { $trpc } = useNuxtApp()
documentTitle('Admin - Usuarios')
definePageMeta({
  layout: 'admin-layout',
})

const { data: users, pending } = await $trpc.user.getUsers.useQuery()
</script>
<template>
  <h1 class="text-2xl font-bold">Usuarios</h1>

  <VueSkeleton v-if="pending" />
  <Card v-if="!pending && users">
    <AdminUsersTable :users="users" />
  </Card>
</template>
