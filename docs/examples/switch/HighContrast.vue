<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch color="indigo" high-contrast v-model="checked" />
    <Switch color="cyan" high-contrast v-model="checked" />
    <Switch color="orange" high-contrast v-model="checked" />
    <Switch color="crimson" high-contrast v-model="checked" />
    <Switch color="gray" high-contrast v-model="checked" />
  </div>
</template>
