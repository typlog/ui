<script lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { RadiusType } from './types'

export interface CardProps extends PrimitiveProps {
  variant?: 'surface' | 'soft'
  radius?: RadiusType
  size?: '1' | '2' | '3' | '4' | '5'
}
</script>

<script setup lang="ts">
import { Primitive } from 'radix-vue'

const props = withDefaults(defineProps<CardProps>(), {
  as: 'div',
  variant: 'surface',
  size: '1',
})
</script>

<template>
  <Primitive
    class="ui-Card"
    :as-child="props.asChild"
    :as="props.as"
    :data-variant="props.variant"
    :data-radius="props.radius"
    :data-size="props.size"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-Card {
  display: block;
  position: relative;
  overflow: hidden;
  font-style: normal;
  text-align: start;
  box-sizing: border-box;
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  border-color: var(--card-border-color, var(--gray-a5));
  border-width: var(--card-border-width, 1px);
  border-style: solid;
  --inset-padding-top: var(--card-padding);
  --inset-padding-right: var(--card-padding);
  --inset-padding-bottom: var(--card-padding);
  --inset-padding-left: var(--card-padding);
}
.ui-Card:where(:any-link, button, label):where(:hover) {
  --card-border-color: var(--gray-a7);
}
.ui-Card:where(:any-link, button, label):where(:focus-visible) {
  --card-border-color: var(--focus-8);
  box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
.ui-Card:where([data-size="1"]) {
  --card-padding: var(--space-3);
  --card-border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-Card:where([data-size="2"]) {
  --card-padding: var(--space-4);
  --card-border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-Card:where([data-size="3"]) {
  --card-padding: var(--space-5);
  --card-border-radius: max(var(--radius-5), var(--radius-full));
}
.ui-Card:where([data-size="4"]) {
  --card-padding: var(--space-6);
  --card-border-radius: max(var(--radius-5), var(--radius-full));
}
.ui-Card:where([data-size="5"]) {
  --card-padding: var(--space-8);
  --card-border-radius: max(var(--radius-6), var(--radius-full));
}
.ui-Card:where([data-variant="soft"]) {
  border-color: var(--gray-2);
  background-color: var(--gray-2);
}
.ui-Card:where([data-variant="soft"]):where(:any-link, button, label):where(:hover) {
  border-color: var(--gray-a5);
}
</style>
