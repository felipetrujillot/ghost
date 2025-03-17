<script setup lang="ts">
import katex from 'katex'

const tiptapHtml = (mathExpression: string) => {
  const katexString = katex.renderToString(mathExpression, {
    throwOnError: false,
    output: 'html',
  })

  //console.log(katexString)
  return katexString
}

const props = defineProps<{
  html: string
}>()

const computedRef = computed(() => {
  //console.log('props.html: ', props.html)
  const regEx = props.html.replace(/\$([^\$]*)\$/gi, (_, math) => {
    return tiptapHtml(math)
  })

  return regEx
})
</script>

<template>
  <p
    class="dark:prose-invert !max-w-none prose prose-sm sm:prose lg:prose-md xl:prose-md focus:outline-none prose-p:leading-normal prose-p:m-0 prose-a:leading-normal prose-a:m-0 prose-h1:leading-normal prose-h1:m-0 prose-h2:leading-normal prose-h2:m-0 prose-h3-a:leading-normal prose-h3:m-0 prose-h4-a:leading-normal prose-h4:m-0 prose-h5-a:leading-normal prose-h5:m-0 prose-h6-a:leading-normal prose-h6:m-0 prose-li-a:leading-normal prose-li:m-0 prose-ul-a:leading-normal prose-ul:m-0"
    v-html="computedRef"
  ></p>
</template>
