<script setup lang="ts">
const exportResponse = ref('')
const isLoading = ref(false)
const inputQuestion = ref('hola')

definePageMeta({
  layout: 'admin-layout',
})

/**
 *
 */
const newQuestion = async () => {
  fetch('http://127.0.0.1:8000/stream')
    .then((response) => {
      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let partialData = ''

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          console.log('Stream complete')
          return
        }

        partialData += decoder.decode(value, { stream: true })

        const lines = partialData.split('\n')

        // Process each line of JSON
        lines.forEach((line) => {
          if (line.trim() !== '') {
            const jsonData = JSON.parse(line)
            console.log(jsonData)
            // Do something with jsonData
          }
        })

        partialData = lines.pop() // Store the incomplete line for next iteration

        return reader.read().then(processText)
      })
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}
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
      @keyup.enter="newQuestion()"
      placeholder="Envía un mensaje"
    />
    <Button @click="newQuestion()"> Enviar </Button>
  </div>
</template>
