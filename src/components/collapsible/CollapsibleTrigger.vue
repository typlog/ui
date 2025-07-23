<script lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { CollapsibleTrigger, useForwardProps } from 'reka-ui'

const props = defineProps<CollapsibleTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CollapsibleTrigger
    class="ui-CollapsibleTrigger"
    v-bind="forwarded"
  >
    <span
      v-if="$slots.left"
      class="ui-CollapsibleTriggerSlot"
      data-side="left"
    >
      <slot name="left"></slot>
    </span>
    <span class="ui-CollapsibleTriggerInner">
      <slot></slot>
    </span>
    <span
      v-if="$slots.right"
      class="ui-CollapsibleTriggerSlot"
      data-side="right"
    >
      <slot name="right"></slot>
    </span>
  </CollapsibleTrigger>
</template>

<style>
.ui-CollapsibleTrigger {
  display: inline-flex;
  align-items: center;
  gap: var(--collapsible-trigger-gap);
  font-size: var(--collapsible-trigger-font-size);
}
.ui-CollapsibleTriggerInner {
  flex-grow: 1;
  text-align: initial;
}
.ui-CollapsibleTriggerSlot {
  display: inline-flex;
  align-items: center;
}
</style>
