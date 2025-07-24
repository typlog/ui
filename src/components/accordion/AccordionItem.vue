<script lang="ts">
import type { AccordionItemProps as RekaAccordionItemProps } from 'reka-ui'

export interface AccordionItemProps extends Omit<RekaAccordionItemProps, 'value'> {
  /**
   * A string identifier for the accordion item. If omitted, a unique value will be generated automatically.
   */
  value?: string;
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { AccordionItem, useForwardProps, useId } from 'reka-ui'

const props = defineProps<AccordionItemProps>()

const id = useId(null, 'accordion-item')

const forwarded = computed(() => {
  const refProps = useForwardProps(props)
  if (!refProps.value.value) {
    return {...refProps.value, value: id}
  } else {
    return refProps.value as RekaAccordionItemProps
  }
})
</script>

<template>
  <AccordionItem
    v-bind="forwarded"
    class="ui-AccordionItem"
  >
    <slot></slot>
  </AccordionItem>
</template>

<style>
.ui-AccordionItem + .ui-AccordionItem {
  border-top: 1px solid var(--gray-a5);
}
</style>
