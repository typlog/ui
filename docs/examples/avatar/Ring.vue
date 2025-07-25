<script setup lang="ts">
import { Avatar } from '#components'

const picture = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar
      :src="picture"
      alt="Alex"
      radius="full"
      color="indigo"
      variant="ring"
    />
    <Avatar
      :src="picture"
      alt="Alex"
      radius="full"
      color="jade"
      variant="ring"
    />
    <Avatar
      :src="picture"
      alt="Alex"
      radius="full"
      color="crimson"
      variant="ring"
    />
  </div>
</template>
