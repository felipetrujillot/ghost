<script setup lang="ts">
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import Textarea from './ui/textarea/Textarea.vue'
const { $trpc } = useNuxtApp()
/**
 *
 */
const props = defineProps<{
  title_note: string
  text_note: string
  id_note: number
}>()

const titleRef = ref(props.title_note)

const editor = useEditor({
  content: props.text_note,
  extensions: [StarterKit, Link],
  editorProps: {
    attributes: {
      class: `dark:prose-invert prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none prose-p:leading-normal prose-p:m-0 prose-a:leading-normal prose-a:m-0 prose-h1:leading-normal prose-h1:m-0 prose-h2a:leading-normal prose-h2:m-0 prose-h3-a:leading-normal prose-h3:m-0 prose-h4-a:leading-normal prose-h4:m-0 prose-h5-a:leading-normal prose-h5:m-0 prose-h6-a:leading-normal prose-h6:m-0`,
    },
  },
})

const save = async () => {
  console.log('here')
  if (!editor.value) return
  const text_note = editor.value.getHTML()

  const { status, data } = await $trpc.notes.updateNote.mutate({
    id_note: props.id_note,
    text_note: text_note,
    title_note: titleRef.value,
  })

  toast(status, data)
  //  console.log(editor.value.view.dom)
}
useMetaKey('s', () => {
  save()
})
</script>

<template>
  <div v-if="editor" class="space-y-4">
    <div class="flex flex-wrap justify-between gap-4">
      <div class="flex grow">
        <Input
          class="text-4xl font-bold m-0 p-0 min-h-1 h-12 resize border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          v-model="titleRef"
        ></Input>
      </div>

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

      <!--  <Button
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
      </Button> -->
    </div>

    <div class="p-0">
      <editor-content :editor="editor" />
      <!--         class="space-y-2 editorFix flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
 -->
    </div>

    <Button @click.prevent="save">Save</Button>
  </div>
</template>
