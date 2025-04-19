import { GoogleGenAI } from '@google/genai'
import { HarmCategory } from '@google/genai'
import { HarmBlockThreshold } from '@google/genai'
import type { ContentListUnion } from '@google/genai'
import type { Part } from '@google/genai'
import { gcpBucket } from './gcp'
import { newUuid } from '~/composables/helper'

// Initialize Vertex with your Cloud project and location
const ai = new GoogleGenAI({
  vertexai: true,
  project: 'linebox-412716',
  location: 'us-central1',
  googleAuthOptions: {
    keyFilename: 'server/db/linebox-412716-fe1f0c92ff90.json',
  },
})

/**
 *
 * @param param0
 * @returns
 */
export async function generateContent({
  system_prompt,
  llm_model,
  contents,
}: {
  system_prompt: string
  llm_model: string
  contents: {
    role: string
    parts: Part[]
  }[]
}) {
  const streamingResp = await ai.models.generateContentStream({
    model: llm_model,
    contents: contents,
    config: {
      maxOutputTokens: 8192,
      temperature: 1,
      topP: 0.95,
      seed: 0,
      responseModalities: ['TEXT'],
      /*  speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: 'zephyr',
          },
        },
      }, */

      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: `
                ${system_prompt}`,
          },
        ],
      },

      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    },
  })

  return streamingResp
}

/**
 *
 * @param param0
 * @returns
 */
export async function generateImage({
  system_prompt,
  llm_model,
  contents,
}: {
  system_prompt: string
  llm_model: string
  contents: {
    role: string
    parts: Part[]
  }[]
}) {
  console.log(contents)
  const streamingResp = await ai.models.generateContent({
    model: llm_model,
    contents: contents,
    config: {
      maxOutputTokens: 8192,
      temperature: 1,
      topP: 0.95,
      seed: 0,
      responseModalities: ['IMAGE', 'TEXT'],

      /*  systemInstruction: {
        role: 'system',
        parts: [
          {
            text: `
                ${system_prompt}`,
          },
        ],
      }, */

      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    },
  })

  const image = streamingResp.candidates![0]!.content!.parts!.find(
    (p) => p.inlineData,
  )!.inlineData!.data!

  const bufferFile = Buffer.from(image, 'base64')

  const id = newUuid()

  const filename = `${id}.png`

  await gcpBucket
    .file(filename)
    .save(bufferFile, {
      contentType: 'image/png',
    })
    .catch((err) => {
      throw new Error('Hubo un problema al intentar subir el documento')
    })

  const rr = `https://storage.googleapis.com/linebox-bucket/${filename}`

  return rr
}
