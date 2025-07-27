<script lang="ts">
import type { RadioGroupRootProps, RadioGroupRootEmits } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface RadioTabsRootProps extends RadioGroupRootProps {
  /**
   * The visual variant of the radio tabs.
   * @default "classic"
   */
  variant?: 'classic' | 'surface' | 'soft'
  /**
   * Control the size of the radio tabs.
   * @default "2"
   */
  size?: '1' | '2'
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
  /** Overrides the radius inherited from the ThemeProvider. */
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const emits = defineEmits<RadioGroupRootEmits>()
const props = withDefaults(defineProps<RadioTabsRootProps>(), {
  size: '2',
  variant: 'classic',
})

const forwarded = useForwardPropsEmitsWithout(props, emits, ['size', 'color', 'radius', 'variant'])
const resetClass = buildPropsClass(props, ['size', 'variant'])
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    class="ui-RadioTabsRoot"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :class="resetClass"
  >
    <slot></slot>
  </RadioGroupRoot>
</template>

<style>
.ui-RadioTabsRoot {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  box-sizing: border-box;
  padding: var(--radio-tabs-list-padding);
  border-radius: var(--radio-tabs-list-radius);
  font-size: var(--radio-tabs-font-size);
}

.ui-RadioTabsRoot:where(.r-size-1) {
  --radio-tabs-font-size: var(--font-size-1);
  --radio-tabs-list-padding: var(--space-1);
  --radio-tabs-list-radius: max(var(--radius-2), var(--radius-full));
  --radio-tabs-item-padding: 3px 6px;
  --radio-tabs-item-radius: max(var(--radius-1), var(--radius-full));
}

.ui-RadioTabsRoot:where(.r-size-2) {
  --radio-tabs-font-size: var(--font-size-2);
  --radio-tabs-list-padding: var(--space-1);
  --radio-tabs-list-radius: max(var(--radius-3), var(--radius-full));
  --radio-tabs-item-padding: 4px 8px;
  --radio-tabs-item-radius: max(var(--radius-2), var(--radius-full));
}

.ui-RadioTabsRoot:where(.r-variant-surface) {
  background-color: var(--accent-surface);
  box-shadow: inset 0 0 0 1px var(--accent-a7);
}

.ui-RadioTabsRoot:where(.r-variant-classic) {
  background-color: var(--accent-a3);
}

.ui-RadioTabsRoot:where(.r-variant-soft) {
  background-color: var(--accent-a3);
}

/* special fix for tailwind */
.ui-RadioTabsRoot:where(.w-full) {
  width: 100%;
}
</style>
