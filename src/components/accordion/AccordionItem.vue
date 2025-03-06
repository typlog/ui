<script setup lang="ts">
import type { AccordionItemProps } from 'reka-ui'
import { AccordionItem, useForwardProps } from 'reka-ui'

const props = defineProps<AccordionItemProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <AccordionItem
    v-bind="forwardedProps"
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
