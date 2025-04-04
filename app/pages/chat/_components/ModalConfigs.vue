<script setup lang="ts">
const { $trpc } = useNuxtApp()
import type { GetModels } from '~~/server/trpc/routers/models'
import type { GetSystemPrompts } from '~~/server/trpc/routers/system_prompt'

const id_model = ref('')
const id_system_prompt = ref('')

const models = ref<GetModels>([])
const prompts = ref<GetSystemPrompts>()

const emit = defineEmits(['closeModal'])
onMounted(async () => {
  $trpc.models.getModels.query().then((res) => {
    models.value = res
  })

  $trpc.system_prompt.getSystemPrompts.query().then((res) => {
    prompts.value = res
  })

  $trpc.usuarios.getUserConfigs.query().then((res) => {
    if (!res) throw new Error('No se pudo traer la configuración')
    id_model.value = res.id_model.toString()
    id_system_prompt.value = res.id_system_prompt.toString()
  })
})

const foundedPrompt = computed(() => {
  return prompts.value?.find((r) => {
    if (r.id_system_prompt === parseInt(id_system_prompt.value)) return r
  })
})
const updateConfig = async () => {
  const { status, data } = await $trpc.usuarios.updateUserConfigs.mutate({
    id_model: parseInt(id_model.value),
    id_system_prompt: parseInt(id_system_prompt.value),
  })
  toast(status, data)
  emit('closeModal')
}
</script>

<template>
  <VueModal @closeModal="$emit('closeModal')">
    <Card>
      <div class="space-y-1">
        <Label> Modelo </Label>
        <Select v-model="id_model">
          <SelectTrigger class="rounded-none">
            <SelectValue placeholder="Selecciona un modelo" class="" />
          </SelectTrigger>
          <SelectContent class="rounded-none">
            <SelectGroup>
              <SelectItem
                v-for="(c, k) in models"
                :key="k"
                :value="c.id_model.toString()"
              >
                {{ c.llm_model }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-1">
        <Label> System Prompt </Label>

        <Select v-model="id_system_prompt">
          <SelectTrigger class="rounded-none">
            <SelectValue placeholder="Selecciona un prompt" class="" />
          </SelectTrigger>
          <SelectContent class="rounded-none">
            <SelectGroup>
              <SelectItem
                v-for="(c, k) in prompts"
                :key="k"
                :value="c.id_system_prompt.toString()"
              >
                {{ c.nombre }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="border p-4">
        <div
          v-html="foundedPrompt?.system_prompt"
          class="prose prose-sm dark:prose-invert"
        ></div>
      </div>
      <Button class="w-full" @click.prevent="updateConfig">Guardar</Button>
    </Card>
  </VueModal>
</template>
