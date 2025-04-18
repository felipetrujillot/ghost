import { v1, helpers } from '@google-cloud/aiplatform'
import { location, project } from './llm'

const { PredictionServiceClient } = v1

export const vertexAI = new PredictionServiceClient({
  project: project,
  location: location,
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  keyFilename: 'server/db/linebox-412716-fe1f0c92ff90.json',
})
const model = 'text-multilingual-embedding-002'
const endpoint = `projects/${project}/locations/${location}/publishers/google/models/${model}`

export const embedTexts = async (texts: string[]) => {
  const instances = texts.map((r) =>
    helpers.toValue({
      content: r,
      task_type: 'QUESTION_ANSWERING',
    }),
  ) as unknown as protobuf.common.IValue[]

  const dimensionality = 0
  const parameters = helpers.toValue(
    dimensionality > 0 ? { outputDimensionality: dimensionality } : {},
  )

  const [res] = await vertexAI
    .predict({
      //instances: j,
      instances,
      parameters,
      endpoint,
    })
    .catch((err) => {
      console.log(err)
      throw new Error('Error al hacer embeddings')
    })

  if (!res) throw new Error('Embedding falló')
  if (!res.predictions) throw new Error('Embedding falló')
  const embeddings = res.predictions.map((p) => {
    const embeddingsProto = p.structValue!.fields!.embeddings
    const valuesProto = embeddingsProto!.structValue!.fields!.values
    return valuesProto!.listValue!.values!.map((v) => v.numberValue)
  })

  const textsEmbeddings = texts.map((text, k) => {
    return {
      text,
      embeddings: embeddings[k] as number[],
    }
  })

  return textsEmbeddings
}
