import { generateImage } from '../db/ai'

export default defineEventHandler(async (event) => {
  const streamingResult = await generateImage({
    system_prompt: `You are an expert on generate images, ONLY GENERATE IMAGES`,
    llm_model: 'gemini-2.0-flash-exp',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Create an image of an anime cat`,
          },
        ],
      },
    ],
  }).catch((err) => {
    console.error(err)
    throw err
  })

  return streamingResult
})
