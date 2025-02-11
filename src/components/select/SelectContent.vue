<script lang="ts">
import type { SelectContentProps as _SelectContentProps } from 'reka-ui'

export interface SelectContentProps extends _SelectContentProps {
  to?: string | HTMLElement
  variant?: 'solid' | 'soft'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
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
} from 'reka-ui'
import { injectSelectRootContext } from './SelectRoot.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SelectContentProps>(), {
  variant: 'solid',
})
const forwarded = useForwardProps(props)
const { forwardRef } = useForwardExpose()

const context = injectSelectRootContext()

const contentClass = computed(() => {
  const rv = ['r-size-' + context.size.value, 'r-variant-' + props.variant]
  if (context.highContrast.value) {
    rv.push('r-high-contrast')
  }
  if (props.position === 'popper') {
    rv.push('ui-PopperContent')
  }
  return rv
})
</script>

<template>
  <SelectPortal :to="props.to">
    <SelectContent
      :ref="forwardRef"
      v-bind="{
        ...$attrs,
        ...forwarded,
        to: undefined,
        variant: undefined,
      }"
      class="ui-SelectContent"
      :class="contentClass"
      :data-accent-color="context.color.value"
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
  box-sizing: border-box;
}

.ui-SelectContent:where([data-side]) {
  min-width: var(--reka-select-trigger-width);
  max-width: var(--reka-select-content-available-width);
  max-height: var(--reka-select-content-available-height);
  transform-origin: var(--reka-select-content-transform-origin);
}

.ui-SelectViewport {
  box-sizing: border-box;
  padding: var(--select-content-padding);
}

.ui-SelectContent:has(.ui-ScrollAreaScrollbar[data-orientation='vertical']) .ui-SelectViewport {
  padding-right: var(--space-3);
}

.ui-SelectContent:where(.r-size-1) {
  --select-content-padding: var(--space-1);
  --select-item-height: var(--space-5);
  --select-item-indicator-width: calc(var(--space-5) / 1.2);
  --select-separator-margin-right: var(--space-2);
  border-radius: var(--radius-3);
}
.ui-SelectContent:where(.r-size-2),
.ui-SelectContent:where(.r-size-3) {
  --select-content-padding: var(--space-2);
  --select-item-height: var(--space-6);
  --select-item-indicator-width: var(--space-5);
  --select-separator-margin-right: var(--space-3);
  border-radius: var(--radius-4);
}
</style>
