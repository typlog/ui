<script setup lang="ts">
import {
  Icon,
  Button,
  DialogRoot,
  DialogTrigger,
  DialogTitle,
  DialogClose,
  DialogPopup,
} from '#components'
import { IconifyCollection } from '#addons'

const onSelectIcon = (icon: string) => {
  console.info('select:', icon)
}
</script>

<template>
  <DialogRoot>
    <Button :as="DialogTrigger">Choose an icon</Button>
    <DialogPopup size="5" class="h-(--dialog-popup-max-height)">
      <div class="py-2 px-4 w-full flex items-center justify-between bg-gray-2 border-b sticky top-0">
        <DialogTitle>Choose an icon from iconify</DialogTitle>
        <Button variant="ghost" color="gray" :as="DialogClose">
          <Icon icon="lucide:x" />
        </Button>
      </div>
      <div class="p-4">
        <IconifyCollection @select="onSelectIcon" />
      </div>
    </DialogPopup>
  </DialogRoot>
</template>
