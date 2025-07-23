<script setup lang="ts">
import { TextArea } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <TextArea placeholder="Reply…" resize="none"></TextArea>
    <TextArea placeholder="Reply…" resize="horizontal"></TextArea>
    <TextArea placeholder="Reply…" resize="vertical"></TextArea>
    <TextArea placeholder="Reply…" resize="both"></TextArea>
  </div>
</template>
