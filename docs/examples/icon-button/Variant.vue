<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { IconButton } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <IconButton variant="classic">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton variant="solid">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton variant="soft">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton variant="surface">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton variant="outline">
      <Icon icon="lucide:bookmark" />
    </IconButton>
    <IconButton variant="ghost">
      <Icon icon="lucide:bookmark" />
    </IconButton>
  </div>
</template>
