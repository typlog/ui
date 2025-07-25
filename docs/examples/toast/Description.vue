<script setup lang="ts">
import { toast, Button } from '#components'

const onClick = () => {
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
  toast({
    title: 'A new event with description.',
    description: now,
  })
}
</script>

<template>
  <Button @click="onClick">Description</Button>
</template>
