<script setup lang="ts">
import { toast, Button } from '#components'

const onClick = () => {
  toast({
    title: 'A message with action.',
    action: {
      label: 'Undo',
      onClick: () => console.log('undo'),
    },
  })
}
</script>

<template>
  <Button @click="onClick">Action</Button>
</template>
