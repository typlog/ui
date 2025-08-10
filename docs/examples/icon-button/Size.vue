<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { IconButton } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <IconButton size="1" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton size="2" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton size="3" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton size="4" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
  </div>
</template>
