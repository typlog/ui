<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface AccordionTriggerProps extends PrimitiveProps {
  /**
   * The indicator icon for the accordion trigger.
   * @defaultValue "chevron"
   */
  indicator?: 'plus-minus' | 'chevron'
}
</script>

<script setup lang="ts">
import { AccordionTrigger } from 'reka-ui'
import { extractForwardProps } from '../util'
import PlusMinusIcon from '../icon/PlusMinusIcon.vue'
import ChevronIcon from '../icon/ChevronIcon.vue'

const props = withDefaults(defineProps<AccordionTriggerProps>(), {
  size: '1',
  indicator: 'chevron',
})

const [forwarded, resetClass] = extractForwardProps(props, ['size'])
</script>

<template>
  <AccordionTrigger
    class="ui-AccordionTrigger"
    :class="resetClass"
    v-bind="forwarded"
  >
    <div class="ui-AccordionTriggerText">
      <slot></slot>
    </div>
    <PlusMinusIcon
      v-if="props.indicator === 'plus-minus'"
      class="ui-AccordionTriggerIcon"
    />
    <ChevronIcon
      v-else-if="props.indicator === 'chevron'"
      arrow-transform="down-up"
    />
  </AccordionTrigger>
</template>

<style>
.ui-AccordionTrigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  user-select: none;
  font-size: var(--accordion-trigger-font-size);
  padding-top: var(--accordion-padding);
  padding-bottom: var(--accordion-padding);
  font-weight: var(--font-weight-medium);
}
.ui-AccordionTrigger:hover {
  text-decoration: underline;
}
</style>
