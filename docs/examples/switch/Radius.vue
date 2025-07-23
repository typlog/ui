<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch v-model="checked" radius="none" />
    <Switch v-model="checked" radius="small" />
    <Switch v-model="checked" radius="full" />
  </div>
</template>
