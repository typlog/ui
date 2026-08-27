<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type EmptyHeaderProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { injectEmptyContext } from './Empty.vue'

const props = withDefaults(defineProps<EmptyHeaderProps>(), { as: 'div' })
const context = injectEmptyContext()
</script>

<template>
  <Primitive
    v-bind="props"
    class="ui-EmptyHeader"
    :class="`r-size-${context.size.value}`"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-EmptyHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--empty-gap);
}
</style>
