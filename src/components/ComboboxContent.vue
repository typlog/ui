<script lang="ts">
import type { ComboboxContentProps as _ComboboxContentProps, ComboboxContentEmits } from 'reka-ui'

export interface ComboboxContentProps extends _ComboboxContentProps {
  to?: string | HTMLElement
  variant?: 'solid' | 'soft'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ComboboxPortal,
  ComboboxContent,
  ComboboxViewport,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  useForwardPropsEmits,
  useForwardExpose,
} from 'reka-ui'
import { injectComboboxRootContext } from './ComboboxRoot.vue'

defineOptions({
  inheritAttrs: false,
})
const { forwardRef } = useForwardExpose()

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  variant: 'solid',
  position: 'popper',
})
const emits = defineEmits<ComboboxContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const context = injectComboboxRootContext()

const contentClass = computed(() => {
  const rv = ['r-size-' + context.size.value, 'r-variant-' + props.variant]
  if (context.highContrast.value) {
    rv.push('r-high-contrast')
  }
  return rv
})
</script>

<template>
  <ComboboxPortal :to="props.to">
    <ComboboxContent
      :ref="forwardRef"
      v-bind="{
        ...$attrs,
        ...forwarded,
        position: 'popper',
        to: undefined,
        variant: undefined,
      }"
      class="ui-ComboboxContent"
      :class="contentClass"
      :data-accent-color="context.color.value"
    >
      <ScrollAreaRoot
        type="auto"
        class="ui-ScrollArea"
      >
        <ComboboxViewport
          class="ui-ComboboxViewport"
          as-child
        >
          <ScrollAreaViewport class="ui-ScrollAreaViewport">
            <slot></slot>
          </ScrollAreaViewport>
        </ComboboxViewport>
        <div class="ui-ScrollAreaViewportFocusRing"></div>
        <ScrollAreaScrollbar
          class="ui-ScrollAreaScrollbar"
          :data-size="1"
          orientation="vertical"
        >
          <ScrollAreaThumb class="ui-ScrollAreaThumb" />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </ComboboxContent>
  </ComboboxPortal>
</template>

<style>
.ui-ComboboxContent {
  --scrollarea-scrollbar-vertical-margin-top: var(--combobox-content-padding);
  --scrollarea-scrollbar-vertical-margin-bottom: var(--combobox-content-padding);
  --scrollarea-scrollbar-horizontal-margin-left: var(--combobox-content-padding);
  --scrollarea-scrollbar-horizontal-margin-right: var(--combobox-content-padding);

  overflow: hidden;
  box-shadow: var(--shadow-5);
  background-color: var(--color-panel-solid);
  box-sizing: border-box;
}

.ui-ComboboxContent:where([data-side]) {
  min-width: var(--reka-combobox-trigger-width);
  max-width: var(--reka-combobox-content-available-width);
  max-height: var(--reka-combobox-content-available-height);
  transform-origin: var(--reka-combobox-content-transform-origin);
}

.ui-ComboboxViewport {
  box-sizing: border-box;
  padding: var(--combobox-content-padding);
}

.ui-ComboboxContent:has(.ui-ScrollAreaScrollbar[data-orientation='vertical']) .ui-ComboboxViewport {
  padding-right: var(--space-3);
}

.ui-ComboboxContent:where(.r-size-1) {
  --combobox-content-padding: var(--space-1);
  --combobox-item-height: var(--space-5);
  --combobox-item-indicator-width: calc(var(--space-5) / 1.2);
  --combobox-separator-margin-right: var(--space-2);
  border-radius: var(--radius-3);
}
.ui-ComboboxContent:where(.r-size-2),
.ui-ComboboxContent:where(.r-size-3) {
  --combobox-content-padding: var(--space-2);
  --combobox-item-height: var(--space-6);
  --combobox-item-indicator-width: var(--space-5);
  --combobox-separator-margin-right: var(--space-3);
  border-radius: var(--radius-4);
}
</style>
