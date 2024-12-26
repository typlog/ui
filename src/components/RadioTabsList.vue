<script lang="ts">
import type { RadioGroupRootProps, RadioGroupRootEmits } from 'reka-ui'

export interface RadioTabsListProps extends RadioGroupRootProps {
  size?: '1' | '2'
}
</script>

<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { extractForwardPropsEmits } from './util'

const emits = defineEmits<RadioGroupRootEmits>()
const props = withDefaults(defineProps<RadioTabsListProps>(), {
  size: '2',
})
const [forwarded, resetClass] = extractForwardPropsEmits(props, emits, ['size'])
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    class="ui-RadioTabsList"
    :class="resetClass"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>

<style>
.ui-RadioTabsList {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: var(--gray-a3);
  padding: var(--radio-tabs-list-padding);
  border-radius: var(--radio-tabs-list-radius);
}

.ui-RadioTabsList:where(.r-size-1) {
  --radio-tabs-list-padding: var(--space-1);
  --radio-tabs-list-radius: var(--radius-2);
  --radio-tabs-item-padding: 3px 6px;
  --radio-tabs-item-radius: var(--radius-1);
}

.ui-RadioTabsList:where(.r-size-2) {
  --radio-tabs-list-padding: var(--space-1);
  --radio-tabs-list-radius: var(--radius-4);
  --radio-tabs-item-padding: 4px 8px;
  --radio-tabs-item-radius: var(--radius-2);
}

.ui-RadioTabsList [role="radio"] {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: var(--radio-tabs-item-padding);
  border-radius: var(--radio-tabs-item-radius);
}

.ui-RadioTabsList [data-state="checked"] {
  color: var(--gray-12);
  background-color: var(--color-background);
  box-shadow: var(--shadow-2);
}
</style>
