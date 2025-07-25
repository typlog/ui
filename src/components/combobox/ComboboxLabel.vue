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
  padding-left: calc(var(--combobox-indicator-width) / 2);
  padding-right: var(--combobox-indicator-width);
  color: var(--gray-a10);
  user-select: none;
  cursor: default;

  font-size: var(--combobox-label-font-size);
  letter-spacing: var(--combobox-label-letter-spacing);
  line-height: var(--combobox-label-line-height);
}
.ui-SelectItem + .ui-ComboboxLabel {
  margin-top: var(--space-2);
}
</style>
