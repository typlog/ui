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
  padding-left: var(--combobox-item-indicator-width);
  padding-right: var(--combobox-item-indicator-width);
  position: relative;
  box-sizing: border-box;
  outline: none;
  scroll-margin: var(--combobox-content-padding) 0;
  user-select: none;
  cursor: default;
}

.ui-ComboboxItem:where([data-disabled]) {
  cursor: not-allowed;
}

.ui-ComboboxItemIndicator {
  position: absolute;
  left: 0;
  width: var(--combobox-item-indicator-width);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ui-ComboboxItem:where([data-disabled]) {
  color: var(--gray-a8);
}

:where(.r-size-1) .ui-ComboboxItem {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  border-radius: var(--radius-1);
}

:where(.r-size-1) .ui-ComboboxItemIndicatorIcon {
  width: calc(8px * var(--scaling));
  height: calc(8px * var(--scaling));
}

:where(.r-size-2) .ui-ComboboxItem {
  line-height: var(--line-height-2);
  border-radius: var(--radius-2);
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
}

:where(.r-size-2) .ui-ComboboxItemIndicatorIcon,
:where(.r-size-3) .ui-ComboboxItemIndicatorIcon {
  width: calc(10px * var(--scaling));
  height: calc(10px * var(--scaling));
}

:where(.r-size-3) .ui-ComboboxItem {
  line-height: var(--line-height-2);
  border-radius: var(--radius-2);
  font-size: var(--font-size-3);
  letter-spacing: var(--letter-spacing-3);
}

:where(.r-variant-solid) .ui-ComboboxItem[data-highlighted] {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
:where(.r-variant-solid):where(.r-high-contrast) .ui-ComboboxItem[data-highlighted] {
  background-color: var(--accent-12);
  color: var(--accent-1);
}
:where(.r-variant-soft) .ui-ComboboxItem[data-highlighted] {
  background-color: var(--accent-a4);
}
</style>
