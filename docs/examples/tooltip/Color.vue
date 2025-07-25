<script setup lang="ts">
import { Tooltip, IconButton, Icon } from '#components'
</script>

<template>
  <div class="flex items-center gap-4">
    <Tooltip content="Add to library" color="indigo">
      <IconButton color="indigo" radius="full">
        <Icon icon="lucide:plus" />
      </IconButton>
    </Tooltip>

    <Tooltip content="Add to library" color="violet">
      <IconButton color="violet" radius="full">
        <Icon icon="lucide:plus" />
      </IconButton>
    </Tooltip>

    <Tooltip content="Add to library" color="crimson">
      <IconButton color="crimson" radius="full">
        <Icon icon="lucide:plus" />
      </IconButton>
    </Tooltip>

    <Tooltip content="Add to library" color="amber">
      <IconButton color="amber" radius="full">
        <Icon icon="lucide:plus" />
      </IconButton>
    </Tooltip>
  </div>
</template>
