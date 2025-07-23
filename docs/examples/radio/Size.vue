<script setup lang="ts">
import { ref } from 'vue'
import { Radio } from '#components'

const checked = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Radio size="1" v-model="checked" />
    <Radio size="2" v-model="checked" />
    <Radio size="3" v-model="checked" />
  </div>
</template>
