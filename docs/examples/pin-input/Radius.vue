<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '@typlog/ui'
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <PinInputRoot radius="none">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot radius="small">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot radius="medium">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot radius="large">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot radius="full">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
  </div>
</template>
