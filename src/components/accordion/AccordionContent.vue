<script lang="ts">
import type { AccordionContentProps } from 'reka-ui'
export type { AccordionContentProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { AccordionContent, useForwardProps } from 'reka-ui'

const props = defineProps<AccordionContentProps>()
const forwardedProps = useForwardProps(props)

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <AccordionContent
    v-bind="forwardedProps"
    class="ui-AccordionContent"
  >
    <div class="ui-AccordionContentInner" v-bind="$attrs">
      <slot></slot>
    </div>
  </AccordionContent>
</template>

<style>
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}
@keyframes accordion-up {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}
@layer components {
  .ui-AccordionContent {
    overflow: hidden;
    font-weight: var(--font-weight-regular);
    font-size: var(--accordion-content-font-size);
  }
}
.ui-AccordionContent:where([data-state="open"]) {
  animation: accordion-down 0.2s ease-out;
}
.ui-AccordionContent:where([data-state="closed"]) {
  animation: accordion-up 0.2s ease-out;
}
.ui-AccordionContentInner {
  padding-bottom: var(--accordion-padding);
}
</style>
