<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Toggle } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <Toggle variant="solid" :default-value="true">
      <Icon icon="lucide:heart" />
    </Toggle>
    <Toggle variant="soft" :default-value="true">
      <Icon icon="lucide:heart" />
    </Toggle>
    <Toggle variant="ghost">
      <Icon icon="lucide:heart" />
    </Toggle>
  </div>
</template>
