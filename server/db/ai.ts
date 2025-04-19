import { GoogleGenAI } from '@google/genai'
import { HarmCategory } from '@google/genai'
import { HarmBlockThreshold } from '@google/genai'
import type { Part } from '@google/genai'
import { gcpBucket } from './gcp'
import { newUuid } from '~/composables/helper'

// Initialize Vertex with your Cloud project and location
const ai = new GoogleGenAI({
  vertexai: true,
  project: 'linebox-412716',
  location: 'us-central1',
  googleAuthOptions: {
    credentials: {
      client_email: 'linebox-api@linebox-412716.iam.gserviceaccount.com',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKr/93UL0014os\nLM6JCiH8GWCEgASH4mglPFstjNKR0J/f+P3vk9g7J4HY8YTzudaeJfbMUfo2NNh6\n43Xf1rraTlE/kaKrglWHsW/pJZ05iy1J/VFmWf87pCQgXQwoyJ1aPSap7T1PhrxP\nInVTNNS7asvFKEUFEHqr78xgL8duu6tryLLKaC1MnwW2JjzTnvxksS3c8TYwnIMy\ngrd57WeB5t1Fn8iPidh+184TlO+tu2Ajq6wdotGEdQnQ+Oz969Ewgp4oq7LjdA7b\nmAKukqL5zDhUIkqTy/3dfBNLjEh3Y0q1VaBaTLfqnByIK5GhgveOjCizFHqfnzgH\no1Ih9C2bAgMBAAECggEAYatqqre83QRKQFw9EDtSQhWGdYLs6//1WJAbjbkQ1RQX\nnklxMGvpZCP3Ba/odbvlCCNaKH4OWOWhNaJ7MChctQrNSxkmLohpJ7CgsVQfTdXb\nto47ldsjSz2e7Pt5ewOlE5FpGrRH+ZT/FBESQUyxgDiHxdNQYw7cVhMBRI5xh1FK\nvzR2gLwHq4f/Vqcw8dIuXrlJKhe4BEUThNDVA4K1R7Gv7482NLjFWWfBjPG7xJna\nw84xhvmtGIRzdwAgRU4t+4fGvyH+DI2rmScdBHJfLkDG9ktXLX2lk2MlV7jIcy50\nmOpZ+TaHO0yubBmCpVjeIWZ/fnz8uG0cfOXYqWJ11QKBgQD03f2d9rm66t3rK248\nsr7l0vL8P5h+f9M8cMbl+izZB5oATtB04tHkgnd5mvdQqOm7EZtylMP06HfQ2Ajl\nPtGn4REhzy5U9rkiQqu9G0gqM2LrKTLo5dkmnV6Hntn1NKTQVq0FaCZDVCp0CQmF\n4ApBT7P9brFA2a+EZUF/+A83XQKBgQDT5xP8yUCgvsKd1n7zrExPMT6ibS8hqfXC\n4X2975KBrLeqjaNQ1ojxuhDwAjBeAgVx6BPJ7y2Y7KqZfGyyyxmROQ5FWGCRYgjB\nXCYGBIYynkszfInWr81jqr1KN7GZLGuPj4LuqbE8NLcr9CS6I5HFyX4z09UMU3sy\n+LcYJ8UBVwKBgQC5OHYQF8Hz3pbQvYBcT4TQyVldbymFfmElVdVNvohP/k0CMJvD\n3pKP/BQtmwe6LprmEvJ3oIn9Zh7DjbZk2biy+S8BWPsd76aogK/xkoJq0YXghcBp\npPs2F1Ga2pDZxuFoajfkYByZTz/xl6hpaMe5EXX/nMxdVoxKZGFAUD4KTQKBgBs8\n0KzlkZEX9BwlvhvEQerMAakPL8e7+QMbyPXpHYPdl54sppl1ehTYPeUb4uuyhtCl\nbCXAwLOveB5SiAZTZO3tz4/KVF9bopR4K8sKOdW30yLDF1SpNFVjVQF9Ny7hLtI9\nOC9FUKrUe9cCgtYKTGqIA9jVmcUD1govPhm0wvXxAoGBAJ5IhsTLZKkv0Us7Wibg\nqyoi/zVNnzt3jpZIj5/YNut4fHvtOZGLZ1x8xNzLPSLPnC4uuecKmoOfvbsQGlot\nOYLAOBMXPldxcekb8THE9WCzpDHQkFZjDRPVo4m4MKpPNmwP2M0dsqXb8/rY9W3f\nM+gRseJmzFDATCNvCB7B6v4z\n-----END PRIVATE KEY-----\n',
    },
  },
  httpOptions: {
    headers: {
      Connection: 'keep-alive',
    },
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
