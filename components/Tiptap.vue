<script setup lang="ts">
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'

const editor = useEditor({
  content: `<p>I’m running Tiptap with Vue.js. 🎉</p>`,
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: `dark:prose-invert prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none prose-p:leading-normal prose-p:m-0 prose-a:leading-normal prose-a:m-0 prose-h1:leading-normal prose-h1:m-0 prose-h2a:leading-normal prose-h2:m-0 prose-h3-a:leading-normal prose-h3:m-0 prose-h4-a:leading-normal prose-h4:m-0 prose-h5-a:leading-normal prose-h5:m-0 prose-h6-a:leading-normal prose-h6:m-0`,
    },
  },
})

const save = () => {
  if (!editor.value) return
  const res = editor.value.getHTML()

  console.log(res)
  //  console.log(editor.value.view.dom)
}
</script>

<template>
  <div v-if="editor" class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <Button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :variant="editor.isActive('bold') ? 'default' : 'outline'"
      >
        bold
      </Button>

      <Button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :variant="
          editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'
        "
      >
        h1
      </Button>
      <Button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :variant="
          editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'
        "
      >
        h2
      </Button>
      <Button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :variant="
          editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'
        "
      >
        h3
      </Button>
      <Button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :variant="
          editor.isActive('heading', { level: 4 }) ? 'default' : 'outline'
        "
      >
        h4
      </Button>
      <Button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :variant="
          editor.isActive('heading', { level: 5 }) ? 'default' : 'outline'
        "
      >
        h5
      </Button>
      <Button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :variant="
          editor.isActive('heading', { level: 6 }) ? 'default' : 'outline'
        "
      >
        h6
      </Button>
    </div>

    <Card>
      <editor-content :editor="editor" />
      <!--         class="space-y-2 editorFix flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
 -->
    </Card>

    <Button @click.prevent="save">Save</Button>
  </div>
</template>
