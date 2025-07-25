<script setup lang="ts">
import { ref } from 'vue'
import { toast, Button } from '#components'

const count = ref(0)

const onClick = () => {
  count.value += 1
  toast(`You have received ${count.value} events.`)
}
</script>

<template>
  <Button @click="onClick">Click me!</Button>
</template>
