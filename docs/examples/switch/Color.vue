<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch color="indigo" v-model="checked" />
    <Switch color="cyan" v-model="checked" />
    <Switch color="orange" v-model="checked" />
    <Switch color="crimson" v-model="checked" />
    <Switch color="gray" v-model="checked" />
  </div>
</template>
