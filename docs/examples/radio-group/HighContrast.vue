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
      variant="soft"
      color="gray"
      high-contrast
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
      variant="soft"
      high-contrast
    >
      <RadioGroupItem color="green" value="1">
        Default layout
      </RadioGroupItem>
      <RadioGroupItem color="orange" value="2">
        Simple layout
      </RadioGroupItem>
      <RadioGroupItem color="red" value="3">
        Compact layout
      </RadioGroupItem>
    </RadioGroupRoot>

    <RadioGroupRoot
      v-model="selected"
      class="flex flex-col gap-2"
      variant="soft"
      high-contrast
    >
      <RadioGroupItem color="jade" value="1">
        Default layout
      </RadioGroupItem>
      <RadioGroupItem color="iris" value="2">
        Simple layout
      </RadioGroupItem>
      <RadioGroupItem color="brown" value="3">
        Compact layout
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>
