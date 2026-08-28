<script lang="ts">
import type {
  CollapsibleRootProps as RekaCollapsibleRootProps,
  CollapsibleRootEmits,
} from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface CollapsibleRootProps extends RekaCollapsibleRootProps {
  color?: ColorType
  radius?: RadiusType
  variant?: 'ghost' | 'soft' | 'surface'
  size?: '1' | '2' | '3' | '4'
}
</script>

<script setup lang="ts">
import { CollapsibleRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  variant: 'ghost',
  size: '2',
})
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'radius', 'variant', 'size'])
const resetClass = buildPropsClass(props, ['variant', 'size'])
</script>

<template>
  <CollapsibleRoot
    class="ui-CollapsibleRoot"
    :class="resetClass"
    v-bind="forwarded"
    :data-accent-color="color"
    :data-radius="radius"
  >
    <slot></slot>
  </CollapsibleRoot>
</template>

<style>
.ui-CollapsibleRoot:where(.r-size-1) {
  --collapsible-font-size: var(--font-size-2);
  --collapsible-trigger-gap: calc(var(--space-1) / 2);
  --collapsible-indicator-icon-size: var(--font-size-2);
  --collapsible-padding-y: var(--space-2);
  --collapsible-padding-x: var(--space-3);
  --collapsible-radius: max(var(--radius-1), var(--radius-full))
}

.ui-CollapsibleRoot:where(.r-size-2) {
  --collapsible-font-size: var(--font-size-3);
  --collapsible-trigger-gap: var(--space-1);
  --collapsible-indicator-icon-size: var(--font-size-3);
  --collapsible-padding-y: var(--space-3);
  --collapsible-padding-x: var(--space-4);
  --collapsible-radius: max(var(--radius-2), var(--radius-full))
}

.ui-CollapsibleRoot:where(.r-size-3) {
  --collapsible-font-size: var(--font-size-4);
  --collapsible-trigger-gap: calc(var(--space-2) * 3 / 4);
  --collapsible-indicator-icon-size: var(--font-size-5);
  --collapsible-padding-y: var(--space-3);
  --collapsible-padding-x: var(--space-4);
  --collapsible-radius: max(var(--radius-4), var(--radius-full))
}

.ui-CollapsibleRoot:where(.r-size-4) {
  --collapsible-font-size: var(--font-size-7);
  --collapsible-trigger-gap: var(--space-2);
  --collapsible-indicator-icon-size: var(--font-size-7);
  --collapsible-padding-y: var(--space-3);
  --collapsible-padding-x: var(--space-5);
  --collapsible-radius: max(var(--radius-4), var(--radius-full))
}

.ui-CollapsibleRoot:where(.r-variant-soft, .r-variant-surface) {
  --collapsible-trigger-background-color: var(--accent-a2);
  --collapsible-trigger-hover-background-color: var(--accent-a3);
  --collapsible-trigger-open-background-color: var(--accent-a3);
  --collapsible-trigger-open-text-color: var(--accent-a11);

  border-radius: var(--collapsible-radius);
}

.ui-CollapsibleRoot:where(.r-variant-surface) {
  box-shadow: inset 0 0 0 1px var(--gray-a4);
}
.ui-CollapsibleRoot:where(.r-variant-surface):where([data-state="open"]) {
  box-shadow: inset 0 0 0 1px var(--gray-a5);
}

.ui-CollapsibleRoot:where(.r-variant-soft, .r-variant-surface):where([data-accent-color="gray"]) {
  --collapsible-trigger-open-text-color: var(--accent-12);
}
</style>
