<script setup lang="ts">
import { Avatar } from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <Avatar fallback="A" size="1" />
      <Avatar fallback="A" size="2" />
      <Avatar fallback="A" size="3" />
      <Avatar fallback="A" size="4" />
      <Avatar fallback="A" size="5" />
      <Avatar fallback="AB" size="6" />
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <Avatar fallback="AB" size="7" />
      <Avatar fallback="AB" size="8" />
      <Avatar fallback="AB" size="9" />
    </div>
  </div>
</template>
