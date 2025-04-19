import { cosineDistance, sql } from 'drizzle-orm'
import { connection, db } from '../db/db'
import { vectores } from '../db/db_schema'
import { PdfReader } from 'pdfreader'
import { chunk } from 'llm-chunk'
import { embedTexts } from '../db/embedding'
import {
  filterSimilarTexts,
  formatFindEmbeddings,
  insertVectores,
} from '../vectors'
import { convertFullPdf } from '../pdf'

function parsePdf(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    let finalText = '' // Initialize the text to be collected
    new PdfReader().parseBuffer(buffer, (err, item) => {
      if (err) {
        reject('Error while parsing PDF: ' + err)
      } else if (!item) {
        console.log('here')
        resolve(finalText) // Resolve with the collected text when done
      } else if (item.text) {
        finalText += `${item.text} ` // Collect the text
      }
    })
  })
}

export default defineEventHandler(async (event) => {
  /*  const file =
    'https://storage.googleapis.com/hubdesign-repositorio/pdf/sap/SapResumenFinanciero_1742420458845.pdf'
  */ // const file = 'https://storage.googleapis.com/worklite-cdn/516123751319.pdf'
  /* 
  const file = 'https://storage.googleapis.com/worklite-cdn/516123751319.pdf' */
  // const file = 'https://greenteapress.com/thinkpython/thinkpython.pdf'

  const file =
    'https://storage.googleapis.com/hubdesign-repositorio/public/uploads/1744593157873-RFP%20Previred%20v1.0%20%20Bases%20Tecnicas.pdf'
  const readFile = await fetch(file)

  const arrayBuff = await readFile.arrayBuffer()

  const buffer = Buffer.from(arrayBuff)

  const r = await convertFullPdf(buffer)
  return r
  const t = await parsePdf(buffer)

  const chunks = chunk(t, {
    minLength: 200, // number of minimum characters into chunk
    maxLength: 500, // number of maximum characters into chunk
    splitter: 'sentence', // paragraph | sentence
    overlap: 0, // number of overlap chracters
    delimiters: '', // regex for base split method
  })

  const [embeddedPrompt] = await embedTexts([
    'Which improvements where made on older versions of python?',
  ])

  /*  const embedPdf = await embedTexts(chunks.slice(0, 100))

  await insertVectores([embeddedPrompt, ...embedPdf])

  return true */

  const findEmbeddings = await db.select().from(vectores)

  const mapEmbeddings = formatFindEmbeddings(findEmbeddings)

  const rrr = filterSimilarTexts({
    embeddedQuestion: embeddedPrompt.embeddings,
    embeddedChunks: mapEmbeddings,
    threshold: 0.5,
  })

  return rrr
})
