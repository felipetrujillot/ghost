<script setup lang="ts">
import type { GetBranchesByIdCompany } from '~/server/trpc/routers/branches'

const { $trpc } = useNuxtApp()
const emit = defineEmits(['closeModal'])

const documentUpload = ref()
const addForm = ref({
  id_company: '',
  id_branch: '',
  act_name: '',
  act_url: '',
})

const validaAddForm = ref({
  id_company: false,
  act_name: false,
  act_url: false,
  id_branch: false,
})
const { data: companies, pending } = $trpc.companies.getCompanies.useQuery()

const branches = ref<GetBranchesByIdCompany>([])

const findCompanyById = async () => {
  addForm.value.id_branch = ''

  if (addForm.value.id_company !== '') {
    branches.value = []
    branches.value = await $trpc.branches.getBranchesByIdCompany.query({
      id_company: parseInt(addForm.value.id_company),
    })
  }
}

/**
 *
 */
const addAct = async () => {
  const validator = validaImagen()

  if (validator.status === 'warning') return toast('warning', validator.data)

  const hasErrorForm = validaForm()
  if (hasErrorForm) {
    return toast('warning', 'Debes completar el formulario')
  }
  //if (validator.status === 'err') return toast(validator.status, validator.data)

  if (validator.status === 'ok') {
    const url_picture = await uploadImage().catch((err) => {
      toast(
        'warning',
        'Hubo un problema al crear el producto, verifica que ningún campo se encuentre en blanco'
      )
      throw err
    })

    addForm.value.act_url = url_picture!

    const { status, data } = await $trpc.acts.newAct
      .mutate({
        act_name: addForm.value.act_name,
        act_url: addForm.value.act_url,
        id_company: parseInt(addForm.value.id_company),
        id_branch: parseInt(addForm.value.id_branch),
      })
      .catch((err) => {
        toast(
          'warning',
          'Hubo un problema al crear el producto, verifica que ningún campo se encuentre en blanco'
        )
        throw err
      })

    if (status === 'ok') {
      toast(status, data)

      emit('closeModal')
    }

    if (status === 'err') {
      return toast(status, data)
    }
  }
}

const validaForm = () => {
  let hasError = false

  validaAddForm.value = {
    act_name: false,
    act_url: false,
    id_company: false,
    id_branch: false,
  }

  if (addForm.value.id_company === '') {
    hasError = true
    validaAddForm.value.id_company = true
  }

  if (addForm.value.id_branch === '') {
    hasError = true
    validaAddForm.value.id_branch = true
  }

  /* if (addForm.value.act_url === '') {
    hasError = true
    validaAddForm.value.act_url = true
  } */

  if (addForm.value.act_name === '') {
    hasError = true
    validaAddForm.value.act_name = true
  }

  return hasError
}
/**
 *
 */
const validaImagen = () => {
  const doc = documentUpload.value.files[0]

  if (!doc) {
    return {
      status: 'warning' as const,
      data: 'No hay documento adjunto',
    }
  }

  const [_oldName, ...formatArray] = doc.name.split(['.'])

  const format = formatArray[formatArray.length - 1]

  return {
    status: 'ok' as const,
    data: 'El formato es válido',
  }
  /* 
  if (format === 'jpeg' || format === 'png' || format === 'jpg') {
    return {
      status: 'ok' as const,
      data: 'El formato es válido',
    }
  }
  return {
    status: 'err' as const,
    data: 'El formato de la imágen no es válido',
  } */
}

/**
 *
 */
const uploadImage = async () => {
  const formData = new FormData()

  formData.append('document', documentUpload.value.files[0])

  const url = `/api/upload`

  const { data: fileUrl } = await useFetch<string>(url, {
    method: 'POST',
    body: formData,
  }).catch((err) => {
    throw err
  })

  return fileUrl.value
}
</script>

<template>
  <VueModal @closeModal="$emit('closeModal')">
    <VueSkeleton v-if="pending" />
    <div v-if="!pending && companies" class="space-y-6">
      <div class="flex justify-between gap-2 items-center">
        <input
          class="flex h-10 w-full rounded-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="file"
          ref="documentUpload"
        />
      </div>

      <div>
        <Input
          :class="validaAddForm.act_name ? 'border-warning' : ''"
          v-model="addForm.act_name"
          placeholder="Título del Acta"
        />
      </div>

      <Select v-model="addForm.id_company" @update:modelValue="findCompanyById">
        <SelectTrigger
          class="rounded-full"
          :class="validaAddForm.id_company ? 'border-warning' : ''"
        >
          <SelectValue placeholder="Selecciona una empresa" />
        </SelectTrigger>
        <SelectContent class="rounded-2xl">
          <SelectGroup>
            <SelectLabel>Empresa</SelectLabel>
            <SelectItem
              v-for="c in companies"
              :key="c.id_company"
              :value="`${c.id_company}`"
            >
              {{ c.company_name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select v-model="addForm.id_branch">
        <SelectTrigger
          class="rounded-full"
          :class="validaAddForm.id_branch ? 'border-warning' : ''"
        >
          <SelectValue placeholder="Selecciona una sucursal" />
        </SelectTrigger>
        <SelectContent class="rounded-2xl">
          <SelectGroup>
            <SelectLabel>Sucursal</SelectLabel>
            <SelectItem
              v-for="b in branches"
              :key="b.id_branch"
              :value="`${b.id_branch}`"
            >
              {{ b.branch_name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div class="text-end">
        <Button variant="success" class="w-36" @click.prevent="addAct"
          >Añadir</Button
        >
      </div>
    </div>
  </VueModal>
</template>
