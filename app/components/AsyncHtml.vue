<script setup lang="ts">
import { Marked } from 'marked'
import katex from 'katex'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

defineProps<{
  chat: string
}>()
const renderMath = (math: any, displayMode: any) => {
  return `<pre>${katex.renderToString(math, {
    throwOnError: false,
    displayMode,
    output: 'mathml', // Cambia 'mathml' por 'html' o 'htmlAndMathml'
  })}</pre>`
}

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plainttext'
      return hljs.highlight(code, { language: 'typescript' }).value
    },
  }),
)

const renderHtml = (html: string) => {
  const regEx = html
    .replace(/\$\$([^$]+?)\$\$/g, (_, math) => renderMath(math, true))
    .replace(/\$([^$]+?)\$/g, (_, math) => renderMath(math, false))
    .replace(/(\d)\s*-\s*(\d)/g, '$1 - $2')
  /*  .replace(/<code>([\s\S]*?)<\/code>/g, (match, code) => {
      if (/\\[a-zA-Z]+|\^|_/.test(code)) {
        return renderMath(code, true)
      }
      return match
    }) */

  return marked.parse(regEx) // now this returns a string, not a Promise
}
</script>

<template>
  <div
    class="prose prose-md dark:prose-invert w-full !max-w-none break-words !break-words"
    v-html="renderHtml(chat)"
  ></div>
</template>
