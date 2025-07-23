<script setup lang="ts">
import { Switch } from '#components'
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Switch variant="soft" />
      <Switch variant="soft" :default-value="true" />
      <Switch variant="soft" disabled />
      <Switch variant="soft" :default-value="true" disabled />
    </div>
    <div class="flex items-center gap-2">
      <Switch variant="surface" />
      <Switch variant="surface" :default-value="true" />
      <Switch variant="surface" disabled />
      <Switch variant="surface" :default-value="true" disabled />
    </div>
  </div>
</template>
