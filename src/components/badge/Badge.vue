<script lang="ts">
import type { AsTag } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface BadgeProps {
  /**
   * The visual variant to apply.
   * @default "solid"
   */
  variant?: 'solid' | 'soft' | 'surface' | 'outline'
  /** Overrides the accent color inherited from the theme. */
  color?: ColorType
  /**
   * Overrides the radius inherited from the theme.
   * @default "small"
   */
  radius?: RadiusType
  /**
   * Control the size of the badge.
   * @default "1"
   */
  size?: '1' | '2' | '3'
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
  /**
   * The element or component this component should render as.
   * @default "span"
   */
  as?: AsTag
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { extractClass } from '../util'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
  variant: 'soft',
  radius: 'small',
  size: '1',
  highContrast: undefined,
})

const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant', 'highContrast'])
})
</script>

<template>
  <Primitive
    class="ui-Badge"
    :class="resetClass"
    :as="props.as"
    :as-child="props.asChild"
    :data-accent-color="props.color"
    :data-radius="props.radius"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-Badge {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-weight: var(--font-weight-medium);
  font-style: normal;
  flex-shrink: 0;
  line-height: 1;
  height: fit-content;
}

.ui-Badge:where(.r-size-1) {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  padding: calc(var(--space-1) * 0.5) calc(var(--space-1) * 1.5);
  gap: calc(var(--space-1) * 1.5);
  border-radius: max(var(--radius-1), var(--radius-full));
}

.ui-Badge:where(.r-size-2) {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  padding: var(--space-1) var(--space-2);
  gap: calc(var(--space-1) * 1.5);
  border-radius: max(var(--radius-2), var(--radius-full));
}

.ui-Badge:where(.r-size-3) {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  padding: var(--space-1) calc(var(--space-2) * 1.25);
  gap: var(--space-2);
  border-radius: max(var(--radius-2), var(--radius-full));
}
.ui-Badge:where(.r-variant-solid) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
.ui-Badge:where(.r-variant-solid):where(.r-high-contrast) {
  background-color: var(--accent-12);
  color: var(--gray-1);
}
.ui-Badge:where(.r-variant-solid)::selection {
  background-color: var(--accent-7);
  color: var(--accent-12);
}
.ui-Badge:where(.r-variant-soft) {
  background-color: var(--accent-a3);
  color: var(--accent-a11);
}
.ui-Badge:where(.r-variant-soft):where(.r-high-contrast) {
  color: var(--accent-12);
}
.ui-Badge:where(.r-variant-surface) {
  background-color: var(--accent-surface);
  box-shadow: inset 0 0 0 1px var(--accent-a6);
  color: var(--accent-a11);
}
.ui-Badge:where(.r-variant-surface):where(.r-high-contrast) {
  color: var(--accent-12);
}
.ui-Badge:where(.r-variant-outline) {
  box-shadow: inset 0 0 0 1px var(--accent-a8);
  color: var(--accent-a11);
}
.ui-Badge:where(.r-variant-outline):where(.r-high-contrast) {
  box-shadow: inset 0 0 0 1px var(--accent-a7), inset 0 0 0 1px var(--gray-a11);
  color: var(--accent-12);
}
</style>
