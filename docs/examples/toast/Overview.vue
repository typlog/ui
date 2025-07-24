<script setup lang="ts">
import { ref } from 'vue'
import { toast, Button } from '#components'

const count = ref(0)

const onClick = () => {
  count.value += 1
  toast.info({
    title: `You clicked ${count.value} times`,
    description: 'This is a description',
    action: {
      label: 'Undo',
      onClick: () => console.log('undo'),
    },
  })
}
</script>

<template>
  <Button @click="onClick">Click me!</Button>
</template>
