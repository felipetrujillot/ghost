<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { status, data } = $trpc.notes.getTest.useQuery()
</script>
<template>
  <div class="container">
    <div>
      <h1>
        {{ status }}
      </h1>
    </div>

    {{ data }}
  </div>
</template>
