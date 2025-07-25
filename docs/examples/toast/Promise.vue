<script setup lang="ts">
import { toast, Button } from '#components'

const successFn = () => new Promise((resolve) => setTimeout(resolve, 2000))
const errorFn = () => new Promise((_, reject) => setTimeout(reject, 2000))

const onClickSuccess = () => {
  toast.promise(successFn, {
    loading: 'Fetching data ....',
    success: () => {
      return 'You have a new message.'
    },
  })
}

const onClickError = () => {
  toast.promise(errorFn, {
    loading: 'Fetching data ....',
    success: () => {
      return 'You have a new message.'
    },
    error: () => {
      return 'You have a new error.'
    },
  })
}
</script>

<template>
  <div class="flex items-center gap-4">
    <Button variant="soft" @click="onClickSuccess">With success</Button>
    <Button color="red" variant="soft" @click="onClickError">With error</Button>
  </div>
</template>
