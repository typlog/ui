<script lang="ts">
import type { Ref } from 'vue'
import type {
  AccordionRootProps as RekaAccordionRootProps,
  AccordionRootEmits,
} from 'reka-ui'
import { createContext } from 'reka-ui'

export interface AccordionRootProps extends RekaAccordionRootProps {
  /**
   * Control the size of the accordion.
   *
   * @default "1"
   */
  size?: '1' | '2' | '3'
  /**
   * The indicator icon's poistion, left or right.
   *
   * @default "right"
   */
  indicatorSide?: 'left' | 'right'
  /**
   * An indicator icon on the left or right of the trigger.
   *
   * @default "chevron"
   */
  indicatorIcon?: 'none' | 'chevron' | 'plus'
  /**
   * The orientation of the accordion.
   *
   * @default "vertical"
   */
  orientation?: 'vertical' | 'horizontal'
}

interface AccordionRootContext {
  indicatorSide: Ref<'left' | 'right'>
  indicatorIcon: Ref<'none' | 'chevron' | 'plus'>
}

export const [injectAccordionRootContext, provideAccordionRootContext] = createContext<AccordionRootContext>('ui:AccordionRoot')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import { AccordionRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<AccordionRootProps>(), {
  size: '1',
  indicatorSide: 'right',
  indicatorIcon: 'chevron',
})

const emits = defineEmits<AccordionRootEmits>()
const { indicatorSide, indicatorIcon } = toRefs(props)

const forwarded = useForwardPropsEmitsWithout(props, emits, ['size', 'indicatorSide', 'indicatorIcon'])
const resetClass = buildPropsClass(props, ['size'])

provideAccordionRootContext({
  indicatorSide,
  indicatorIcon,
})
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
  --accordion-trigger-gap: var(--space-1);
  --accordion-content-font-size: var(--font-size-2);
  --accordion-indicator-line-width: 1px;
}
.ui-AccordionRoot:where(.r-size-2) {
  --accordion-padding: var(--space-4);
  --accordion-trigger-font-size: var(--font-size-4);
  --accordion-trigger-gap: var(--space-2);
  --accordion-content-font-size: var(--font-size-3);
  --accordion-indicator-line-width: 1px;
}
.ui-AccordionRoot:where(.r-size-3) {
  --accordion-padding: var(--space-5);
  --accordion-trigger-font-size: var(--font-size-5);
  --accordion-trigger-gap: var(--space-3);
  --accordion-content-font-size: var(--font-size-4);
  --accordion-indicator-line-width: 2px;
}
</style>
