<script lang="ts">
import type { ComboboxLabelProps } from 'reka-ui'
</script>

<script setup lang="ts">
import {
  ComboboxLabel,
  useForwardExpose,
  useForwardProps,
} from 'reka-ui'

const props = defineProps<ComboboxLabelProps>()
const forwarded = useForwardProps(props)

useForwardExpose()
</script>

<template>
  <ComboboxLabel
    class="ui-ComboboxLabel"
    v-bind="forwarded"
  >
    <slot></slot>
  </ComboboxLabel>
</template>


<style>
.ui-ComboboxLabel {
  display: flex;
  align-items: center;
  height: var(--combobox-item-height);
  padding-left: calc(var(--combobox-item-indicator-width) / 2);
  padding-right: var(--combobox-item-indicator-width);
  color: var(--gray-a10);
  user-select: none;
  cursor: default;
}
.ui-SelectItem + .ui-ComboboxLabel {
  margin-top: var(--space-2);
}
:where(.r-size-1) .ui-ComboboxLabel {
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-1);
  line-height: var(--line-height-1);
}
:where(.r-size-2) .ui-ComboboxLabel,
:where(.r-size-3) .ui-ComboboxLabel {
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
  line-height: var(--line-height-2);
}
</style>
