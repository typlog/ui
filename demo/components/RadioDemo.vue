<script setup lang="ts">
import { ref } from 'vue'
import {
  Radio,
} from '#components'

const value = ref(1)
</script>

<template>
  <div class="mt-2 flex gap-4">
    <div class="flex items-center gap-2">
      <Radio v-model.number="value" value="1" /> 1
    </div>
    <div class="flex items-center gap-2">
      <Radio v-model.number="value" value="2" /> 2
    </div>
    <div class="flex items-center gap-2">
      <Radio v-model.number="value" value="3" /> 3
    </div>
  </div>
</template>
