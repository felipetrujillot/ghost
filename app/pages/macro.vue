<script setup lang="ts">
useAPI('/api/notes/getNotes')

/**
 *
 */
const { data, status, error, refresh } = useFetch('/api/notes/getNotes', {
  method: 'POST',
  body: {
    test: '123',
  },
  //watch: [counter],
})
</script>

<template>
  {{ error }}
  {{ status }}

  {{ data }}
</template>
