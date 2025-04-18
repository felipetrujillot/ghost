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
    //    lastPageToConvert: 99,
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
  type: 'paragraph' | 'title' | 'table' | 'footer'
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
    const width = parseFloat($(page).attr('width')!)
    const height = parseFloat($(page).attr('height')!)
    const arrayBlock: ContentBlock[] = []

    $(page)
      .find('flow')
      .each((_, flow) => {
        const $flow = $(flow)

        $flow.find('block').each((_, block) => {
          const $block = $(block)

          $block.find('line').each((_, line) => {
            const $line = $(line)
            const xMin = round(parseFloat($line.attr('xMin') || '0'))
            const yMin = round(parseFloat($line.attr('yMin') || '0'))
            const xMax = round(parseFloat($line.attr('xMax') || '0'))
            const yMax = round(parseFloat($line.attr('yMax') || '0'))

            let fullText = ''

            $line.find('word').each((_, word) => {
              const $word = $(word)

              const text = $word.text()
              fullText += `${text} `
            })

            arrayBlock.push({
              text: fullText.trimEnd(),
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
    return vGap <= lineGap && heightDiff <= 3
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
  const footerStartY = pageHeight * 0.9

  // Check if the contentBlock is fully or partially in the footer area
  return contentBlock.yMin >= footerStartY || contentBlock.yMax >= footerStartY
}

/**
 *
 */

export const convertFullPdf = async (file: Buffer) => {
  const xml = await convertPdf(file)

  const pages = xmlToJson(xml)

  const groupedPages = pages.map((page) => {
    let lineHeight = 0

    page.blocks.map((r) => {
      const eHeight = r.yMax - r.yMin
      lineHeight += eHeight
    })

    const avgLineHeight = round(lineHeight / page.blocks.length) + 1

    const paragraphs = groupIntoParagraphs(page.blocks)

    paragraphs.forEach((p) => {
      const checked = findFooterArea({
        pageHeight: page.page_height,
        contentBlock: p,
      })

      const estimatedHeight = (p.yMax - p.yMin) / p.lines

      if (estimatedHeight > avgLineHeight) {
        p.type = 'title'
      }
      if (checked === true) {
        p.type = 'footer'
      }
    })
    return paragraphs
  })

  return groupedPages
}
