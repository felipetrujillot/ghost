import { Part } from '@google/genai'
import { generateContent } from '../db/ai'

export default defineEventHandler(async (event) => {
  const contents: {
    role: string
    parts: Part[]
  }[] = [
    {
      role: 'user',
      parts: [
        {
          text: 'de qué se trata el sistema',
        },
      ],
    },
  ]

  const streamingResult = await generateContent({
    system_prompt: `You are an expert on summarize the user input in maximun 4 words
            IMPORTANT: Give the answer in Spanish.
            IMPORTANT: Only use words and not special characters.
                `,
    llm_model: 'gemini-2.0-flash',
    contents: contents,
  }).catch((err) => {
    console.error(err)
    throw err
  })

  let fullResponse = ''
  for await (const item of streamingResult) {
    if (item.text) {
      const textChunk = item.text
      fullResponse += textChunk
    }
  }
  return fullResponse
})
