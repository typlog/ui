<script setup lang="ts">
import type { ToggleGroupItemProps } from 'reka-ui'
import { ToggleGroupItem, useForwardProps } from 'reka-ui'

const props = defineProps<ToggleGroupItemProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <ToggleGroupItem
    v-bind="forwarded"
    class="ui-ToggleGroupItem"
  >
    <slot></slot>
  </ToggleGroupItem>
</template>

<style>
.ui-ToggleGroupItem {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  flex-shrink: 0;
  width: var(--toggle-item-size);
  height: var(--toggle-item-size);
}
.ui-ToggleGroupRoot:where(.r-variant-solid, .r-variant-surface, .r-variant-outline) :where(.ui-ToggleGroupItem:first-child) {
  border-top-left-radius: var(--toggle-radius);
  border-bottom-left-radius: var(--toggle-radius);
}
.ui-ToggleGroupRoot:where(.r-variant-solid, .r-variant-surface, .r-variant-outline) :where(.ui-ToggleGroupItem:last-child) {
  border-top-right-radius: var(--toggle-radius);
  border-bottom-right-radius: var(--toggle-radius);
}
.ui-ToggleGroupRoot:where(.r-variant-soft, .r-variant-ghost) :where(.ui-ToggleGroupItem) {
  border-radius: var(--toggle-radius);
}

/** soft */
@media (hover: hover) {
  .ui-ToggleGroupRoot:where(.r-variant-soft) :where(.ui-ToggleGroupItem:hover) {
    background-color: var(--accent-a2);
  }
}
.ui-ToggleGroupRoot:where(.r-variant-soft) :where(.ui-ToggleGroupItem:focus-visible) {
  outline: 2px solid var(--accent-8);
  outline-offset: -1px;
}
.ui-ToggleGroupRoot:where(.r-variant-soft) :where(.ui-ToggleGroupItem[data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}
.ui-ToggleGroupRoot:where(.r-variant-soft) :where(.ui-ToggleGroupItem[data-state="on"]) {
  background-color: var(--accent-a4);
}

/** solid, surface ghost */
@media (hover: hover) {
  .ui-ToggleGroupRoot:where(.r-variant-solid, .r-variant-surface, .r-variant-outline, .r-variant-ghost) :where(.ui-ToggleGroupItem:hover) {
    background-color: var(--accent-a3);
  }
}
:where(.ui-ToggleGroupRoot.r-variant-surface, .r-variant-outline) .ui-ToggleGroupItem + .ui-ToggleGroupItem {
  box-shadow: -1px 0 0 0 var(--gray-a4);
}

.ui-ToggleGroupRoot:where(.r-variant-solid, .r-variant-surface, .r-variant-outoine, .r-variant-ghost) :where(.ui-ToggleGroupItem:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-ToggleGroupRoot:where(.r-variant-solid) :where(.ui-ToggleGroupItem[data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}
.ui-ToggleGroupRoot:where(.r-variant-surface, .r-variant-outline) :where(.ui-ToggleGroupItem[data-disabled]) {
  color: var(--gray-a8);
}
.ui-ToggleGroupRoot:where(.r-variant-ghost) :where(.ui-ToggleGroupItem[data-disabled]) {
  color: var(--gray-a8);
  background-color: transparent;
}
.ui-ToggleGroupRoot:where(.r-variant-solid) :where(.ui-ToggleGroupItem[data-state="on"]) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
  box-shadow: var(--shadow-1);
}
.ui-ToggleGroupRoot:where(.r-variant-surface) :where(.ui-ToggleGroupItem[data-state="on"]) {
  background-color: var(--accent-a3);
  color: var(--accent-a11);
}
.ui-ToggleGroupRoot:where(.r-variant-outline) :where(.ui-ToggleGroupItem[data-state="on"]) {
  color: var(--accent-a11);
}
.ui-ToggleGroupRoot:where(.r-variant-ghost) :where(.ui-ToggleGroupItem[data-state="on"]) {
  background-color: var(--accent-a4);
}
.ui-ToggleGroupRoot:where(.r-variant-solid, .r-variant-ghost):where(.r-high-contrast) :where(.ui-ToggleGroupItem[data-state="on"]) {
  background-color: var(--accent-12);
  color: var(--gray-1);
}
</style>
