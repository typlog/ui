<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '@typlog/ui'
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <PinInputRoot color="indigo">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot color="green" variant="soft">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
    <PinInputRoot color="red" variant="surface">
      <PinInputInput v-for="index in 6" :key="index" :index="index - 1" />
    </PinInputRoot>
  </div>
</template>
