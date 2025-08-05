<script lang="ts">
import type {
  ComboboxContentProps as RekaComboboxContentProps,
  ComboboxContentEmits,
} from 'reka-ui'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

export interface ComboboxContentProps extends RekaComboboxContentProps {
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
  sideOffset: 5,
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
  <ComboboxPortal>
    <ThemeWrapper :accent-color="context.color.value">
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
    </ThemeWrapper>
  </ComboboxPortal>
</template>

<style>
.ui-ComboboxContent {
  --scrollarea-scrollbar-vertical-margin-top: var(--combobox-content-padding);
  --scrollarea-scrollbar-vertical-margin-bottom: var(--combobox-content-padding);
  --scrollarea-scrollbar-horizontal-margin-left: var(--combobox-content-padding);
  --scrollarea-scrollbar-horizontal-margin-right: var(--combobox-content-padding);
}

@layer components {
  .ui-ComboboxContent {
    overflow: hidden;
    box-shadow: var(--shadow-5);
    background-color: var(--color-panel-solid);
    box-sizing: border-box;
  }
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

.ui-ComboboxContent:where(:has(.ui-ScrollAreaScrollbar[data-orientation='vertical'])) :where(.ui-ComboboxViewport) {
  padding-right: var(--space-3);
}

.ui-ComboboxContent:where(.r-size-1) {
  --combobox-content-padding: var(--space-1);

  --combobox-item-height: var(--space-5);
  --combobox-item-font-size: var(--font-size-1);
  --combobox-item-line-height: var(--line-height-1);
  --combobox-item-letter-spacing: var(--letter-spacing-1);
  --combobox-item-radius: var(--radius-1);

  --combobox-indicator-width: calc(var(--space-5) / 1.2);
  --combobox-indicator-icon-width: calc(8px * var(--scaling));
  --combobox-indicator-icon-height: calc(8px * var(--scaling));

  --combobox-separator-margin-right: var(--space-2);

  --combobox-label-font-size: var(--font-size-1);
  --combobox-label-letter-spacing: var(--letter-spacing-1);
  --combobox-label-line-height: var(--line-height-1);

  border-radius: var(--radius-3);
}

.ui-ComboboxContent:where(.r-size-2) {
  --combobox-item-font-size: var(--font-size-2);
  --combobox-item-letter-spacing: var(--letter-spacing-2);
}

.ui-ComboboxContent:where(.r-size-3) {
  --combobox-item-font-size: var(--font-size-3);
  --combobox-item-letter-spacing: var(--letter-spacing-3);
}

.ui-ComboboxContent:where(.r-size-2),
.ui-ComboboxContent:where(.r-size-3) {
  --combobox-content-padding: var(--space-2);
  --combobox-item-radius: var(--radius-2);
  --combobox-item-height: var(--space-6);
  --combobox-item-line-height: var(--line-height-2);
  --combobox-indicator-width: var(--space-5);
  --combobox-indicator-icon-width: calc(10px * var(--scaling));
  --combobox-indicator-icon-height: calc(10px * var(--scaling));
  --combobox-separator-margin-right: var(--space-3);

  --combobox-label-font-size: var(--font-size-2);
  --combobox-label-letter-spacing: var(--letter-spacing-2);
  --combobox-label-line-height: var(--line-height-2);

  border-radius: var(--radius-4);
}

.ui-ComboboxContent:where(.r-variant-solid) {
  --combobox-highlighted-background-color: var(--accent-9);
  --combobox-highlighted-text-color: var(--accent-contrast);
}
.ui-ComboboxContent:where(.r-variant-solid.r-high-contrast) {
  --combobox-highlighted-background-color: var(--accent-12);
  --combobox-highlighted-text-color: var(--accent-1);
}
.ui-ComboboxContent:where(.r-variant-soft) {
  --combobox-highlighted-background-color: var(--accent-a3);
  --combobox-highlighted-text-color: var(--accent-a11);
}
.ui-ComboboxContent:where(.r-variant-soft.r-high-contrast) {
  --combobox-highlighted-text-color: var(--accent-12);
}
</style>
