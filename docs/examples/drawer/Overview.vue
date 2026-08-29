<script setup lang="ts">
import { ref } from 'vue'
import { Button, DrawerRoot, DrawerTrigger, DrawerPopup, DrawerTitle, DrawerDescription, DrawerCloseButton } from '@typlog/ui'

const open = ref(false)
</script>
<template>
  <DrawerRoot v-model:open="open">
    <DrawerTrigger as-child>
      <Button>Open drawer</Button>
    </DrawerTrigger>
    <DrawerPopup>
      <DrawerTitle>Share this page</DrawerTitle>
      <DrawerDescription>Choose where you want to share this page.</DrawerDescription>
      <div class="flex gap-2 mt-5">
        <Button>Copy link</Button>
        <Button variant="soft" color="gray">Share</Button>
      </div>
      <DrawerCloseButton />
    </DrawerPopup>
  </DrawerRoot>
</template>
