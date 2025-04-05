<script setup lang="ts">
import { Marked } from 'marked'
import markedCodeFormat from 'marked-code-format'
import prettierSvelte from 'prettier-plugin-svelte'
import katex from 'katex'
import prettierPluginVue from 'prettier-plugin-vue'

const props = defineProps<{
  chat: string
}>()
const renderMath = (math: any, displayMode: any) => {
  return `<pre>${katex.renderToString(math, {
    throwOnError: false,
    displayMode,
    output: 'mathml', // Cambia 'mathml' por 'html' o 'htmlAndMathml'
  })}</pre>`
}

const renderHtml = async (html: string) => {
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

  const parser = new Marked() // no async

  return await parser
    .use(
      markedCodeFormat({
        plugins: [prettierPluginVue],
      }),
    )
    .parse(regEx) // now this returns a string, not a Promise
}

const htmlContent = ref('')
// Watch for chat updates and process HTML
watchEffect(async () => {
  htmlContent.value = await renderHtml(props.chat)
})
</script>

<template>
  <div
    class="prose prose-md dark:prose-invert w-full !max-w-none break-words !break-words"
    v-html="htmlContent"
  ></div>
</template>
