<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '#components'
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <PinInputRoot size="1">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot size="2">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot size="3">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
  </div>
</template>
