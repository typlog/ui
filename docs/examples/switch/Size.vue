<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch v-model="checked" size="1" />
    <Switch v-model="checked" size="2" />
    <Switch v-model="checked" size="3" />
  </div>
</template>
