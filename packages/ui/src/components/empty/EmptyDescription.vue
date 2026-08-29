<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type EmptyDescriptionProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectEmptyContext } from './Empty.vue'

const props = withDefaults(defineProps<EmptyDescriptionProps>(), { as: 'p' })
const context = injectEmptyContext()
</script>

<template>
  <Primitive
    v-bind="props"
    class="ui-EmptyDescription"
    :class="`r-size-${context.size.value}`"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-EmptyDescription {
    max-width: 40rem;
    margin: 0;
    color: var(--gray-11);
    font-size: var(--empty-description-font-size);
    line-height: var(--empty-description-line-height);
  }
}
</style>
