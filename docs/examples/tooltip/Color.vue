<script setup lang="ts">
import PlusIcon from '~icons/lucide/plus'
import { Tooltip, IconButton } from '#components'
</script>

<template>
  <div class="flex items-center gap-4">
    <Tooltip content="Add to library" color="indigo">
      <IconButton color="indigo" radius="full">
        <PlusIcon />
      </IconButton>
    </Tooltip>

    <Tooltip content="Add to library" color="violet">
      <IconButton color="violet" radius="full">
        <PlusIcon />
      </IconButton>
    </Tooltip>

    <Tooltip content="Add to library" color="crimson">
      <IconButton color="crimson" radius="full">
        <PlusIcon />
      </IconButton>
    </Tooltip>

    <Tooltip content="Add to library" color="amber">
      <IconButton color="amber" radius="full">
        <PlusIcon />
      </IconButton>
    </Tooltip>
  </div>
</template>
