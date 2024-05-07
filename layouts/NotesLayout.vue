<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()

/**
 *
 */
const { data, pending } = $trpc.notes.getNotes.useQuery()

const route = useRoute()

const newNote = async () => {
  const { status, data } = await $trpc.notes.newNote.query()

  $router.push(`/ai/note/${data}`)
}
</script>

<template>
  <div>
    <AdminNavbar />

    <div
      class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
    >
      <div class="hidden border-r bg-muted/40 md:block">
        <div
          class="flex h-full max-h-screen flex-col gap-2"
          style="width: 280px"
        >
          <div class="flex-1 fixed my-4" style="width: 280px">
            <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
              <template v-if="!pending">
                <template v-for="n in data">
                  <NuxtLink
                    :to="`/ai/note/${n.id_note}`"
                    class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    {{ n.title_note }}
                  </NuxtLink>
                </template>
              </template>
            </nav>
            <div class="mt-4 text-end px-4">
              <Button @click.prevent="newNote">Nuevo</Button>
            </div>
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
    <!--  <div
      class="bg-neutral-50 dark:bg-muted/40"
      style="min-height: calc(100vh - 4.1rem)"
    >
      <div class="container py-6 space-y-4">
        <slot />
      </div>
    </div> -->
  </div>
</template>
