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
  padding-block: var(--collapsible-padding-y);
  padding-inline: var(--collapsible-padding-x);
}

:where(.ui-CollapsibleRoot.r-variant-soft) .ui-CollapsibleTrigger {
  background: var(--accent-a2);
  border-radius: var(--collapsible-radius);
}
:where(.ui-CollapsibleRoot.r-variant-surface) .ui-CollapsibleTrigger {
  border-top-left-radius: var(--collapsible-radius);
  border-top-right-radius: var(--collapsible-radius);
  background: var(--accent-a2);
}
:where(.ui-CollapsibleRoot.r-variant-soft) .ui-CollapsibleTrigger:where(:hover) {
  background: var(--accent-a3);
}
:where(.ui-CollapsibleRoot.r-variant-surface) .ui-CollapsibleTrigger:where([data-state="open"]),
:where(.ui-CollapsibleRoot.r-variant-soft) .ui-CollapsibleTrigger:where([data-state="open"]) {
  background: var(--accent-a3);
  color: var(--accent-a11);
}
</style>
