<script lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'

export type RadioTabsItemProps = RadioGroupItemProps
</script>

<script setup lang="ts">
import { RadioGroupItem, useForwardProps } from 'reka-ui'

const props = defineProps<RadioTabsItemProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <RadioGroupItem
    class="ui-RadioTabsItem"
    v-bind="forwarded"
  >
    <slot></slot>
  </RadioGroupItem>
</template>

<style>
.ui-RadioTabsItem {
  display: inline-flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  color: var(--gray-a11);
  padding: var(--radio-tabs-item-padding);
  border-radius: var(--radio-tabs-item-radius);
}

.ui-RadioTabsItem:where([data-state="unchecked"]) {
  letter-spacing: var(--tab-inactive-letter-spacing);
  word-spacing: var(--tab-inactive-word-spacing);
}

.ui-RadioTabsItem:where([data-state="checked"]) {
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tab-active-letter-spacing);
  word-spacing: var(--tab-active-word-spacing);
}

.ui-RadioTabsRoot:where(.r-variant-classic) :where(.ui-RadioTabsItem[data-state="checked"]) {
  color: var(--gray-12);
  background-color: var(--color-background);
  box-shadow: var(--shadow-2);
}

.ui-RadioTabsRoot:where(.r-variant-soft) :where(.ui-RadioTabsItem[data-state="checked"]),
.ui-RadioTabsRoot:where(.r-variant-surface) :where(.ui-RadioTabsItem[data-state="checked"]) {
  color: var(--accent-a11);
  background-color: var(--accent-a3);
}

@media (hover: hover) {
  :where(.ui-RadioTabsRoot.r-variant-classic) .ui-RadioTabsItem:where(:hover) {
    color: var(--gray-12);
  }
  :where(.ui-RadioTabsRoot.r-variant-classic) .ui-RadioTabsItem:where(:hover) {
    color: var(--gray-12);
  }
}
</style>
