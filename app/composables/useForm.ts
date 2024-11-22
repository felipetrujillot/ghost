import type { ZodType } from 'zod'

type FormSchema = {
  val: string | number
  label: string
  placeholder: string | number
  required: boolean
  type: string
  select?: unknown
  schema: ZodType
  error: boolean
}

/**
 *
 * @param inputForm
 * @returns
 */
export const useForm = <T extends Record<string, FormSchema>>(inputForm: T) => {
  /**
   * Se remueve el schema de zod
   * Ideal para pasar el resto de los datos al Ref
   */
  const removeSchema = <T extends Record<string, FormSchema>>(inputForm: T) => {
    return Object.fromEntries(
      Object.entries(inputForm).map(([key, field]) => [
        key,
        {
          val: field.val,
          placeholder: field.placeholder,
          label: field.label,
          type: field.type,
          required: field.required,
          error: field.error,
          select: field.select,
          //select: field.select,
        },
      ])
    ) as {
      [K in keyof T]: {
        val: T[K]['val']
        placeholder: T[K]['placeholder']
        error: T[K]['error']
        required: T[K]['required']
        label: T[K]['label']
        type: T[K]['type']
        select: T[K]['select']
      }
    }
  }

  type FormFieldWithoutSchema = Omit<FormSchema, 'schema'>

  /**
   * Simplifica el formulario
   * @param inputForm
   */
  const simplifyForm = <T extends Record<string, FormFieldWithoutSchema>>(
    inputForm: T
  ) => {
    return Object.fromEntries(
      Object.entries(inputForm).map(([key, field]) => [key, field.val])
    ) as { [K in keyof T]: T[K]['val'] }
  }

  const removedSchema = removeSchema(inputForm)

  const updateForm = (values: ReturnType<typeof simplifyForm>) => {
    return Object.entries(values).forEach(([key, field]) => {
      form.value[key].val = field
    })
  }

  type ValidateForm = {
    ignore: string[]
  }

  // Separate schemas to reference later
  const schemas = Object.fromEntries(
    Object.entries(inputForm).map(([key, field]) => [key, field.schema])
  ) as { [K in keyof T]: ZodType }

  /**
   *
   */
  const validateForm = (config?: ValidateForm) => {
    let hasError = false

    Object.keys(form.value).forEach((key) => {
      const field = form.value[key]

      if (config && config.ignore.includes(key)) {
        return
      }
      try {
        // Validate the value using the schema
        schemas[key]!.parse(field.val)

        //field.schema.parse(field.value)
        field.error = false // Validation passed
      } catch (error) {
        hasError = true
        field.error = true // Validation failed
      }
    })

    return hasError
  }

  type InputFormKeys = keyof typeof inputForm
  const keysForm: InputFormKeys[] = Object.keys(inputForm) as InputFormKeys[]
  const form = ref(removedSchema)

  return { form, simplifyForm, updateForm, validateForm, keysForm }
}
