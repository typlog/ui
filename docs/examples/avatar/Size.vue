<script setup lang="ts">
import { Avatar } from '#components'

const picture = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-1">
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="1"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="2"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="3"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="4"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="5"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="6"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="7"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="8"
      />
      <Avatar
        :src="picture"
        alt="Alex"
        radius="full"
        size="9"
      />
    </div>
  </div>
</template>
