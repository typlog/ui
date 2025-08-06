<script lang="ts">
import type {
  PopoverContentProps,
  PopoverContentEmits,
} from 'reka-ui'

export interface PopoverPopupProps extends PopoverContentProps {
  size?: '1' | '2'
}
</script>

<script setup lang="ts">
import {
  PopoverPortal,
  PopoverContent,
} from 'reka-ui'
import { useForwardPropsEmitsWithout } from '../util'
import ThemeWrapper from '../provider/ThemeWrapper.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverPopupProps>(), {
  size: '1',
  side: 'bottom',
  align: 'start',
  sideOffset: 4,
})
const emits = defineEmits<PopoverContentEmits>()

const forwarded = useForwardPropsEmitsWithout(props, emits, ['to', 'size'])
</script>

<template>
  <PopoverPortal>
    <ThemeWrapper>
      <PopoverContent
        v-bind="{ ...$attrs, ...forwarded }"
        class="ui-PopoverPopup ui-PopperContent"
        :class="`r-size-${props.size}`"
      >
        <slot></slot>
      </PopoverContent>
    </ThemeWrapper>
  </PopoverPortal>
</template>

<style src="./popper.css"></style>

<style>
@layer components {
  .ui-PopoverPopup {
    background-color: var(--color-panel-solid);
    box-shadow: var(--shadow-5);
    min-width: var(--reka-popover-trigger-width);
    max-width: var(--reka-popover-content-available-width);
    outline: 0;
    overflow: auto;
    position: relative;
    box-sizing: border-box;
    transform-origin: var(--reka-popover-content-transform-origin);
    padding: var(--popover-popup-padding);
  }
}
.ui-PopoverPopup:where(.r-size-1) {
  border-radius: var(--radius-4);
  --popover-popup-padding: var(--space-2);
}
.ui-PopoverPopup:where(.r-size-2) {
  border-radius: var(--radius-5);
  --popover-popup-padding: var(--space-4);
}
</style>
