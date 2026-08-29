<script setup lang="ts">
import { ref } from 'vue'
import { Button, DrawerClose, DrawerDescription, DrawerPopup, DrawerRoot, DrawerTitle, DrawerTrigger } from '@typlog/ui'

const snapPoint = ref<number | string | null>(0.5)
</script>

<template>
  <DrawerRoot v-model:snap-point="snapPoint" :snap-points="[0.25, 0.5, 1]">
    <DrawerTrigger as-child>
      <Button>Open with snap points</Button>
    </DrawerTrigger>
    <DrawerPopup>
      <DrawerTitle>Resizable drawer</DrawerTitle>
      <DrawerDescription>Drag the handle to move between snap points.</DrawerDescription>
      <p class="mt-4">Current snap point: {{ snapPoint }}</p>
      <Button class="mt-4" variant="soft" color="gray" :as="DrawerClose">Close</Button>
    </DrawerPopup>
  </DrawerRoot>
</template>
