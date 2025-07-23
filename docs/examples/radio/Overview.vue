<script setup lang="ts">
import { ref } from 'vue'
import { Radio } from '#components'

const checked = ref('1')
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="flex items-center gap-2">
      <Radio v-model="checked" value="1" />
      <span>Default layout</span>
    </label>
    <label class="flex items-center gap-2">
      <Radio v-model="checked" value="2" />
      <span>Simple layout</span>
    </label>
    <label class="flex items-center gap-2">
      <Radio v-model="checked" value="3" />
      <span>Compact layout</span>
    </label>
  </div>
</template>
