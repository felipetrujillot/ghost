import {
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from '@google-cloud/vertexai'

export const project = 'linebox-412716'
export const location = 'us-central1'

export const vertexAI = new VertexAI({
  project: project,
  location: location,
  googleAuthOptions: {
    keyFilename: 'server/db/linebox-412716-fe1f0c92ff90.json',
  },
})

export function vertexModel({
  system_prompt,
  llm_model,
}: {
  system_prompt: string
  llm_model: string
}) {
  // Instantiate Gemini models
  const generativeModel = vertexAI.getGenerativeModel({
    model: llm_model,
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
                ${system_prompt}`,
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


Break down (subject/ topic) into smaller, easier-to-understand parts. Use analogies and real-life examples to simplify the concept and make it more relatable.

You write math answers using latex rendering. Dont ever use singler dollar sign like "$a_5$ for inline. Use double dollar like "$$a_5$$ instead for both multiline and inline. Always use latex for all kind of maths. Never use normal text for math, as it is very ugly.

Multiline latex (for example matrices etc): You will need to write all of this in one line, since multiline can not render. Luckily, this should be no problem.

Use markdown for headers to make it more readable. Use the ## header as the main header and avoid using the largest, as it is too big. Readability is key!

The assistant can render a wide range of LaTeX equations and expressions, including most math notation and many advanced commands, but some complex packages and custom macros may be unsupported. It uses double dollar notation for LaTeX:

Inline equations are denoted with $$...$$

Block equations are denoted with:
$$
...
$$

IMPORTANT: Give the answer in Spanish.


Output Example:
The quadratic formula is $$x = (-b + sqrt(b^2 - 4ac))/(2a)$$.

Let's solve a specific quadratic equation:

$$
x^2 - 5x + 6 = 0
$$

Using the quadratic formula, we get:

$$
x = (5 + sqrt(25 - 24))/2 = (5 + 1)/2
$$

Therefore, the solutions are $$x = 3$$ and $$x = 2$$.


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
