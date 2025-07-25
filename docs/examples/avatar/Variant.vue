<script setup lang="ts">
import { Avatar } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-4">
      <Avatar
        fallback="HP"
        radius="full"
        size="3"
        variant="solid"
      />
      <Avatar
        fallback="HP"
        radius="full"
        size="3"
        variant="surface"
      />
      <Avatar
        fallback="HP"
        radius="full"
        size="3"
        variant="soft"
      />
      <Avatar
        fallback="HP"
        radius="full"
        size="3"
        variant="outline"
      />
    </div>
  </div>
</template>
