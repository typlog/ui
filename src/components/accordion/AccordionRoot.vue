<script lang="ts">
import type {
  AccordionRootProps as _AccordionRootProps,
  AccordionRootEmits,
} from 'reka-ui'

export interface AccordionRootProps extends _AccordionRootProps {
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import { AccordionRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<AccordionRootProps>(), {
  size: '1',
})

const emits = defineEmits<AccordionRootEmits>()

const forwarded = useForwardPropsEmitsWithout(props, emits, ['size'])
const resetClass = buildPropsClass(props, ['size'])
</script>

<template>
  <AccordionRoot
    v-bind="forwarded"
    class="ui-AccordionRoot"
    :class="resetClass"
  >
    <slot></slot>
  </AccordionRoot>
</template>

<style>
.ui-AccordionRoot {
  overflow: hidden;
}
.ui-AccordionRoot:where(.r-size-1) {
  --accordion-padding: var(--space-3);
  --accordion-trigger-font-size: var(--font-size-3);
  --accordion-content-font-size: var(--font-size-2);
}
.ui-AccordionRoot:where(.r-size-2) {
  --accordion-padding: var(--space-4);
  --accordion-trigger-font-size: var(--font-size-4);
  --accordion-content-font-size: var(--font-size-3);
}
.ui-AccordionRoot:where(.r-size-3) {
  --accordion-padding: var(--space-5);
  --accordion-trigger-font-size: var(--font-size-5);
  --accordion-content-font-size: var(--font-size-4);
}
</style>
