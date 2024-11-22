/**
 * Conecta directamente con el DOM para hacer visible una modal
 * esconde el scrollbar
 * @param id_content
 */
export const showModal = (id_content: string) => {
  const modal = document.getElementById(id_content)
  modal?.classList.add('show')
  modal?.classList.add('d-block')
  //const body = document.querySelector('body')
  //if (body != null) body.style.overflowY = 'hidden'
}

/**
 * Vuelve a mostrar el scrollbar
 */
export const closeModal = () => {
  const body = document.querySelector('body')
  if (body != null) body.style.overflowY = 'auto'
}
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
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    0,
    0,
    0,
    0
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
  msg: string
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

  return
  /* const { useToast } = await import('@/components/ui/toast/use-toast')
      const { toast } = useToast()
    
      toast({
        description: msg,
        variant: 'default',
      })
    
      return
      */
  /* const Toastify = await import('toastify-js')
  if (status == 'success' || status == 'ok')
    Toastify.default({
      text: msg,
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#3AC0A0',
      },
    }).showToast()

  if (status == 'warning' || status == 'wrn')
    Toastify.default({
      text: msg,
      duration: 6000,
      newWindow: true,
      close: true,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#FFB37C',
      },
    }).showToast()

  if (status == 'error' || status == 'err')
    Toastify.default({
      text: msg,
      duration: 6000,
      newWindow: true,
      close: true,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#FF616D',
      },
    }).showToast() */
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
 * Manipulador de strings, util para validator
 * recibe string y puede retornar number
 */
export class StringManipulator {
  private inputString: string

  constructor(inputString: string) {
    this.inputString = inputString
  }

  public appendString(newString: string): StringManipulator {
    this.inputString += newString
    return this
  }

  public restrictToMaxCharacters(maxCharacters: number): StringManipulator {
    if (this.inputString.length > maxCharacters) {
      this.inputString = this.inputString.substring(0, maxCharacters)
    }
    return this
  }

  public extractNumbers(): StringManipulator {
    this.inputString = this.inputString.replace(/[^0-9]/g, '')
    return this
  }

  public getString(): string {
    return this.inputString
  }

  public getNumber(): number {
    return parseInt(this.inputString)
  }
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

  if (!token.value) return false
  const res = await $trpc.usuarios.validaToken.query({ token: token.value! })

  if ('id_company' in res && 'id_user' in res && 'role' in res) {
    return res.role
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
  emit: Function
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
  emit: Function
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
 *
 */
export const newQuestionPython = async (newQuestion: string) => {
  const data = new URLSearchParams()
  data.append('user_prompt', newQuestion)

  const response = await fetch('http://127.0.0.1:5110/api/prompt_route', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  })

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`)
  }

  const r = await response.json()

  return r.Answer
}

/**
 *
 * @param inputQuestion
 * @returns
 */
export const newQuestion = async (inputQuestion: string) => {
  const response = await fetch('http://localhost:1234/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'assistant',
          content: `### Instruction: 
          Eres una asistente útil llamada Diana, tu función es ser un planificador experto de proyectos en la categoría designada. Tu función será ser extremadamente riguroso y ser capaz de adelantarse a posibles problemas. Proporciona una respuesta detallada a la pregunta. Tus respuestas deben ser siempre directamente a la pregunta realizada. Responde siempre en el idioma español. ${inputQuestion}\n###Response: `,
        },
      ],
      stop: ['### Instruction:'],
      //prePrompt: `
      //Eres una asistente útil llamada dayana, utilizarás el contexto proporcionado para responder las preguntas del usuario.
      //todas tus respuestas seran en español, Lee el contexto proporcionado antes de responder preguntas y piensa paso a paso. Si no puedes responder una pregunta del usuario
      //basándote en el contexto proporcionado, informa al usuario.
      //No utilices ninguna otra información para responder al usuario. Proporciona una respuesta detallada a la pregunta. Responde siempre en el idioma español.`,
      temperature: 0.7,
      max_tokens: -1,
      stream: false,
    }),
  })
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`)
  }

  const data = await response.json()

  return data.choices[0].message.content
}
