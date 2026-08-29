<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type EmptyContentProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectEmptyContext } from './Empty.vue'

const props = withDefaults(defineProps<EmptyContentProps>(), { as: 'div' })
const context = injectEmptyContext()
</script>

<template>
  <Primitive
    v-bind="props"
    class="ui-EmptyContent"
    :class="`r-size-${context.size.value}`"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-EmptyContent {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--empty-gap);
  }
}
</style>
