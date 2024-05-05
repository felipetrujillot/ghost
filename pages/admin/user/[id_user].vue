<script setup lang="ts">
import TableBody from '~/components/ui/table/TableBody.vue'

definePageMeta({
  layout: 'admin-layout',
})
</script>
<template>
  <h1 class="text-2xl font-bold">Detalle Usuario</h1>
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">#</TableHead>
          <TableHead class="w-[100px]">Nombre</TableHead>
          <TableHead class="w-[100px]">Apellido</TableHead>
          <TableHead class="w-[100px]">email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
