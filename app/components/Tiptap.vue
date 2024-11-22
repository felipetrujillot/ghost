<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
/**
 *
 */
const props = defineProps<{
  text: string
}>()

const emit = defineEmits(['saveNote'])

const editor = useEditor({
  content: props.text,
  extensions: [StarterKit, Link],
  editorProps: {
    attributes: {
      class: `dark:prose-invert prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none prose-p:leading-normal prose-p:m-0 prose-a:leading-normal prose-a:m-0 prose-h1:leading-normal prose-h1:m-0 prose-h2:leading-normal prose-h2:m-0 prose-h3-a:leading-normal prose-h3:m-0 prose-h4-a:leading-normal prose-h4:m-0 prose-h5-a:leading-normal prose-h5:m-0 prose-h6-a:leading-normal prose-h6:m-0 prose-li-a:leading-normal prose-li:m-0 prose-ul-a:leading-normal prose-ul:m-0`,
    },
  },
})

/**
 *
 */
const save = async () => {
  if (!editor.value) return

  const note_text = editor.value.getHTML()

  emit('saveNote', note_text)
}
useMetaKey('s', () => {
  save()
})
</script>

<template>
  <div v-if="editor" class="space-y-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="flex flex-wrap flex-row-reverse gap-2" v-if="1 + 1 === 3">
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
      </div>
    </div>

    <div class="p-0 min-h-72">
      <editor-content :editor="editor" />
    </div>

    <div class="text-end">
      <Button @click.prevent="save">Guardar</Button>
    </div>
  </div>
</template>
