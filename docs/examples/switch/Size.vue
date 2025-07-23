<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch size="1" v-model="checked" />
    <Switch size="2" v-model="checked" />
    <Switch size="3" v-model="checked" />
  </div>
</template>
