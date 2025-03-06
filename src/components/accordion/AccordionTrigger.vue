<script lang="ts">
import type { AccordionTriggerProps as _AccordionTriggerProps } from 'reka-ui'

export interface AccordionTriggerProps extends _AccordionTriggerProps {
  indicator?: 'plus-minus' | 'chevron'
}
</script>

<script setup lang="ts">
import { AccordionTrigger } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { extractForwardProps } from '../util'
import ExpandCollapseIcon from '../icon/ExpandCollapseIcon.vue'

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
    <ExpandCollapseIcon
      v-if="props.indicator === 'plus-minus'"
      class="ui-AccordionTriggerIcon"
    />
    <Icon
      v-else-if="props.indicator === 'chevron'"
      class="ui-AccordionTriggerChevron"
      icon="lucide:chevron-down"
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
.ui-AccordionTriggerChevron {
  transition: transform 0.2s ease;
}
:where(.ui-AccordionTrigger[data-state="open"]) .ui-AccordionTriggerChevron {
  transform: rotate(180deg);
}
</style>
