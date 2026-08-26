<script setup lang="ts">
import { PinInputInput, PinInputRoot } from '#components'
</script>

<template>
  <PinInputRoot>
    <PinInputInput v-for="index in 3" :key="index" :index="index - 1" />
    <span aria-hidden="true" class="px-1 text-gray-10">—</span>
    <PinInputInput v-for="index in 3" :key="`second-${index}`" :index="index + 2" />
  </PinInputRoot>
</template>
