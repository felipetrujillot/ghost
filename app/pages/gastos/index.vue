<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date'
import { FocusScope } from 'reka-ui'
documentTitle('gastos')

definePageMeta({
  layout: 'user-layout',
  middleware: 'checkauth',
})

const { $trpc } = useNuxtApp()
const [day, month, year] = getStringDate()

const { data: gastos, status, refresh } = $trpc.gastos.getGastos.useQuery()
/**
 *
 */
const formGasto = ref<{
  cantidad: number
  categoria: string
  comentario: string
  fecha: DateValue
}>({
  cantidad: 0,
  categoria: '',
  comentario: '',
  fecha: new CalendarDate(parseInt(year!), parseInt(month!), parseInt(day!)),
})

/**
 *
 *
 */
const categorias = [
  'Comida',
  'Cuentas',
  'Deudas',
  'Transporte',
  'Personales',
  'Salud',
]

const resetForm = () => {
  formGasto.value = {
    cantidad: 0,
    categoria: '',
    comentario: '',
    fecha: new CalendarDate(parseInt(year!), parseInt(month!), parseInt(day!)),
  }
}

const addGasto = async () => {
  const { cantidad, categoria, comentario, fecha } = formGasto.value

  const fechaString = fecha.toString().split('-')

  const formatedDate = `${fechaString[2]}-${fechaString[1]}-${fechaString[0]}`

  await $trpc.gastos.addGasto.mutate({
    cantidad,
    categoria,
    comentario,
    fecha: formatedDate,
  })

  refresh()
  resetForm()

  toast('ok', 'Se agregó el gasto')
}
</script>
<template>
  <div class="relative flex-1 w-full min-h-full justify-between">
    <div class="h-screen flex flex-col h-full">
      <div class="flex-[5] overflow-y-scroll">
        <div class="max-w-3xl mx-auto min-h-full">
          <div class="h-screen flex flex-col h-full">
            <div class="px-4 h-14 py-4 border-b border-x">
              <div class="flex h-full items-center">
                <h1 class="text-lg">Pendientes</h1>
              </div>
            </div>

            <div class="space-y-4 py-4 px-4 border-x">
              <div class="space-y-1">
                <NumberField
                  v-model="formGasto.cantidad"
                  id="monto"
                  :default-value="18"
                  :min="0"
                  locale="es-CL"
                  :format-options="{
                    minimumFractionDigits: 0,
                  }"
                >
                  <Label for="monto">Monto</Label>
                  <NumberFieldContent>
                    <FocusScope>
                      <NumberFieldInput class="text-start px-4" />
                    </FocusScope>
                  </NumberFieldContent>
                </NumberField>
              </div>

              <div class="space-y-1">
                <Label> Categoría </Label>

                <Select v-model="formGasto.categoria">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorías</SelectLabel>
                      <SelectItem v-for="c in categorias" :value="c">
                        {{ c }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-1">
                <Label> Fecha </Label>
                <div>
                  <DatePicker v-model="formGasto.fecha" />
                </div>
              </div>

              <div class="space-y-1">
                <Label> Comentario </Label>

                <Input
                  placeholder="Añade un comentario"
                  v-model="formGasto.comentario"
                />
              </div>

              <div class="text-end">
                <Button @click.prevent="addGasto">Agregar gasto</Button>
              </div>
            </div>

            <div class="px-4 h-14 border-t border-b py-4 border-x">
              <div class="flex h-full items-center">
                <h1 class="text-lg">Historial</h1>
              </div>
            </div>
            <VueSkeleton v-if="status === 'pending'" />
            <template v-if="status === 'success'">
              <div class="border-x px-4 pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="text-white"> Monto </TableHead>
                      <TableHead class="text-white"> Categoría </TableHead>
                      <TableHead class="text-white"> Fecha </TableHead>
                      <TableHead class="text-white"> Comentario </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="g in gastos" :key="g.id_gasto">
                      <TableCell>
                        {{ clpFormat(g.cantidad) }}
                      </TableCell>

                      <TableCell>
                        {{ g.categoria }}
                      </TableCell>

                      <TableCell>
                        {{ g.fecha }}
                      </TableCell>
                      <TableCell>
                        {{ g.comentario }}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
