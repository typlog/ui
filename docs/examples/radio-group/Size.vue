<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroupRoot, RadioGroupItem } from '#components'

const selected = ref<string>('1')
</script>

<template>
  <div class="flex flex-col gap-4">
    <RadioGroupRoot
      v-model="selected"
      class="flex flex-col gap-2"
      size="1"
    >
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

    <RadioGroupRoot
      v-model="selected"
      class="flex flex-col gap-2"
      size="2"
    >
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

    <RadioGroupRoot
      v-model="selected"
      class="flex flex-col gap-2"
      size="3"
    >
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
