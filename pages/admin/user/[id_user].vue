<script setup lang="ts">
const { $trpc } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})
const route = useRoute()

const id_user = parseInt(route.params.id_user as string)

const { data: user, pending } = await $trpc.user.getUserById.useQuery({
  id_user,
})
</script>
<template>
  <h1 class="text-2xl font-bold">Detalle Usuario</h1>
  <p class="text-muted-foreground">Administra un usuario al detalle</p>
  <VueSkeleton v-if="pending" />
  <Card v-if="!pending">{{ user }} </Card>
</template>
