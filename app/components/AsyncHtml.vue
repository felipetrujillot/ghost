<script setup lang="ts">
import { marked } from 'marked'
import katex from 'katex'

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

const renderHtml = (html: string) => {
  const regEx = html
    .replace(/\$\$([^$]+?)\$\$/g, (_, math) => renderMath(math, true))
    .replace(/\$([^$]+?)\$/g, (_, math) => renderMath(math, false))
    .replace(/(\d)\s*-\s*(\d)/g, '$1 - $2')
    .replace(/<code>([\s\S]*?)<\/code>/g, (match, code) => {
      if (/\\[a-zA-Z]+|\^|_/.test(code)) {
        return renderMath(code, true)
      }
      return match
    })

  return marked.parse(regEx) // now this returns a string, not a Promise
}
</script>

<template>
  <div
    class="prose prose-md dark:prose-invert w-full !max-w-none break-words !break-words"
    v-html="renderHtml(chat)"
  ></div>
</template>
