<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})

const { data: users, pending } = await $trpc.user.getUsers.useQuery()
</script>
<template>
  <h1 class="text-2xl font-bold">Usuarios</h1>

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
        <TableRow v-for="u in users" :key="u.id_user">
          <TableCell class="w-[100px]">{{ u.id_user }}</TableCell>
          <TableCell class="w-[100px]">{{ u.name }}</TableCell>
          <TableCell class="w-[100px]">{{ u.email }}</TableCell>
          <TableCell class="w-[100px]">
            <Button @click.prevent="$router.push(`/admin/user/${u.id_user}`)"
              >Detalle</Button
            >
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
