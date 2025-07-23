<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroupRoot, RadioGroupItem } from '#components'

const selected = ref<string>('1')
</script>

<template>
  <div class="flex">
    <RadioGroupRoot class="flex flex-col gap-2" v-model="selected">
      <RadioGroupItem value="1">
        Default layout
      </RadioGroupItem>
      <RadioGroupItem value="2">
        Simple layout
      </RadioGroupItem>
      <RadioGroupItem value="3">
        Compact layout
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>
