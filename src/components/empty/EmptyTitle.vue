<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type EmptyTitleProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectEmptyContext } from './Empty.vue'

const props = withDefaults(defineProps<EmptyTitleProps>(), { as: 'h3' })
const context = injectEmptyContext()
</script>

<template>
  <Primitive
    v-bind="props"
    class="ui-EmptyTitle"
    :class="`r-size-${context.size.value}`"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-EmptyTitle {
  margin: 0;
  color: var(--gray-12);
  font-size: var(--empty-title-font-size);
  font-weight: var(--font-weight-semibold);
  line-height: var(--empty-title-line-height);
}
</style>
