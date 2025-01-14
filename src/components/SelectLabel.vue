<script lang="ts">
import type { SelectLabelProps } from 'reka-ui'
</script>

<script setup lang="ts">
import {
  SelectLabel,
  useForwardExpose,
  useForwardProps,
} from 'reka-ui'

const props = defineProps<SelectLabelProps>()
const forwarded = useForwardProps(props)

useForwardExpose()
</script>

<template>
  <SelectLabel
    class="ui-SelectLabel"
    v-bind="forwarded"
  >
    <slot></slot>
  </SelectLabel>
</template>

<style>
.ui-SelectLabel {
  display: flex;
  align-items: center;
  height: var(--select-item-height);
  padding-left: var(--select-item-indicator-width);
  padding-right: var(--select-item-indicator-width);
  color: var(--gray-a10);
  user-select: none;
  cursor: default;
}
.ui-SelectItem + .ui-SelectLabel {
  margin-top: var(--space-2);
}
:where(.r-size-1) .ui-SelectLabel {
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-1);
  line-height: var(--line-height-1);
}
:where(.r-size-2) .ui-SelectLabel,
:where(.r-size-3) .ui-SelectLabel {
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
  line-height: var(--line-height-2);
}
</style>
