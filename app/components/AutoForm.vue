<script setup lang="ts">
type FormSchema = {
  val: string | number
  label: string
  placeholder: string
  required: boolean
  type: string
  select: any
  error: boolean
}

type InputForm = {
  [key: string]: FormSchema
}
defineProps<{
  keysForm: string[]
}>()

const form = defineModel<InputForm>()
</script>

<template>
  <template v-if="form" v-for="(i, k) in keysForm" :key="k">
    <FormLabel
      v-if="form[i]"
      :label="form[i].label"
      :required="form[i].required"
      v-model:error="form[i].error"
    >
      <Input
        v-if="form[i].type === 'input'"
        v-model="form[i].val"
        type="text"
        :placeholder="form[i].placeholder"
      />

      <Input
        v-if="form[i].type === 'password'"
        v-model="form[i].val"
        type="password"
        :placeholder="form[i].placeholder"
      />

      <Textarea
        v-if="form[i].type === 'textarea'"
        v-model="form[i].val"
        type="text"
        :placeholder="form[i].placeholder"
      />

      <Select
        v-if="form[i].type === 'select' && typeof form[i].val === 'string'"
        v-model="form[i].val"
      >
        <SelectTrigger class="rounded-full">
          <SelectValue :placeholder="form[i].placeholder" />
        </SelectTrigger>
        <SelectContent class="rounded-2xl">
          <SelectGroup>
            <SelectLabel>{{ form[i].placeholder }}</SelectLabel>
            <SelectItem
              v-for="e,k in form[i].select!"
              :key="k"
              :value="e.val"
              >{{ e.text }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>

      <NumberField
        v-if="form[i].type === 'number' && typeof form[i].val === 'number'"
        v-model="form[i].val"
        :default-value="0"
      >
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </FormLabel>
  </template>
</template>
