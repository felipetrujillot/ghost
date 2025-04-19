import { v4 as uuid } from 'uuid'

/**
 *
 * @param numero
 */
export const clpFormat = (numero: number) => {
  // Configuración para formato de moneda chilena
  const formatoPesosChilenos = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0, // Puedes ajustar esto según tus necesidades
  })
  // Formatear el número a pesos chilenos
  return formatoPesosChilenos.format(numero)
}
/**
 * deja float con 2 decimales
 * @param
 * @return
 */

export const floatTwoDecimals = (inputText: string) => {
  const match = inputText.match(/^(0?[1-9]\d*|0)(\.\d{0,2})?/)
  if (match) {
    return match[0]
  }
  return ''
}

/**
 *
 * @param timeStampRecibido
 * @returns
 */
export const formatearTimeStamp = (timeStampRecibido: string) => {
  //Formateamos Fecha
  const fecha = timeStampRecibido.substring(0, 10)
  const diaFecha = fecha.substring(8, 10)
  const mesFecha = fecha.substring(5, 7)
  const anioFecha = fecha.substring(0, 4)
  //Formateamos Hora

  return {
    nuevaFecha: diaFecha + '-' + mesFecha + '-' + anioFecha,
    nuevaHora: timeStampRecibido.substring(11, 16),
  }
}

/**
 *
 * @param day
 * @param month
 * @param year
 * @returns
 */
export const setDefaultDate = (day: number, month: number, year: number) => {
  const date = new Date(year, month - 1, day, 0, 0, 0, 0)
  return date
}

export const getStringDate = () => {
  const date = new Date()

  const formattedDate = date.toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const [day, month, year] = formattedDate.split('-')

  return [day, month, year]
}
/**
 *
 * @returns
 */
export const getCurrentDate = () => {
  const date = new Date()

  const formattedDate = date.toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const [day, month, year] = formattedDate.split('-')

  const newDat = new Date(
    parseInt(year!),
    parseInt(month!) - 1,
    parseInt(day!),
    0,
    0,
    0,
    0,
  )

  return newDat
}

export const formatearDate = (date: Date) => {
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Months are zero-based
  const year = date.getUTCFullYear()

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')

  return {
    nuevaFecha: `${day}-${month}-${year}`,
    nuevaHora: `${hours}:${minutes}`,
  }
}

/**
 * Simplifica el uso de modales para llamar de un lugar centralizado
 * @param status
 * @param msg
 */
export const toast = async (
  status: 'success' | 'ok' | 'warning' | 'wrn' | 'error' | 'err',
  msg: string,
) => {
  const { useToast } = await import('@/components/ui/toast/use-toast')
  const { toast } = useToast()
  if (status === 'err' || status === 'error') {
    return toast({
      description: msg,
      variant: 'destructive',
    })
  }

  if (status === 'warning' || status === 'wrn') {
    return toast({
      description: msg,
      variant: 'warning',
    })
  }

  return toast({
    description: msg,
  })
}

export const generateRandom13Digits = () => {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random()

  // Convert the decimal to a 13-digit integer
  const random13Digits = Math.floor(randomDecimal * 1000000000000)

  return random13Digits
}

/**
 *
 * @returns
 */
export const generateRandom5Digits = () => {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  const randomDecimal = Math.random()

  // Convert the decimal to a 13-digit integer
  const random13Digits = Math.floor(randomDecimal * 10000)

  return random13Digits
}

export const generateRandomHex = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)

  // Ensure the color has six digits (add leading zeros if needed)
  return '#' + '0'.repeat(6 - randomColor.length) + randomColor
}

/**
 * regex que valida si el input es email
 * @param email
 * @return boolean
 */
export const isEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  if (!emailRegex.test(email)) {
    return false
  } else {
    return true
  }
}

/**
 *
 * @param inputValue
 * @returns
 */
export const stringFormat = (inputValue: string) => {
  if (inputValue.length > 0) return inputValue
  return '-'
}

export const isAuthenticated = async () => {
  const { $trpc } = useNuxtApp()
  const token = useCookie('token')
  const nombre = useCookie('nombre')

  if (!token.value || !nombre.value) {
    return false
  }

  try {
    const res = await $trpc.usuarios.validaToken.query({ token: token.value! })

    if ('id_empresa' in res && 'id_usuario' in res) {
      return res
    }
    return false
  } catch (error) {
    token.value = null
    nombre.value = null
    return false
  }
  return false
}

/**
 *
 * @param emit
 */
type KeyboardShortcutKey =
  | 'Shift'
  | 'Alt'
  | 'Meta'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'Enter'
  | 'Escape'
  | 'Tab'
  | 'Space'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

export const useCtrlKey = (
  keysSelected: KeyboardShortcutKey,
  emit: Function,
) => {
  const ctrlEvent = (e: KeyboardEvent) => {
    const { ctrlKey, key } = e

    if (ctrlKey && key === keysSelected) {
      emit()
    }
  }

  /**
   */
  onMounted(() => {
    document.addEventListener('keydown', ctrlEvent)
  })

  /**
   */
  onUnmounted(() => {
    document.removeEventListener('keydown', ctrlEvent)
  })
}

export const useMetaKey = (
  keysSelected: KeyboardShortcutKey,
  emit: Function,
) => {
  const ctrlEvent = (e: KeyboardEvent) => {
    const { key, metaKey } = e

    if (metaKey && key === keysSelected) {
      e.preventDefault()
      emit()
    }
  }

  /**
   */
  onMounted(() => {
    document.addEventListener('keydown', ctrlEvent)
  })

  /**
   */
  onUnmounted(() => {
    document.removeEventListener('keydown', ctrlEvent)
  })
}
/**
 *
 * @param emit
 */
export const useEnterKey = (emit: Function) => {
  const enterEvent = (e: KeyboardEvent) => {
    const { key } = e

    if (key === 'Enter') {
      emit()
    }
  }

  /**
   */
  onMounted(() => {
    document.addEventListener('keydown', enterEvent)
  })

  /**
   */
  onUnmounted(() => {
    document.removeEventListener('keydown', enterEvent)
  })
}

/**
 *
 * @param inputString
 * @returns
 */
export const extractNumbersAndConvertToInt = (inputString: string) => {
  // Use a regular expression to remove non-digit characters
  const digitsOnly = inputString.replace(/\D/g, '')

  // Convert the resulting string of digits to an integer
  const result = parseInt(digitsOnly)

  return result
}

/**
 *
 * @param stageNumber
 * @returns
 */
export const formatCompanyStage = (stageNumber: number) => {
  if (stageNumber === 0) return 'Sin Etapa'
  if (stageNumber === 1) return '1. Formación del comité de aplicación'
  if (stageNumber === 2) return '2. Difusión, Sensibilización y temores'
  if (stageNumber === 3) return '3. Aplicación del cuestionario'
  if (stageNumber === 4)
    return '4. Presentación de resultados, discusión y análisis. Diseño de medidas'
  if (stageNumber === 5) return '5. Inicio de ejecución de medidas'
  if (stageNumber === 6) return '6. Monitoreo y verificación de medidas'
  if (stageNumber === 7) return '7. Inicio de proceso de reevaluación '
  return 'Sin Etapa'
}

/**
 *
 * @returns
 */
export const logoutToIndex = () => {
  const token = useCookie('token')
  const name = useCookie('name')
  const role_name = useCookie('role_name')

  token.value = null
  name.value = null
  role_name.value = null

  return window.location.replace('/')
}

/**
 * @param stageNumber
 * @returns
 */
export const stageImage = (stageNumber: number) => {
  if (stageNumber === 0) return '/img/etapa_1.jpeg'
  if (stageNumber === 1) return '/img/etapa_1.jpeg'
  if (stageNumber === 2) return '/img/etapa_2.jpeg'
  if (stageNumber === 3) return '/img/etapa_3.jpeg'
  if (stageNumber === 4) return '/img/etapa_4.jpeg'
  if (stageNumber === 5) return '/img/etapa_5.jpeg'
  if (stageNumber === 6) return '/img/etapa_6.jpeg'
  if (stageNumber === 7) return '/img/etapa_7.jpeg'
  return '/img/etapa_1.jpeg'
}

/**
 *
 * @param role
 * @returns
 */
export const roleFormatter = (role: number) => {
  if (role === 0) return 'Worklite Admin'
  if (role === 1) return 'RRHH'
  if (role === 2) return 'Colaborador'
  return 'Sin rol'
}

/**
 *
 * @param title
 */
export const documentTitle = (title: string) => {
  const res = useNuxtApp()
  const projectName = res.$config.public.projectName

  useHead({
    title: `${title} - ${projectName}`,
    meta: [{ name: 'description', content: projectName }],
  })
}

/**
 * Sube archivo
 * Retorna url de gcp
 * PÚBLICO
 * @param file
 * @returns
 */
export const uploadFileGcp = async (file: File) => {
  const formData = new FormData()
  formData.append('document', file, file.name)

  const url = `/api/upload`

  /**
   */

  const res = await $fetch(url, {
    method: 'POST',
    body: formData,
  })

  return res
}

export type ChunkDetector = (buffer: string) => string | undefined | null

const InvalidArgumentError = (val: any) => {
  return val
}

const CHUNKING_REGEXPS = {
  word: /\S+\s+/m,
  line: /\n+/m,
}

// src/delay.ts
async function delay(delayInMs: number) {
  return delayInMs == null
    ? Promise.resolve()
    : new Promise((resolve2) => setTimeout(resolve2, delayInMs))
}

/**
 *
 * @param fileName
 * @returns
 */
export const extractFileInfo = (fileName: string) => {
  // Get the format (extension)
  const format = fileName.split('.').pop()

  // Get the name without the format
  const name = fileName.substring(0, fileName.lastIndexOf('.'))

  return { name, format: format! }
}

export const newUuid = () => {
  const newId = uuid()

  return newId
}

/**
 *
 * @param seconds
 */
export const timeSleep = async (seconds: number) => {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
