<script setup lang="ts">
import { componentPlugin } from '@mdit-vue/plugin-component'
import MarkdownIt from 'markdown-it'
import { h } from 'vue'

const md = MarkdownIt({ html: true }).use(componentPlugin, {
  // options
})

const rendered = md.render(
  `\
<!-- @ shorthand is supported -->
# hi
<Foo @click="onClick" />

<Card>
hi
</Card>
<!-- multi-line syntax won't be wrapped with <p> -->
<Foo
  class="foo"
  :bar="bar"
/>
`,
)
</script>

<template>
  <div v-html="rendered"></div>
</template>
