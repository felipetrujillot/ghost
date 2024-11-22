<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

documentTitle(props.title)
</script>
<template>
  <div class="hidden">&nbsp;</div>
</template>
