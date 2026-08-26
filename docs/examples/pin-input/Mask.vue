<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '#components'
</script>

<template>
  <PinInputRoot mask placeholder="•">
    <PinInputInput v-for="index in 4" :key="index" :index="index - 1" />
  </PinInputRoot>
</template>
