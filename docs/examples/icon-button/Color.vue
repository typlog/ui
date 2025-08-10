<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { IconButton } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <IconButton color="indigo" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton color="cyan" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton color="orange" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton color="crimson" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
  </div>
</template>
