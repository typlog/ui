<script lang="ts">
import type { SelectContentProps as _SelectContentProps } from 'radix-vue'
import type { ColorType } from './types'

export interface SelectContentProps extends _SelectContentProps {
  variant?: 'solid' | 'soft'
  color?: ColorType
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { inject } from 'vue'
import {
  SelectPortal,
  SelectContent,
  SelectViewport,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  useForwardExpose,
  useForwardProps,
} from 'radix-vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectContentProps>(), {
  variant: 'solid',
})
const forwarded = useForwardProps(props)

const size = inject('SelectRoot.size')

const { forwardRef } = useForwardExpose()
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{
        ...$attrs,
        ...forwarded,
        color: undefined,
        variant: undefined,
        highContrast: undefined,
      }"
      :ref="forwardRef"
      class="ui-SelectContent"
      :class="{'ui-PopperContent': props.position === 'popper'}"
      :data-variant="props.variant"
      :data-size="size"
      :data-accent-color="props.color"
      :data-high-contrast="props.highContrast"
    >
      <ScrollAreaRoot
        type="auto"
        class="ui-ScrollArea"
      >
        <SelectViewport
          class="ui-SelectViewport"
          as-child
        >
          <ScrollAreaViewport class="ui-ScrollAreaViewport">
            <slot></slot>
          </ScrollAreaViewport>
          <div class="ui-ScrollAreaViewportFocusRing"></div>
          <ScrollAreaScrollbar
            class="ui-ScrollAreaScrollbar"
            :data-size="1"
            orientation="vertical"
          >
            <ScrollAreaThumb class="ui-ScrollAreaThumb" />
          </ScrollAreaScrollbar>
        </SelectViewport>
      </ScrollAreaRoot>
    </SelectContent>
  </SelectPortal>
</template>

<style>
.ui-SelectContent {
  --scrollarea-scrollbar-vertical-margin-top: var(--select-content-padding);
  --scrollarea-scrollbar-vertical-margin-bottom: var(--select-content-padding);
  --scrollarea-scrollbar-horizontal-margin-left: var(--select-content-padding);
  --scrollarea-scrollbar-horizontal-margin-right: var(--select-content-padding);

  overflow: hidden;
  box-shadow: var(--shadow-5);
  background-color: var(--color-panel-solid);
}

.ui-SelectContent:where([data-side]) {
  min-width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  transform-origin: var(--radix-select-content-transform-origin);
}

.ui-SelectViewport {
  box-sizing: border-box;
  padding: var(--select-content-padding);
}

.ui-SelectContent:has(.ui-ScrollAreaScrollbar[data-orientation='vertical']) .ui-SelectViewport {
  padding-right: var(--space-3);
}

.ui-SelectContent[data-size="1"] {
  --select-content-padding: var(--space-1);
  --select-item-height: var(--space-5);
  --select-item-indicator-width: calc(var(--space-5) / 1.2);
  --select-separator-margin-right: var(--space-2);
  border-radius: var(--radius-3);
}
.ui-SelectContent[data-size="2"],
.ui-SelectContent[data-size="3"] {
  --select-content-padding: var(--space-2);
  --select-item-height: var(--space-6);
  --select-item-indicator-width: var(--space-5);
  --select-separator-margin-right: var(--space-3);
  border-radius: var(--radius-4);
}
</style>
