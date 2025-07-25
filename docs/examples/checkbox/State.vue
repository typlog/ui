<script setup lang="ts">
import { Checkbox } from '#components'
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox />
    <Checkbox default-value="indeterminate" />
    <Checkbox :default-value="true" />
  </div>
</template>
