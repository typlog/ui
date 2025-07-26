<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Toggle } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <Toggle size="1">
      <Icon icon="lucide:heart" />
    </Toggle>
    <Toggle size="2">
      <Icon icon="lucide:heart" />
    </Toggle>
    <Toggle size="3">
      <Icon icon="lucide:heart" />
    </Toggle>
  </div>
</template>
