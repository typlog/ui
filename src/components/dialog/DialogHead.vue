<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DialogTitle, DialogClose } from 'reka-ui'
import IconButton from '../button/IconButton.vue'
import Inset from '../inset/Inset.vue'

const props = defineProps<{title: string}>()
</script>

<template>
  <Inset
    class="ui-DialogHead"
    side="x"
  >
    <DialogTitle>{{ props.title }}</DialogTitle>
    <IconButton
      :as="DialogClose"
      type="button"
      variant="ghost"
      color="gray"
      aria-label="Close"
    >
      <Icon icon="lucide:x" />
    </IconButton>
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
