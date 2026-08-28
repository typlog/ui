<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroupRoot, RadioGroupItem } from '@typlog/ui'

const selected = ref<string>('1')
</script>

<template>
  <div class="flex flex-col gap-4">
    <RadioGroupRoot
      v-model="selected"
      class="flex flex-col gap-2"
      variant="soft"
      color="gray"
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
      color="green"
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
    >
      <RadioGroupItem color="violet" value="1">
        Default layout
      </RadioGroupItem>
      <RadioGroupItem color="crimson" value="2">
        Simple layout
      </RadioGroupItem>
      <RadioGroupItem color="bronze" value="3">
        Compact layout
      </RadioGroupItem>
    </RadioGroupRoot>
  </div>
</template>
