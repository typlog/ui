<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'
import type { ColorType } from './types'

export interface CardHeadProps extends PrimitiveProps {
  color?: ColorType
}

const props = withDefaults(defineProps<CardHeadProps>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    :as="props.as"
    class="ui-CardHead"
    :data-accent-color="props.color"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-CardHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: calc(0px - var(--card-padding));
  margin-right: calc(0px - var(--card-padding));
  margin-top: calc(0px - var(--card-padding));
  padding: var(--card-padding);
  --card-head-border-color: var(--card-border-color, var(--gray-a5));
  border-bottom: 1px solid var(--card-head-border-color);
}
.ui-CardHead:where(:any-link, button, label):where(:hover) {
  background-color: var(--accent-a3);
}
.ui-CardHead:where(:any-link, button, label):where(:focus-visible) {
  background-color: var(--accent-a4);
}
</style>
