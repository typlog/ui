<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DialogTitle, DialogClose } from 'reka-ui'
import Button from './Button.vue'
import Inset from './Inset.vue'

const props = defineProps<{title: string}>()
</script>

<template>
  <Inset
    class="ui-DialogHead"
    side="x"
  >
    <DialogTitle class="font-semibold">{{ props.title }}</DialogTitle>
    <Button
      :as="DialogClose"
      type="button"
      variant="ghost"
      color="gray"
      radius="full"
      style="--button-ghost-padding-x: var(--space-1)"
    >
      <Icon icon="lucide:x" />
    </Button>
  </Inset>
</template>

<style>
.ui-DialogHead {
  position: sticky;
  top: calc(0px - var(--inset-padding-top-calc));
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: calc(0px - var(--inset-padding-top-calc));
  padding: calc(var(--dialog-content-padding) / 2) var(--dialog-content-padding);
  border-bottom: 1px solid var(--gray-a4);
  background-color: var(--color-background);
  z-index: 1;
}
</style>
