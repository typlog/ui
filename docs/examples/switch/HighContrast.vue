<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch v-model="checked" color="indigo" high-contrast />
    <Switch v-model="checked" color="cyan" high-contrast />
    <Switch v-model="checked" color="orange" high-contrast />
    <Switch v-model="checked" color="crimson" high-contrast />
    <Switch v-model="checked" color="gray" high-contrast />
  </div>
</template>
