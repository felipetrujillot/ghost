<script setup lang="ts">
const exportResponse = ref('')
const isLoading = ref(false)
const inputQuestion = ref('')

definePageMeta({
  layout: 'admin-layout',
})
/**
 *
 */
const createQuestion = async () => {
  isLoading.value = true
  exportResponse.value = ''
  const response = await fetch('http://localhost:1234/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: `### Instruction: ${inputQuestion.value}. Responde en Español.\n###Response: `,
        },
      ],
      stop: ['### Instruction:'],
      temperature: 0.7,
      max_tokens: -1,
      stream: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`)
  }

  const reader = response.body!.getReader()

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      throw 'err'
    }

    const ui = new Uint8Array(value)
    const inputString = new TextDecoder('utf-8').decode(ui)

    try {
      const startIndex = inputString.indexOf('{')

      // Find the index of the last "}" character
      const endIndex = inputString.lastIndexOf('}')

      // Extract the JSON string
      const jsonString = inputString.slice(startIndex, endIndex + 1)

      // Parse the JSON string into an object
      const jsonObject = JSON.parse(jsonString)

      const respuesta = jsonObject.choices[0].delta.content

      if (respuesta) {
        console.log(respuesta)
        exportResponse.value = exportResponse.value + respuesta
      }
    } catch (error) {
      //throw error
      console.log(error)
    }
  }
  inputQuestion.value = ''
  isLoading.value = false
}
</script>
<template>
  <Card>
    <p class="text-white">
      {{ exportResponse }}
    </p>
  </Card>
  <div class="input-group mb-3 mt-5">
    <Input
      type="text"
      v-model="inputQuestion"
      :disabled="isLoading"
      @keyup.enter="createQuestion()"
      placeholder="Envía un mensaje"
    />
    <Button @click="createQuestion()"> Enviar </Button>
  </div>
</template>
