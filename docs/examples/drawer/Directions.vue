<script setup lang="ts">
import { Button, DrawerRoot, DrawerTrigger, DrawerPopup, DrawerTitle } from '@typlog/ui'

const directions = ['down', 'up', 'left', 'right'] as const
</script>
<template>
  <div class="flex flex-wrap gap-2">
    <DrawerRoot v-for="direction in directions" :key="direction" :swipe-direction="direction">
      <DrawerTrigger as-child>
        <Button variant="soft" color="gray">{{ direction }}</Button>
      </DrawerTrigger>
      <DrawerPopup>
        <DrawerTitle>{{ direction }} drawer</DrawerTitle>
        <p class="mt-3">Swipe or press Escape to close.</p>
      </DrawerPopup>
    </DrawerRoot>
  </div>
</template>
