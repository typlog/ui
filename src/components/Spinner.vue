<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon
    class="ui-Spinner"
    icon="lucide:loader-circle"
  />
</template>

<style>
.ui-Spinner {
  animation: ui-spin 1s linear infinite;
}
</style>
