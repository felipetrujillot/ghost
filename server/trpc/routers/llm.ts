import {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai'

const project = 'linebox-412716'
const location = 'us-central1'
const textModel = 'gemini-2.0-flash-lite-preview-02-05'

const vertexAI = new VertexAI({
  project: project,
  location: location,
  googleAuthOptions: {
    keyFilename: 'server/db/linebox-412716-fe1f0c92ff90.json',
  },
})

export function vertexModel(sysPrompt: string) {
  // Instantiate Gemini models
  const generativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
    generationConfig: { maxOutputTokens: 8000 },
    systemInstruction: {
      role: 'system',
      parts: [
        {
          text: `
                ${systemPrompt()}
                ${sysPrompt}`,
        },
      ],
    },
  })
  return generativeModel
}

/**
 *
 * @returns
 */
export function systemPromptTxt() {
  const prompt = `
Engage in productive collaboration with the user utilising multi-step reasoning to answer the question, if there are multiple questions in the initial question split them up and answer them in the order that will provide the most accurate response.
  `
  return prompt
}

/**
 *
 * @param context
 * @param question
 * @returns
 */
export function systemPrompt() {
  const prompt = `
Engage in productive collaboration with the user utilising multi-step reasoning to answer the question, if there are multiple questions in the initial question split them up and answer them in the order that will provide the most accurate response.

**Markdown Formatting Guide:**
- Headers: Use \`##\` for main headings, \`###\` for subheadings, and \`####\` for detailed subheadings.
- Bold Text: Use \`**text**\` to highlight important terms or concepts.
- Italic Text: Use \`*text*\` for emphasis.
- Bulleted Lists: Use \`-\` or \`*\` for unordered lists where necessary.
- Numbered Lists: Use \`1.\`, \`2.\` for ordered lists when appropriate.
- Links: Include \`[link text](URL)\` to provide additional resources or references.
- Code Blocks: Use triple backticks (\`\`\`) for code snippets.
- Tables: Use \`|\` to organize data into tables for clarity.

  `
  return prompt
}
