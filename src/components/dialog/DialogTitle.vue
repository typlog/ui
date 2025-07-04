<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface DialogTitleProps extends PrimitiveProps {
  variant?: 'ghost' | 'surface' | 'solid' | 'outline'
  close?: boolean
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { DialogTitle, DialogClose } from 'reka-ui'
import IconButton from '../button/IconButton.vue'
import Inset from '../inset/Inset.vue'

const props = withDefaults(defineProps<DialogTitleProps>(), {
  as: 'h2',
  variant: 'ghost'
})
</script>

<template>
  <Inset class="ui-DialogTitle" :class="`r-variant-${variant}`" side="all">
    <DialogTitle
      class="ui-DialogTitleText"
      :as="props.as"
    >
      <slot></slot>
    </DialogTitle>
    <DialogClose
      v-if="close"
      class="ui-DialogTitleClose"
      type="button"
      aria-label="Close"
      as-child
    >
      <IconButton color="gray" variant="soft" size="1">
        <Icon icon="lucide:x" />
      </IconButton>
    </DialogClose>
  </Inset>
</template>

<style>
.ui-DialogTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--dialog-content-padding);
  background-color: var(--color-panel-solid);
}
.ui-DialogTitle:where(.r-variant-ghost) {
  margin-bottom: 0;
}
.ui-DialogTitle:where(.r-variant-outline),
.ui-DialogTitle:where(.r-variant-solid) {
  border-bottom: 1px solid var(--gray-a4);
  margin-bottom: var(--dialog-content-padding);
}
.ui-DialogTitle:where(.r-variant-solid),
.ui-DialogTitle:where(.r-variant-surface) {
  background-color: var(--gray-a2);
  margin-bottom: var(--dialog-content-padding);
}
.ui-DialogTitleText {
  flex-grow: 1;
  font-weight: var(--font-weight-medium);
}
</style>
