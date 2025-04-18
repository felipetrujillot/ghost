import { connection } from '../db/db'
import { Vectores } from '../db/db_schema'

type InsertVectoresParams = {
  embeddings: number[]
  text: string
}
/**
 * Crea vectores
 * @param param0
 * @returns
 */
export const insertVectores = async (insertValues: InsertVectoresParams[]) => {
  const valuesSql = insertValues.map(() => '(?, ?)').join(', ')

  const values: any[] = []
  for (const { embeddings, text } of insertValues) {
    const buffer = Buffer.from(new Float32Array(embeddings).buffer)
    values.push(text, buffer)
  }

  const [result] = (await connection.execute(
    `INSERT INTO vectores (name, vector_data) VALUES ${valuesSql}`,
    values,
  )) as unknown as any

  await connection.end()

  return result.insertId
}

/**
 *
 * @param vecA
 * @param vecB
 * @returns
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB || 1) // Prevent divide by zero
}

/**
 *
 * @param questionEmbeddingRaw
 * @param embedPdf
 * @param threshold
 * @returns
 */
export function filterSimilarTexts({
  embeddedQuestion,
  embeddedChunks,
  threshold = 0.4,
}: {
  embeddedQuestion: (number | null | undefined)[]
  embeddedChunks: {
    id: number
    text: string
    embeddings: (number | null | undefined)[]
  }[]
  threshold: number
}): { text: string; similarity: number }[] {
  // Clean the question embedding
  const questionEmbedding = embeddedQuestion.map((val) => val ?? 0)

  return embeddedChunks
    .map(({ text, embeddings, id }) => {
      const cleanEmbeddings = embeddings.map((val) => val ?? 0)
      const similarity = cosineSimilarity(questionEmbedding, cleanEmbeddings)
      return { text, id, similarity }
    })
    .filter(({ similarity }) => similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity) // Sort best first
}

/**
 *
 * @param question
 * @param chunks
 * @param threshold
 * @returns
 */
export function filterSimilarChunks(
  question: number[],
  chunks: number[][],
  threshold = 0.6,
) {
  return chunks
    .map((chunk) => ({
      chunk,
      similarity: cosineSimilarity(question, chunk),
    }))
    .filter(({ similarity }) => similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity) // descending order
}

export const formatFindEmbeddings = (input: Vectores[]) =>
  input.map((r) => {
    return {
      id: r.id,
      text: r.name,
      embeddings: r.vector_data as number[],
    }
  })
