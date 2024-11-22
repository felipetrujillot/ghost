<script setup lang="ts">
import 'mathlive/fonts.css'
import 'mathlive/static.css'
import { MathfieldElement } from 'mathlive'

const mathfield = ref<MathfieldElement>() // Reference for the Mathfield container
const mathContent = ref<Element>() // Holds the LaTeX content

onMounted(() => {
  // Create a MathfieldElement instance and attach it to the div
  const mathFieldInstance = new MathfieldElement()
  mathfield.value!.appendChild(mathFieldInstance)
})

const getMathContent = () => {
  // Access the MathfieldElement instance and get the LaTeX content
  const mathFieldInstance = mathfield.value!.querySelector('math-field')
  if (mathFieldInstance) {
    mathContent.value = mathFieldInstance.getValue()
  }
}
</script>

<template>
  <div ref="mathfield" />

  <Button @click.prevent="getMathContent">{{ mathContent }}</Button>
</template>
