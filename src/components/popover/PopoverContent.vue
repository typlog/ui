<script lang="ts">
import type {
  PopoverContentProps as _PopoverContentProps,
  PopoverContentEmits,
} from 'reka-ui'
import {
  PopoverPortal,
  PopoverContent,
} from 'reka-ui'
import { useForwardPropsEmits } from '../util'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

export interface PopoverContentProps extends _PopoverContentProps {
  to?: string | HTMLElement
  size?: '1' | '2' | '3' | '4'
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverContentProps>(), {
  size: '2',
})
const emits = defineEmits<PopoverContentEmits>()

const forwarded = useForwardPropsEmits(props, emits, ['to', 'size'])
</script>

<template>
  <PopoverPortal :to="props.to">
    <ThemeWrapper>
      <PopoverContent
        v-bind="{ ...$attrs, ...forwarded }"
        class="ui-PopoverContent"
        :class="`r-size-${props.size}`"
      >
        <slot></slot>
      </PopoverContent>
    </ThemeWrapper>
  </PopoverPortal>
</template>

<style>
.ui-PopoverContent {
  --inset-padding-top: var(--popover-content-padding);
  --inset-padding-right: var(--popover-content-padding);
  --inset-padding-bottom: var(--popover-content-padding);
  --inset-padding-left: var(--popover-content-padding);

  background-color: var(--color-panel-solid);
  box-shadow: var(--shadow-5);
  min-width: var(--reka-popover-trigger-width);
  max-width: var(--reka-popover-content-available-width);
  outline: 0;
  overflow: auto;
  position: relative;
  padding: var(--popover-content-padding);
  box-sizing: border-box;
  transform-origin: var(--reka-popover-content-transform-origin);
}
.ui-PopoverContent:where(.r-size-1) {
  --popover-content-padding: var(--space-3);
  border-radius: var(--radius-4);
}
.ui-PopoverContent:where(.r-size-2) {
  --popover-content-padding: var(--space-4);
  border-radius: var(--radius-4);
}
.ui-PopoverContent:where(.r-size-3) {
  --popover-content-padding: var(--space-5);
  border-radius: var(--radius-5);
}
.ui-PopoverContent:where(.r-size-4) {
  --popover-content-padding: var(--space-6);
  border-radius: var(--radius-5);
}

@media (prefers-reduced-motion: no-preference) {
  .ui-PopperContent {
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ui-PopperContent:where([data-state='open']) {
    animation-duration: 160ms;
  }
  .ui-PopperContent:where([data-state='open']):where([data-side='top']) {
    animation-name: ui-slide-from-top, ui-fade-in;
  }
  .ui-PopperContent:where([data-state='open']):where([data-side='bottom']) {
    animation-name: ui-slide-from-bottom, ui-fade-in;
  }
  .ui-PopperContent:where([data-state='open']):where([data-side='left']) {
    animation-name: ui-slide-from-left, ui-fade-in;
  }
  .ui-PopperContent:where([data-state='open']):where([data-side='right']) {
    animation-name: ui-slide-from-right, ui-fade-in;
  }
  .ui-PopperContent:where([data-state='closed']) {
    animation-duration: 100ms;
  }
  .ui-PopperContent:where([data-state='closed']):where([data-side='top']) {
    animation-name: ui-slide-from-top, ui-fade-out;
  }
  .ui-PopperContent:where([data-state='closed']):where([data-side='bottom']) {
    animation-name: ui-slide-from-bottom, ui-fade-out;
  }
  .ui-PopperContent:where([data-state='closed']):where([data-side='left']) {
    animation-name: ui-slide-from-left, ui-fade-out;
  }
  .ui-PopperContent:where([data-state='closed']):where([data-side='right']) {
    animation-name: ui-slide-from-right, ui-fade-out;
  }
}
</style>
