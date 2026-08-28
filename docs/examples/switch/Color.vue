<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@typlog/ui'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch v-model="checked" color="indigo" />
    <Switch v-model="checked" color="cyan" />
    <Switch v-model="checked" color="orange" />
    <Switch v-model="checked" color="crimson" />
    <Switch v-model="checked" color="gray" />
  </div>
</template>
