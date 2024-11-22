<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

defineProps(nodeViewProps)
const vall = ref(0)
</script>

<template>
  <node-view-wrapper class="vue-component">
    <Button @click.prevent="vall++">{{ vall }}</Button>
  </node-view-wrapper>
</template>
