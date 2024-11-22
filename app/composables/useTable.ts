import { ref } from 'vue'

type KeyofT<T> = keyof T

type UseDynamicTableRef<T> = {
  data: Ref<T[]>
  varColumn: KeyofT<T>[]
  limit?: number
}
/**
 *
 * @param data
 */
export const useDynamicTableRef = <T>({
  data,
  varColumn,
  limit,
}: UseDynamicTableRef<T>) => {
  const busqueda = ref('')

  const page = ref(1)
  const totalPages = ref(0)
  let itemsPerPage = 6
  if (limit) {
    itemsPerPage = limit
  }

  /**
   * Método de búsqueda dinámico, la primera vez retorna todos los valores
   * Arreglado para ser typesafe
   * @requires paramBusqueda
   */
  const buscarParametros = <T>(data: T[], inputBusqueda: string) => {
    // eslint-disable-next-line
    const res = data.filter((item: any) => {
      for (let i = 0; i < varColumn.length; i++) {
        let param = item[varColumn[i]]

        if (param == null) param = ''
        if (typeof param === 'number') param.toString()

        if (
          typeof param === 'string' &&
          param.toUpperCase().includes(inputBusqueda.toUpperCase())
        ) {
          return item
        }
        if (param == busqueda.value) {
          return item
        }
      }
    })

    return res
  }

  const calcPagination = (qty: number) => {
    totalPages.value = Math.ceil(qty / itemsPerPage)

    const startIndex = (page.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return {
      startIndex,
      endIndex,
    }
  }

  const filtered = computed(() => {
    const res = buscarParametros(data.value, busqueda.value)
    if (res.length < itemsPerPage) page.value = 1
    const { startIndex, endIndex } = calcPagination(res.length)

    if (res.length > 0) {
      return res.slice(startIndex, endIndex)
    }
    page.value = 1
    return []
  })

  return { filtered, busqueda, page, totalPages }
}

type UseDynamicTable<T> = {
  data: T[]
  varColumn: KeyofT<T>[]
  limit?: number
}
/**
 *
 * @param data
 */
export const useDynamicTable = <T>({
  data,
  varColumn,
  limit,
}: UseDynamicTable<T>) => {
  const busqueda = ref('')

  const page = ref(1)
  const totalPages = ref(0)
  let itemsPerPage = 6
  if (limit) {
    itemsPerPage = limit
  }

  /**
   * Método de búsqueda dinámico, la primera vez retorna todos los valores
   * Arreglado para ser typesafe
   * @requires paramBusqueda
   */
  const buscarParametros = <T>(data: T[], inputBusqueda: string) => {
    // eslint-disable-next-line
    const res = data.filter((item: any) => {
      for (let i = 0; i < varColumn.length; i++) {
        let param = item[varColumn[i]]

        if (param == null) param = ''
        if (typeof param === 'number') param.toString()

        if (
          typeof param === 'string' &&
          param.toUpperCase().includes(inputBusqueda.toUpperCase())
        ) {
          return item
        }
        if (param == busqueda.value) {
          return item
        }
      }
    })

    return res
  }

  const calcPagination = (qty: number) => {
    totalPages.value = Math.ceil(qty / itemsPerPage)

    const startIndex = (page.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return {
      startIndex,
      endIndex,
    }
  }

  const filtered = computed(() => {
    const res = buscarParametros(data, busqueda.value)
    if (res.length < itemsPerPage) page.value = 1
    const { startIndex, endIndex } = calcPagination(res.length)

    if (res.length > 0) {
      return res.slice(startIndex, endIndex)
    }
    page.value = 1
    return []
  })

  return { filtered, busqueda, page, totalPages }
}
