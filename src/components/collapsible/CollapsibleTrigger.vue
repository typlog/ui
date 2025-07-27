<script lang="ts">
import type { CollapsibleTriggerProps as RekaCollapsibleTriggerProps } from 'reka-ui'

export interface CollapsibleTriggerProps extends RekaCollapsibleTriggerProps {
  indicator?: 'none' | 'left' | 'right'
}
</script>

<script setup lang="ts">
import { CollapsibleTrigger } from 'reka-ui'
import CollapsibleIndicator from './CollapsibleIndicator.vue'
import { useForwardPropsWithout } from '../util'

const props = withDefaults(defineProps<CollapsibleTriggerProps>(), {
  indicator: 'right',
})
const forwarded = useForwardPropsWithout(props, ['indicator'])
</script>

<template>
  <CollapsibleTrigger
    class="ui-CollapsibleTrigger"
    v-bind="forwarded"
  >
    <span class="ui-CollapsibleTriggerText">
      <slot></slot>
    </span>
    <CollapsibleIndicator
      v-if="indicator !== 'none'"
      :data-side="indicator"
    />
  </CollapsibleTrigger>
</template>

<style>
.ui-CollapsibleTrigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  text-align: initial;
  gap: var(--collapsible-trigger-gap);
  font-size: var(--collapsible-font-size);
  font-weight: var(--font-weight-medium);
}
.ui-CollapsibleTriggerText {
  flex-grow: 1;
  text-align: initial;
}
:where(.ui-CollapsibleRoot:not(.r-variant-ghost)) .ui-CollapsibleTrigger {
  background-color: var(--collapsible-trigger-background-color);
  padding-block: var(--collapsible-padding-y);
  padding-inline: var(--collapsible-padding-x);
  width: 100%;
  border-radius: var(--collapsible-radius);
  transition: border-radius 0.2s ease;
}
:where(.ui-CollapsibleRoot:not(.r-variant-ghost)) .ui-CollapsibleTrigger:where(:hover) {
  background-color: var(--collapsible-trigger-hover-background-color);
}
:where(.ui-CollapsibleRoot:not(.r-variant-ghost)) .ui-CollapsibleTrigger:where([data-state="open"]) {
  background-color: var(--collapsible-trigger-open-background-color);
  color: var(--collapsible-trigger-open-text-color);
  border-radius: var(--collapsible-radius) var(--collapsible-radius) 0 0;
}
</style>
