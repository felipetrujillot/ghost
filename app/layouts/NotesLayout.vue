<script setup lang="ts">
import { ChevronDown, Ellipsis } from 'lucide-vue-next'

const { $trpc, $router } = useNuxtApp()

/**
 *
 */
const { data, status, refresh: refreshNotes } = $trpc.notes.getNotes.useQuery()
const route = useRoute()

const open = ref(false)
</script>

<template>
  <div class="bg-muted/40 min-h-screen">
    <AdminNavbar />

    <div class="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div class="hidden lg:block">
        <div class="flex flex-col gap-2" style="width: 280px">
          <div
            class="fixed flex flex-col justify-between border-r py-4 bg-muted/40 h-full"
            style="width: 280px"
          >
            <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
              <template v-if="status === 'success' && data">
                <template v-for="item in data" :key="item.id_group_note">
                  <NotesGroupMenu :item="item" @refreshNotes="refreshNotes" />
                </template>
              </template>
            </nav>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div class="space-y-4">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
