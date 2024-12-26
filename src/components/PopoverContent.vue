<script lang="ts">
import type {
  PopoverContentProps as _PopoverContentProps,
  PopoverContentEmits,
} from 'reka-ui'

export interface PopoverContentProps extends _PopoverContentProps {
  to?: string | HTMLElement
  size?: '1' | '2' | '3' | '4'
}
</script>

<script setup lang="ts">
import {
  PopoverPortal,
  PopoverContent,
} from 'reka-ui'
import { useForwardPropsEmits } from './util'

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
    <PopoverContent
      v-bind="{ ...$attrs, ...forwarded }"
      :data-size="props.size"
      class="ui-PopoverContent"
    >
      <slot></slot>
    </PopoverContent>
  </PopoverPortal>
</template>

<style>
.ui-PopoverContent {
  background-color: var(--color-panel-solid);
  box-shadow: var(--shadow-5);
  min-width: var(--radix-popover-trigger-width);
  outline: 0;
  overflow: auto;
  position: relative;

  --inset-padding-top: var(--popover-content-padding);
  --inset-padding-right: var(--popover-content-padding);
  --inset-padding-bottom: var(--popover-content-padding);
  --inset-padding-left: var(--popover-content-padding);
  padding: var(--popover-content-padding);
  box-sizing: border-box;
  transform-origin: var(--radix-popover-content-transform-origin);
}
.ui-PopoverContent:where([data-size="1"]) {
  --popover-content-padding: var(--space-3);
  border-radius: var(--radius-4);
}
.ui-PopoverContent:where([data-size="2"]) {
  --popover-content-padding: var(--space-4);
  border-radius: var(--radius-4);
}
.ui-PopoverContent:where([data-size="3"]) {
  --popover-content-padding: var(--space-5);
  border-radius: var(--radius-5);
}
.ui-PopoverContent:where([data-size="4"]) {
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
