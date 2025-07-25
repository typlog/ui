<script setup lang="ts">
import { Avatar } from '#components'
</script>

<template>
  <div class="flex items-center gap-4">
    <Avatar
      src="https://bit.ly/broken-link"
      radius="full"
      alt="Harry Potter"
    />
    <Avatar
      src="https://bit.ly/broken-link"
      variant="soft"
      radius="full"
      fallback="HP"
    />
    <Avatar
      src="https://bit.ly/broken-link"
      radius="full"
      variant="soft"
    />
  </div>
</template>
