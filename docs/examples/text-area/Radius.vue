<script setup lang="ts">
import { TextArea } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <TextArea placeholder="Reply…" radius="none"></TextArea>
    <TextArea placeholder="Reply…" radius="small"></TextArea>
    <TextArea placeholder="Reply…" radius="medium"></TextArea>
    <TextArea placeholder="Reply…" radius="large"></TextArea>
    <TextArea placeholder="Reply…" radius="full"></TextArea>
  </div>
</template>
