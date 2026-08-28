<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '@typlog/ui'

const filled = ['1', '2', '3']
const disabled = ['1', '2', '3']
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <PinInputRoot placeholder="·">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot :model-value="filled">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot disabled :model-value="disabled">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot>
      <PinInputInput v-for="index in 3" :key="index" :index="index - 1" />
      <PinInputInput :index="3" disabled />
      <PinInputInput :index="4" />
      <PinInputInput :index="5" />
    </PinInputRoot>
  </div>
</template>
