<script setup lang="ts">
const { $trpc, $router } = useNuxtApp()

/**
 *
 */
const { data, pending } = $trpc.notes.getNotes.useQuery()
const route = useRoute()

/**
 *
 */
const newNote = async () => {
  return
  const { status, data } = await $trpc.notes.newNote.mutate({
    note_text: '',
    note_name: 'Nueva Nota',
  })

  $router.push(`/ai/note/${data}`)
}
</script>

<template>
  <div>
    <AdminNavbar />

    <div class="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div class="hidden lg:block">
        <div class="flex flex-col gap-2" style="width: 280px">
          <div
            class="fixed flex flex-col justify-between border-r py-4 bg-muted/40 h-full"
            style="width: 280px"
          >
            <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
              <template v-if="!pending">
                <Accordion
                  type="single"
                  class="w-full"
                  collapsible
                  v-for="item in data"
                  :key="item.id_group_note.toString()"
                  :default-value="item.id_group_note.toString()"
                >
                  <AccordionItem
                    :value="item.id_group_note.toString()"
                    class="border-none"
                  >
                    <AccordionTrigger>{{ item.group_name }}</AccordionTrigger>
                    <AccordionContent
                      v-for="n in item.notes"
                      class="space-y-1 gap-2"
                    >
                      <NuxtLink
                        :to="`/ai/note/${n.id_note}`"
                        :class="
                          route.path === `/ai/note/${n.id_note}`
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        "
                        class="flex items-center gap-3 rounded-lg px-3 transition-all hover:text-primary"
                      >
                        {{ n.note_name }}
                      </NuxtLink>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </template>

              <!-- <template v-if="!pending">
                <template v-for="n in data">
                  <NuxtLink
                    :to="`/ai/note/${n.id_note}`"
                    :class="
                      route.path === `/ai/note/${n.id_note}`
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    "
                    class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
                  >
                    {{ n.note_name }}
                  </NuxtLink>
                </template>
              </template> -->
            </nav>
            <div class="mb-20 text-end px-4">
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
  </div>
</template>
