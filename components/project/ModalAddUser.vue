<script setup lang="ts">
const { $trpc } = useNuxtApp()
const emit = defineEmits(['closeModal'])

const props = defineProps<{
  id_project: number
}>()

const { data, pending } = $trpc.user.getUsers.useQuery()

const selectedUser = ref()

const addUser = async () => {
  /**
   *
   */
  const { status, data } = await $trpc.projects.addUserProject.mutate({
    id_project: props.id_project,
    id_user: parseInt(selectedUser.value),
  })

  toast(status, data)
  if (status === 'ok') return emit('closeModal')
}
</script>

<template>
  <VueModal @closeModal="$emit('closeModal')" title="Añadir Colaborador">
    <Card>
      <div>
        <Label>Nombre de Colaborador</Label>
        <Select v-model="selectedUser">
          <SelectTrigger class="rounded-full">
            <SelectValue placeholder="Selecciona un Usuario" class="" />
          </SelectTrigger>
          <SelectContent class="rounded-2xl">
            <SelectGroup>
              <SelectLabel>Usuarios</SelectLabel>
              <SelectItem
                v-for="c in data"
                :key="c.id_user"
                :value="`${c.id_user}`"
              >
                {{ c.name }} {{ c.lastname }} - {{ c.email }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Card>

    <div class="text-end">
      <Button @click.prevent="addUser">Añadir</Button>
    </div>
  </VueModal>
</template>
