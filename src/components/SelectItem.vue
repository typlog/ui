<script lang="ts">
import type { SelectItemProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardExpose,
  useForwardProps,
} from 'reka-ui'

const props = defineProps<SelectItemProps>()
const forwarded = useForwardProps(props)

useForwardExpose()
</script>

<template>
  <SelectItem
    class="ui-SelectItem"
    v-bind="forwarded"
  >
    <SelectItemIndicator class="ui-SelectItemIndicator">
      <Icon icon="radix-icons:check" />
    </SelectItemIndicator>
    <SelectItemText>
      <slot></slot>
    </SelectItemText>
  </SelectItem>
</template>

<style>
.ui-SelectItem {
  display: flex;
  align-items: center;
  height: var(--select-item-height);
  padding-left: var(--select-item-indicator-width);
  padding-right: var(--select-item-indicator-width);
  position: relative;
  box-sizing: border-box;
  outline: none;
  scroll-margin: var(--select-content-padding) 0;
  user-select: none;
  cursor: default;
}

.ui-SelectItem:where([data-disabled]) {
  cursor: not-allowed;
}

.ui-SelectItemIndicator {
  position: absolute;
  left: 0;
  width: var(--select-item-indicator-width);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ui-SelectItem:where([data-disabled]) {
  color: var(--gray-a8);
}

.ui-SelectContent[data-size="1"] .ui-SelectItem {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  border-radius: var(--radius-1);
}

.ui-SelectContent[data-size="1"] .ui-SelectItemIndicatorIcon {
  width: calc(8px * var(--scaling));
  height: calc(8px * var(--scaling));
}

.ui-SelectContent[data-size="2"] .ui-SelectItem {
  line-height: var(--line-height-2);
  border-radius: var(--radius-2);
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-2);
}

.ui-SelectContent[data-size="2"] .ui-SelectItemIndicatorIcon,
.ui-SelectContent[data-size="3"] .ui-SelectItemIndicatorIcon {
  width: calc(10px * var(--scaling));
  height: calc(10px * var(--scaling));
}

.ui-SelectContent[data-size="3"] .ui-SelectItem {
  line-height: var(--line-height-2);
  border-radius: var(--radius-2);
  font-size: var(--font-size-3);
  letter-spacing: var(--letter-spacing-3);
}

.ui-SelectContent:where([data-variant="solid"]) .ui-SelectItem[data-highlighted] {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
.ui-SelectContent:where([data-variant="solid"]):where([data-high-contrast="true"]) .ui-SelectItem[data-highlighted] {
  background-color: var(--accent-12);
  color: var(--accent-1);
}

.ui-SelectContent:where([data-variant="soft"]) .ui-SelectItem[data-highlighted] {
  background-color: var(--accent-a4);
}
</style>
