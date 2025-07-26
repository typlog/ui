<script lang="ts">
import type {
  DropdownMenuItemProps as RekaDropdownMenuItemProps,
  DropdownMenuItemEmits,
} from 'reka-ui'
import type { ColorType } from '../types'

export interface DropdownMenuItemProps extends RekaDropdownMenuItemProps {
  color?: ColorType
  shortcut?: string
}
</script>

<script setup lang="ts">
import { useForwardExpose, DropdownMenuItem } from 'reka-ui'
import { injectDropdownMenuContentContext } from './DropdownMenuContent.vue'
import { useForwardPropsEmitsWithout } from '../util'

const props = defineProps<DropdownMenuItemProps>()
const emits = defineEmits<DropdownMenuItemEmits>()

const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'shortcut'])

useForwardExpose()

const rootContext = injectDropdownMenuContentContext()
</script>

<template>
  <DropdownMenuItem
    class="ui-MenuItem"
    :data-accent-color="props.color"
    :data-variant="rootContext.variant.value"
    :data-high-contrast="rootContext.highContrast?.value || undefined"
    v-bind="forwarded"
  >
    <slot></slot>
    <div
      v-if="props.shortcut"
      class="ui-MenuShortcut"
      v-text="props.shortcut"
    ></div>
  </DropdownMenuItem>
</template>

<style>
.ui-MenuItem {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: var(--menu-item-height);
  padding-left: var(--menu-item-padding-left);
  padding-right: var(--menu-item-padding-right);
  box-sizing: border-box;
  position: relative;
  outline: none;
  scroll-margin: var(--menu-content-padding) 0;
  user-select: none;
  cursor: default;
  color: var(--gray-12);
  font-size: var(--menu-item-font-size);
  line-height: var(--menu-item-line-height);
  letter-spacing: var(--menu-item-letter-spacing);
  border-radius: var(--menu-item-border-radius);
}

.ui-MenuShortcut {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: var(--space-4);
  color: var(--gray-a11);
}

.ui-MenuItem:where([data-accent-color]) {
  color: var(--accent-a11);
}

.ui-MenuItem:where([data-disabled]) {
  color: var(--gray-a8);
}

.ui-MenuItem:where([data-highlighted]) {
  background-color: var(--menu-item-highlighted-background-color);
  color: var(--menu-item-highlighted-text-color);
}

.ui-MenuItem:where([data-disabled], [data-highlighted]) :where(.ui-MenuShortcut) {
  color: inherit;
}
</style>
