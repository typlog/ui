<script lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { ColorType, RadiusType } from './types'

export interface BadgeProps extends PrimitiveProps {
  variant?: 'solid' | 'soft' | 'surface' | 'outline'
  color?: ColorType
  radius?: RadiusType
  size?: '1' | '2' | '3'
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from 'radix-vue'

const props = withDefaults(defineProps<BadgeProps>(), {
  as: 'span',
  variant: 'soft',
  radius: 'small',
  size: '1',
  highContrast: undefined,
})
</script>

<template>
  <Primitive
    class="ui-Badge"
    :as="props.as"
    :as-child="props.asChild"
    :data-variant="props.variant"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :data-size="props.size"
    :data-high-contrast="props.highContrast"
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

.ui-Badge[data-size="1"] {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  padding: calc(var(--space-1) * 0.5) calc(var(--space-1) * 1.5);
  gap: calc(var(--space-1) * 1.5);
  border-radius: max(var(--radius-1), var(--radius-full));
}

.ui-Badge[data-size="2"] {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  padding: var(--space-1) var(--space-2);
  gap: calc(var(--space-1) * 1.5);
  border-radius: max(var(--radius-2), var(--radius-full));
}

.ui-Badge[data-size="3"] {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  padding: var(--space-1) calc(var(--space-2) * 1.25);
  gap: var(--space-2);
  border-radius: max(var(--radius-2), var(--radius-full));
}
.ui-Badge[data-variant="solid"] {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
.ui-Badge[data-variant="solid"]:where([data-high-contrast="true"]) {
  background-color: var(--accent-12);
  color: var(--gray-1);
}
.ui-Badge[data-variant="solid"]::selection {
  background-color: var(--accent-7);
  color: var(--accent-12);
}
.ui-Badge[data-variant="soft"] {
  background-color: var(--accent-a3);
  color: var(--accent-a11);
}
.ui-Badge[data-variant="soft"]:where([data-high-contrast="true"]) {
  color: var(--accent-12);
}
.ui-Badge[data-variant="surface"] {
  background-color: var(--accent-surface);
  box-shadow: inset 0 0 0 1px var(--accent-a6);
  color: var(--accent-a11);
}
.ui-Badge[data-variant="surface"]:where([data-high-contrast="true"]) {
  color: var(--accent-12);
}
.ui-Badge[data-variant="outline"] {
  box-shadow: inset 0 0 0 1px var(--accent-a8);
  color: var(--accent-a11);
}
.ui-Badge[data-variant="outline"]:where([data-high-contrast="true"]) {
  box-shadow: inset 0 0 0 1px var(--accent-a7), inset 0 0 0 1px var(--gray-a11);
  color: var(--accent-12);
}
</style>
