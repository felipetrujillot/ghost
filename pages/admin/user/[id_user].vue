<script setup lang="ts">
const { $trpc } = useNuxtApp()
definePageMeta({
  layout: 'admin-layout',
})
const route = useRoute()

const pending = ref(true)
const id_user = parseInt(route.params.id_user as string)

const formData = ref({
  id_user: 0,
  name: '',
  lastname: '',
  email: '',
  role: '',
  birthdate: '',
})

/**
 *
 */
const updateUser = async () => {
  console.log('todo')
}

/**
 *
 */
onMounted(async () => {
  pending.value = true
  const getUser = await $trpc.user.getUserById.query({
    id_user,
  })

  formData.value = {
    id_user: getUser.id_user,
    name: getUser.name,
    lastname: getUser.lastname,
    email: getUser.email,
    birthdate: getUser.birthdate,
    role: getUser.role.toString(),
  }

  pending.value = false
})
</script>
<template>
  <h1 class="text-2xl font-bold">Detalle Usuario</h1>
  <p class="text-muted-foreground">Administra un usuario al detalle</p>
  <VueSkeleton v-if="pending" />
  <Card v-if="!pending">
    <h3 class="font-semibold leading-none tracking-tight">Editar Usuario</h3>
    <p class="text-muted-foreground">
      Modifica las configuraciones de un usuario
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="grid gap-2">
        <Label> Nombre </Label>
        <Input
          v-model="formData.name"
          placeholder="Primer Nombre"
          type="text"
        />
      </div>

      <div class="grid gap-2">
        <Label> Apellido </Label>
        <Input
          v-model="formData.lastname"
          placeholder="Primer Apellido"
          type="text"
        />
      </div>

      <div class="grid gap-2">
        <Label> Email </Label>
        <Input
          v-model="formData.email"
          placeholder="hola@gmail.com"
          type="email"
        />
      </div>

      <div class="grid gap-2">
        <Label> Rol </Label>
        <Input placeholder="Ej: Felipe" type="text" />
      </div>

      <div class="grid gap-2">
        <Label> Fecha de Nacimiento </Label>
        <Input placeholder="Ej: Felipe" type="date" />
      </div>
    </div>

    <div class="text-end">
      <Button @click.prevent="updateUser">Guardar</Button>
    </div>

    <!--  {{ user }} -->
  </Card>
</template>
