import { db } from '../db/db'
import { vectores } from '../db/db_schema'
import { chunk } from 'llm-chunk'
import { embedTexts } from '../db/embedding'
import {
  filterSimilarTexts,
  formatFindEmbeddings,
  insertVectores,
} from '../vectors'
import { convertFullPdf } from '../pdf'

export default defineEventHandler(async (event) => {
  /*  const file =
    'https://storage.googleapis.com/hubdesign-repositorio/pdf/sap/SapResumenFinanciero_1742420458845.pdf'
  */ // const file = 'https://storage.googleapis.com/worklite-cdn/516123751319.pdf'
  /* 
  const file = 'https://storage.googleapis.com/worklite-cdn/516123751319.pdf' */
  // const file = 'https://greenteapress.com/thinkpython/thinkpython.pdf'

  let file =
    'https://storage.googleapis.com/hubdesign-repositorio/public/uploads/1744593157873-RFP%20Previred%20v1.0%20%20Bases%20Tecnicas.pdf'
  /* 
  file = 'https://greenteapress.com/thinkpython/thinkpython.pdf' */
  const readFile = await fetch(file)

  const arrayBuff = await readFile.arrayBuffer()

  const buffer = Buffer.from(arrayBuff)

  const r = await convertFullPdf(buffer)

  return r
})
