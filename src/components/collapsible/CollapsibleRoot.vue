<script lang="ts">
import type {
  CollapsibleRootProps as RekaCollapsibleRootProps,
  CollapsibleRootEmits,
} from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface CollapsibleRootProps extends RekaCollapsibleRootProps {
  color?: ColorType
  radius?: RadiusType
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
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
    <template #default="{ open }">
      <slot :open="open"></slot>
    </template>
  </CollapsibleRoot>
</template>

<style>
.ui-CollapsibleRoot:where(.r-size-1) {
  --collapsible-trigger-font-size: var(--font-size-2);
  --collapsible-trigger-gap: calc(var(--space-1) / 2);
  --collapsible-indicator-icon-size: var(--font-size-2);
}

.ui-CollapsibleRoot:where(.r-size-2) {
  --collapsible-trigger-font-size: var(--font-size-3);
  --collapsible-trigger-gap: var(--space-1);
  --collapsible-indicator-icon-size: var(--font-size-3);
}

.ui-CollapsibleRoot:where(.r-size-3) {
  --collapsible-trigger-font-size: var(--font-size-5);
  --collapsible-trigger-gap: calc(var(--space-2) * 3 / 4);
  --collapsible-indicator-icon-size: var(--font-size-5);
}

.ui-CollapsibleRoot:where(.r-size-4) {
  --collapsible-trigger-font-size: var(--font-size-7);
  --collapsible-trigger-gap: var(--space-2);
  --collapsible-indicator-icon-size: var(--font-size-7);
}
</style>
