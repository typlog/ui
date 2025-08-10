<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { IconButton } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <IconButton radius="none" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton radius="small" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton radius="medium" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton radius="large" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton radius="full" variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
  </div>
</template>
