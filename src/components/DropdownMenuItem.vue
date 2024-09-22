<script lang="ts">
import type {
  DropdownMenuItemProps as _DropdownMenuItemProps,
  DropdownMenuItemEmits,
} from 'radix-vue'
import type { ColorType } from './types'

export interface DropdownMenuItemProps extends _DropdownMenuItemProps {
  color?: ColorType
  shortcut?: string
}
</script>

<script setup lang="ts">
import { useForwardExpose } from 'radix-vue'
import { DropdownMenuItem } from 'radix-vue'
import { injectDropdownMenuContentContext } from './DropdownMenuContent.vue'
import { useForwardPropsEmits } from './util'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DropdownMenuItemProps>()
const emits = defineEmits<DropdownMenuItemEmits>()

const forwarded = useForwardPropsEmits(props, emits, ['color', 'shortcut'])

useForwardExpose()

const rootContext = injectDropdownMenuContentContext()
</script>

<template>
  <DropdownMenuItem
    class="ui-MenuItem"
    :data-accent-color="forwarded.color"
    :data-size="rootContext.size.value"
    :data-variant="rootContext.variant.value"
    :data-high-contrast="rootContext.highContrast?.value || undefined"
    v-bind="{...$attrs, ...forwarded}"
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
  color: var(--gray-a11);
}

.ui-MenuShortcut {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: var(--space-4);
}

.ui-MenuItem:where([data-accent-color]) {
  color: var(--accent-a11);
}

.ui-MenuItem:where([data-disabled]) {
  color: var(--gray-a8);
}

.ui-MenuItem:where([data-disabled], [data-highlighted]) :where(.ui-MenuShortcut) {
  color: inherit;
}

.ui-MenuItem:where([data-size="1"]) {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  border-radius: var(--radius-1);
}
.ui-MenuItem:where([data-size="2"]) {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  border-radius: var(--radius-2);
}

.ui-MenuItem:where([data-variant="solid"]):where([data-highlighted]) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
.ui-MenuItem:where([data-variant="solid"]):where([data-high-contrast]):where([data-highlighted]) {
  background-color: var(--accent-12);
  color: var(--accent-1);
}
.ui-MenuItem:where([data-variant="soft"]):where([data-highlighted]) {
  background-color: var(--accent-a4);
}
</style>
