<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Dropcursor from '@tiptap/extension-dropcursor'
import Link from '@tiptap/extension-link'

import Image from '@tiptap/extension-image'

const fileInput = ref()

/**
 *
 */
const props = defineProps<{
  text: string
}>()

const emit = defineEmits(['saveNote'])

const editor = useEditor({
  content: props.text,
  extensions: [StarterKit, Link, Image, Dropcursor],
  editorProps: {
    attributes: {
      class: `dark:prose-invert !max-w-none  prose prose-sm sm:prose lg:prose-md xl:prose-md focus:outline-none prose-p:leading-normal prose-p:m-0 prose-a:leading-normal prose-a:m-0 prose-h1:leading-normal prose-h1:m-0 prose-h2:leading-normal prose-h2:m-0 prose-h3-a:leading-normal prose-h3:m-0 prose-h4-a:leading-normal prose-h4:m-0 prose-h5-a:leading-normal prose-h5:m-0 prose-h6-a:leading-normal prose-h6:m-0 prose-li-a:leading-normal prose-li:m-0 prose-ul-a:leading-normal prose-ul:m-0 prose-table:border prose-th:border prose-td:border`,
    },
  },
  onUpdate: () => {
    if (!editor.value) return

    const note_text = editor.value.getHTML()

    emit('saveNote', note_text)
  },
  onPaste: (e) => {
    console.log(e)
  },
})

const changeFile = async (e: any) => {
  const file = e.target.files[0]

  if (file) {
    const allowedTypes = ['image/png', 'image/jpeg']
    if (!allowedTypes.includes(file.type)) {
      return toast('warning', 'Sólo se permiten .jpg y .png')
    }

    const formData = new FormData()

    formData.append('document', file)

    const fileUrl = await $fetch<string>('/api/upload', {
      method: 'POST',
      body: formData,
    })

    editor.value?.commands.insertContent(`<img src="${fileUrl}" />`)
  }

  return
}

onMounted(() => {
  editor.value!.commands.focus()
})
</script>

<template>
  <input
    id="fileUpload"
    ref="fileInput"
    type="file"
    class="hidden"
    @change="changeFile"
  />

  <div v-if="editor" class="space-y-1">
    <Card class="min-h-72 w-full shadow-none">
      <editor-content :editor="editor" class="min-h-36" />
    </Card>
  </div>
</template>

<style>
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid hsl(262.1 83.3% 57.8%);
    }
  }
}

.Tiptap-mathematics-editor {
  background: #202020;
  color: #fff;
  font-family: monospace;
  padding: 0.2rem 0.5rem;
}

.Tiptap-mathematics-render {
  padding: 0 0.25rem;

  &--editable {
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #eee;
    }
  }
}

.Tiptap-mathematics-editor,
.Tiptap-mathematics-render {
  border-radius: 0.25rem;
  display: inline-block;
}
</style>
