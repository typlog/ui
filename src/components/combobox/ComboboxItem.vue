<script setup lang="ts">
import {
  ComboboxItem,
  ComboboxItemIndicator,
  useForwardProps,
  type ComboboxItemProps,
} from 'reka-ui'
import CheckIcon from '~icons/radix-icons/check'

const props = defineProps<ComboboxItemProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ComboboxItem
    class="ui-ComboboxItem"
    v-bind="forwarded"
  >
    <ComboboxItemIndicator class="ui-ComboboxItemIndicator">
      <CheckIcon />
    </ComboboxItemIndicator>
    <slot></slot>
  </ComboboxItem>
</template>


<style>
.ui-ComboboxItem {
  display: flex;
  align-items: center;
  height: var(--combobox-item-height);
  padding-left: var(--combobox-indicator-width);
  padding-right: var(--combobox-indicator-width);
  position: relative;
  box-sizing: border-box;
  outline: none;
  scroll-margin: var(--combobox-content-padding) 0;
  user-select: none;
  cursor: default;

  font-size: var(--combobox-item-font-size);
  line-height: var(--combobox-item-line-height);
  letter-spacing: var(--combobox-item-letter-spacing);
  border-radius: var(--combobox-item-radius);
}

.ui-ComboboxItem:where([data-disabled]) {
  cursor: not-allowed;
}

.ui-ComboboxItem:where([data-disabled]) {
  color: var(--gray-a8);
}

.ui-ComboboxItem:where([data-highlighted]) {
  background-color: var(--combobox-highlighted-background-color);
  color: var(--combobox-highlighted-text-color);
}

.ui-ComboboxItemIndicator {
  position: absolute;
  left: 0;
  width: var(--combobox-indicator-width);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ui-ComboboxItemIndicatorIcon {
  width: var(--combobox-indicator-icon-width);
  height: var(--combobox-indicator-icon-height);
}
</style>
