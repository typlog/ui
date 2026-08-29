<script setup lang="ts">
import { toast, Button } from '@typlog/ui'

const showToast = () => {
  toast({
    title: 'Responsive toast',
    description: 'Resize the browser below the provider breakpoint to see the full-width layout.',
  })
}
</script>

<template>
  <Button @click="showToast">Show responsive toast</Button>
</template>
