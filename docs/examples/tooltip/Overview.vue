<script setup lang="ts">
import PlusIcon from '~icons/ri/add-line'
import { Tooltip, IconButton } from '#components'
</script>

<template>
  <div class="flex">
    <Tooltip content="Add to library">
      <IconButton radius="full">
        <PlusIcon />
      </IconButton>
    </Tooltip>
  </div>
</template>
