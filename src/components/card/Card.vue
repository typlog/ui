<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { RadiusType } from '../types'

export interface CardProps extends PrimitiveProps {
  variant?: 'surface' | 'soft'
  radius?: RadiusType
  size?: '1' | '2' | '3' | '4' | '5'
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<CardProps>(), {
  as: 'div',
  variant: 'surface',
  size: '1',
})
const resetClass = buildPropsClass(props, ['size', 'variant'])
</script>

<template>
  <Primitive
    class="ui-Card ui-BaseCard"
    :class="resetClass"
    :as-child="props.asChild"
    :as="props.as"
    :data-radius="props.radius"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-Card:where(.r-size-1) {
  --card-padding: var(--space-3);
  --card-border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-Card:where(.r-size-2) {
  --card-padding: var(--space-4);
  --card-border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-Card:where(.r-size-3) {
  --card-padding: var(--space-5);
  --card-border-radius: max(var(--radius-5), var(--radius-full));
}
.ui-Card:where(.r-size-4) {
  --card-padding: var(--space-6);
  --card-border-radius: max(var(--radius-5), var(--radius-full));
}
.ui-Card:where(.r-size-5) {
  --card-padding: var(--space-8);
  --card-border-radius: max(var(--radius-6), var(--radius-full));
}
.ui-Card:where(.r-variant-soft) {
  border-color: var(--gray-2);
  background-color: var(--gray-2);
}
.ui-Card:where(.r-variant-soft):where(:any-link, button, label):where(:hover) {
  border-color: var(--gray-a5);
}
</style>
