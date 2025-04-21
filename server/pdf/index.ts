import { Poppler } from 'node-poppler'
import * as cheerio from 'cheerio'

/**
 *
 * @returns
 */
const convertPdf = async (file: Buffer) => {
  const poppler = new Poppler()

  const r = await poppler.pdfToText(file, undefined, {
    firstPageToConvert: 1,
    // lastPageToConvert: 2,
    boundingBoxXhtmlLayout: true,
    maintainLayout: true,
    noPageBreaks: true,
  })

  return r
}

type ContentBlock = {
  text: string
  xMin: number
  yMin: number
  xMax: number
  yMax: number
  type: 'paragraph' | 'title' | 'table' | 'footer' | 'header'
  page_number: number
  lines: number
}

type Page = {
  page_height: number
  page_width: number
  blocks: ContentBlock[]
}
const round = (value: number, decimals = 0): number =>
  Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)

/**
 *
 * @param xhtml
 * @returns
 */
const xmlToJson = (xhtml: string): Page[] => {
  const $ = cheerio.load(xhtml, {
    xmlMode: true,
  })

  const pages: Page[] = []

  $('page').each((pageIndex, page) => {
    const pageNumber = pageIndex + 1
    const width = parseInt($(page).attr('width')!)
    const height = parseInt($(page).attr('height')!)
    const arrayBlock: ContentBlock[] = []

    $(page)
      .find('flow')
      .each((_, flow) => {
        const $flow = $(flow)

        $flow.find('block').each((_, block) => {
          const $block = $(block)

          $block.find('line').each((_, line) => {
            const $line = $(line)
            const xMin = round(parseInt($line.attr('xMin') || '0'))
            const yMin = round(parseInt($line.attr('yMin') || '0'))
            const xMax = round(parseInt($line.attr('xMax') || '0'))
            const yMax = round(parseInt($line.attr('yMax') || '0'))

            let fullText = ''

            $line.find('word').each((_, word) => {
              const $word = $(word)

              const text = $word.text()
              fullText += `${text} `
            })

            const fullProcessText = (t: string) => {
              try {
                return `${fullText.trimEnd().replace(/\.{3,}/g, '')} \n`
              } catch (error) {
                return t
              }
            }
            arrayBlock.push({
              text: fullProcessText(fullText),
              page_number: pageNumber,
              xMin,
              yMin,
              xMax,
              yMax,
              type: 'paragraph',
              lines: 1,
            })
          })
        })
      })

    if (arrayBlock.length > 0) {
      pages.push({
        page_height: height,
        page_width: width,
        blocks: arrayBlock,
      })
    }
  })
  return pages
}

/**
 *
 */
function groupIntoParagraphs(
  blocks: ContentBlock[],
  lineGap = 15,
): ContentBlock[] {
  const paragraphs: ContentBlock[] = []

  const sorted = [...blocks].sort((a, b) => a.yMin - b.yMin)

  let currentParagraph: ContentBlock[] = []

  const isSameParagraph = (prev: ContentBlock, next: ContentBlock): boolean => {
    const vGap = next.yMin - prev.yMax
    const heightDiff = Math.abs(prev.yMax - prev.yMin - (next.yMax - next.yMin))
    return vGap <= lineGap && heightDiff <= 2
  }

  for (let i = 0; i < sorted.length; i++) {
    const block = sorted[i]

    if (
      currentParagraph.length === 0 ||
      isSameParagraph(currentParagraph[currentParagraph.length - 1], block)
    ) {
      currentParagraph.push(block)
    } else {
      paragraphs.push(mergeParagraph(currentParagraph))
      currentParagraph = [block]
    }
  }

  if (currentParagraph.length) {
    paragraphs.push(mergeParagraph(currentParagraph))
  }

  return paragraphs
}

/**
 *
 */
function mergeParagraph(blocks: ContentBlock[]): ContentBlock {
  const text = blocks.map((b) => b.text).join(' ')
  const xMin = Math.min(...blocks.map((b) => b.xMin))
  const yMin = Math.min(...blocks.map((b) => b.yMin))
  const xMax = Math.max(...blocks.map((b) => b.xMax))
  const yMax = Math.max(...blocks.map((b) => b.yMax))
  const page_number = blocks[0].page_number
  const type = blocks[0].type
  const lines = blocks.length

  return { text, xMin, yMin, xMax, yMax, page_number, lines, type }
}

const findFooterArea = ({
  pageHeight,
  contentBlock,
}: {
  pageHeight: number
  contentBlock: ContentBlock
}) => {
  const headerArea = pageHeight * 0.9

  // Check if the contentBlock is fully or partially in the footer area
  return contentBlock.yMin >= headerArea || contentBlock.yMax >= headerArea
}

const findHeaderArea = ({
  pageHeight,
  contentBlock,
}: {
  pageHeight: number
  contentBlock: ContentBlock
}) => {
  const footerArea = pageHeight * 0.1

  // Check if the contentBlock is fully or partially in the footer area
  //return contentBlock.yMin <= footerArea || contentBlock.yMax <= footerArea
  return contentBlock.yMin <= footerArea
}

/**
 * Junta chunks que tengan misma altura
 * @param arr
 * @returns
 */
function mergeLinesByYCoordinates(arr: ContentBlock[]): ContentBlock[] {
  const merged: ContentBlock[] = []

  arr.forEach((item) => {
    const existing = merged.find(
      (m) =>
        m.page_number === item.page_number &&
        m.yMin === item.yMin &&
        m.yMax === item.yMax,
    )

    if (existing) {
      // Combine the text and update xMin/xMax
      existing.text += item.text
      existing.xMin = Math.min(existing.xMin, item.xMin)
      existing.xMax = Math.max(existing.xMax, item.xMax)
    } else {
      // Clone the item to avoid modifying original
      merged.push({ ...item })
    }
  })

  return merged
}

function convertToMarkdown(text: string, type: ContentBlock['type']): string {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (type === 'title') return `## ${text}`
  if (type === 'header') return `#### ${text}`
  if (type === 'footer') return `#### ${text}`

  text.replaceAll('•', '- ')
  return text
}

/**
 * Se encarga de procesar una página
 * Junta párrafos
 * Identifica
 * - Footer
 * - Header
 * - Título
 * - Párrafo
 * - Tablas => TODO
 * @param page
 * @returns
 */
const processPage = (page: Page, totalAvgHeight: number) => {
  let lineHeight = 0

  page.blocks.forEach((r) => {
    const eHeight = r.yMax - r.yMin
    lineHeight += eHeight
  })

  const avgLineHeight = round(lineHeight / page.blocks.length) + 1

  const blocksTogether = mergeLinesByYCoordinates(page.blocks)

  blocksTogether.forEach((c) => {
    c.text = `${c.text.replace(/\n/g, '').trim()} \n`
  })

  const paragraphs = groupIntoParagraphs(blocksTogether)

  paragraphs.forEach((p, k) => {
    const checkIsFooter = findFooterArea({
      pageHeight: page.page_height,
      contentBlock: p,
    })

    const checkIsHeader = findHeaderArea({
      pageHeight: page.page_height,
      contentBlock: p,
    })

    const estimatedHeight = (p.yMax - p.yMin) / p.lines

    const percentageHeight = ((p.yMax - p.yMin) / page.page_height) * 100

    if (
      estimatedHeight > avgLineHeight &&
      estimatedHeight > totalAvgHeight &&
      percentageHeight < 10
    ) {
      p.type = 'title'
    }
    if (checkIsFooter === true && percentageHeight < 10) {
      p.type = 'footer'
    }
    if (checkIsHeader && percentageHeight < 10) {
      p.type = 'header'
    }

    p.text = convertToMarkdown(p.text, p.type)
  })

  return paragraphs
}

const calcTotalAverageHeight = (pages: Page[]) => {
  return 15
  let totalHeight = 0
  let totalLines = 0

  pages.forEach((page) => {
    page.blocks.forEach((r) => {
      const eHeight = r.yMax - r.yMin
      totalHeight += eHeight
      totalLines += 1
    })
  })

  const avgLineHeight = Math.round(totalHeight / totalLines)
  return avgLineHeight
}

/**
 *
 */

export const convertFullPdf = async (file: Buffer) => {
  const xml = await convertPdf(file)

  const pages = xmlToJson(xml)

  const totalAvgHeight = calcTotalAverageHeight(pages)

  //return processPage(pages[1], totalAvgHeight)

  const groupedPages = pages.map((page) => {
    return processPage(page, totalAvgHeight)
  })

  return groupedPages
}
