<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '#components'

const checked = ref(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <Checkbox v-model="checked" />
    <span>Agree to Terms and Conditions</span>
  </label>
</template>
