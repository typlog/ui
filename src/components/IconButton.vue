<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import Button from './Button.vue'
import type { ButtonProps } from './Button.vue'

const props = defineProps<ButtonProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <Button
    class="ui-IconButton"
    v-bind="forwarded"
  >
    <slot></slot>
  </Button>
</template>

<style>
.ui-IconButton:where(:not(.r-variant-ghost)) {
  height: var(--button-height);
  width: var(--button-height);
  padding: 0;
}

.ui-IconButton:where(.r-variant-ghost) {
  padding: var(--icon-button-ghost-padding);
}

.ui-IconButton:where(.r-size-1) {
  --icon-button-ghost-padding: var(--space-1);
}
.ui-IconButton:where(.r-size-2) {
  --icon-button-ghost-padding: calc(var(--space-1) * 1.5);
}
.ui-IconButton:where(.r-size-3) {
  --icon-button-ghost-padding: var(--space-2);
}
.ui-IconButton:where(.r-size-4) {
  --icon-button-ghost-padding: var(--space-3);
}
</style>
