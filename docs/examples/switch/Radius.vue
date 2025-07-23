<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch radius="none" v-model="checked" />
    <Switch radius="small" v-model="checked" />
    <Switch radius="full" v-model="checked" />
  </div>
</template>
