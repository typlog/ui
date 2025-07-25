<script setup lang="ts">
import { Tooltip, IconButton, Icon } from '#components'
</script>

<template>
  <div class="flex">
    <Tooltip content="Add to library">
      <IconButton radius="full">
        <Icon icon="lucide:plus" />
      </IconButton>
    </Tooltip>
  </div>
</template>
