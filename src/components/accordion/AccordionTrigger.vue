<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface AccordionTriggerProps extends PrimitiveProps {
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
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionTrigger } from 'reka-ui'
import { useForwardPropsWithout } from '../util'
import AccordionIndicator from './AccordionIndicator.vue'
import { injectAccordionRootContext } from './AccordionRoot.vue'

const props = defineProps<AccordionTriggerProps>()
const ctx = injectAccordionRootContext()

const forwarded = useForwardPropsWithout(props, ['indicatorSide', 'indicatorIcon'])

const indicatorIcon = computed(() => {
  return props.indicatorIcon || ctx.indicatorIcon.value
})

const indicatorSide = computed(() => {
  return props.indicatorSide || ctx.indicatorSide.value
})
</script>

<template>
  <AccordionTrigger
    class="ui-AccordionTrigger"
    v-bind="forwarded"
  >
    <div class="ui-AccordionTriggerText">
      <slot></slot>
    </div>
    <AccordionIndicator
      v-if="indicatorIcon !== 'none'"
      :data-side="indicatorSide"
      :variant="indicatorIcon"
    />
  </AccordionTrigger>
</template>

<style>
.ui-AccordionTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: initial;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: var(--accordion-trigger-font-size);
  padding-top: var(--accordion-padding);
  padding-bottom: var(--accordion-padding);
  font-weight: var(--font-weight-medium);
  gap: var(--accordion-trigger-gap);
  --accordion-indicator-icon-size: var(--accordion-trigger-font-size);
}
.ui-AccordionTrigger:hover {
  text-decoration: underline;
}
.ui-AccordionTriggerText {
  flex-grow: 1;
}
</style>
