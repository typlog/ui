<script lang="ts">
import type {
  PinInputRootProps as _PinInputRootProps,
} from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export type PinInputType = 'text' | 'number'

export type PinInputValue<Type extends PinInputType = 'text'>
  = [Type] extends ['number'] ? number[] : string[]

export type PinInputRootEmits<Type extends PinInputType = 'text'> = {
  'update:modelValue': [value: PinInputValue<Type>]
  complete: [value: PinInputValue<Type>]
}

export interface PinInputRootProps<Type extends PinInputType = 'text'> extends _PinInputRootProps<Type> {
  /** Controls the component size. @default "2" */
  size?: '1' | '2' | '3'
  /** Controls the visual treatment. @default "surface" */
  variant?: 'surface' | 'soft'
  /** Overrides the accent color inherited from ThemeProvider. */
  color?: ColorType
  /** Controls the corner radius. */
  radius?: RadiusType
}
</script>

<script setup lang="ts" generic="Type extends PinInputType = 'text'">
import { PinInputRoot } from 'reka-ui'
import { buildPropsClass, useForwardPropsEmitsWithout } from '../util'

const props = withDefaults(defineProps<PinInputRootProps<Type>>(), {
  size: '2',
  variant: 'surface',
})
const emits = defineEmits<PinInputRootEmits<Type>>()

defineSlots<{
  default?: (props: {
    /** Current input values. */
    modelValue: PinInputValue<Type>
  }) => any
}>()

const asPinInputValue = (value: unknown) => value as PinInputValue<Type>

const forwarded = useForwardPropsEmitsWithout(
  props,
  emits,
  ['size', 'variant', 'color', 'radius'],
)
const resetClass = buildPropsClass(props, ['size', 'variant'])
</script>

<template>
  <PinInputRoot
    v-slot="{ modelValue }"
    v-bind="forwarded"
    class="ui-PinInputRoot"
    :class="resetClass"
    :data-accent-color="props.color"
    :data-radius="props.radius"
  >
    <slot :model-value="asPinInputValue(modelValue)"></slot>
  </PinInputRoot>
</template>

<style>
@layer components {
  .ui-PinInputRoot {
    display: inline-flex;
    align-items: center;
    gap: var(--pin-input-gap);
    box-sizing: border-box;
  }
  .ui-PinInputRoot:where(.r-size-1) {
    --pin-input-size: var(--space-5);
    --pin-input-gap: var(--space-1);
    --pin-input-radius: max(var(--radius-2), var(--radius-full));
    --pin-input-padding: var(--space-1);
    font-size: var(--font-size-1);
    letter-spacing: var(--letter-spacing-1);
  }

  .ui-PinInputRoot:where(.r-size-2) {
    --pin-input-size: var(--space-6);
    --pin-input-gap: var(--space-2);
    --pin-input-radius: max(var(--radius-2), var(--radius-full));
    --pin-input-padding: var(--space-2);
    font-size: var(--font-size-2);
    letter-spacing: var(--letter-spacing-2);
  }

  .ui-PinInputRoot:where(.r-size-3) {
    --pin-input-size: var(--space-7);
    --pin-input-gap: var(--space-2);
    --pin-input-radius: max(var(--radius-3), var(--radius-full));
    --pin-input-padding: var(--space-3);
    font-size: var(--font-size-3);
    letter-spacing: var(--letter-spacing-3);
  }

  .ui-PinInputRoot:where(.r-variant-surface) {
    --pin-input-border-width: 1px;
    --pin-input-border-color: var(--gray-a7);
    --pin-input-focus-color: var(--focus-a8);
    --pin-input-selection-color: var(--focus-a5);
  }

  .ui-PinInputRoot:where(.r-variant-soft) {
    --pin-input-border-width: 0px;
    --pin-input-border-color: transparent;
    --pin-input-focus-color: var(--accent-8);
    --pin-input-selection-color: var(--accent-a5);
  }
}
</style>
