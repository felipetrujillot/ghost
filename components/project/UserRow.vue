<script setup lang="ts">
import { LucideEllipsis } from 'lucide-vue-next'
import type { GetUsersByIdProject } from '~/server/trpc/routers/projects'

defineProps<{
  u: GetUsersByIdProject[0]
}>()

const open = ref(false)
</script>

<template>
  <TableRow>
    <TableCell>{{ u.name }} {{ u.lastname }}</TableCell>
    <TableCell>{{ u.email }}</TableCell>
    <TableCell>{{ u.role }}</TableCell>
    <TableCell>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <LucideEllipsis :size="20" class="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent class="w-[180px] p-0">
          <Command>
            <CommandGroup>
              <CommandItem value="Editar"> Editar </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </TableCell>
  </TableRow>
</template>
