<script setup lang="ts">
import { ref } from 'vue'
import { Radio } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Radio v-model="checked" size="1" />
    <Radio v-model="checked" size="2" />
    <Radio v-model="checked" size="3" />
  </div>
</template>
