<script setup lang="ts">
import { TextArea } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <TextArea placeholder="Reply…" variant="surface"></TextArea>
      <TextArea placeholder="Reply…" variant="surface" disabled></TextArea>
    </div>
    <div class="flex gap-4">
      <TextArea placeholder="Reply…" variant="soft"></TextArea>
      <TextArea placeholder="Reply…" variant="soft" disabled></TextArea>
    </div>
  </div>
</template>
