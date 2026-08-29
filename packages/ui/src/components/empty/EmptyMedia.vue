<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface EmptyMediaProps extends PrimitiveProps {
  /**
   * Controls whether the media is presented as a plain visual or an icon tile.
   * @default "default"
   */
  variant?: 'default' | 'icon'
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { buildPropsClass, useForwardPropsWithout } from '../util'
import { injectEmptyContext } from './Empty.vue'

const props = withDefaults(defineProps<EmptyMediaProps>(), {
  as: 'div',
  variant: 'default',
})
const context = injectEmptyContext()
const forwarded = useForwardPropsWithout(props, ['variant'])
const resetClass = buildPropsClass(props, ['variant'])
</script>

<template>
  <Primitive
    v-bind="forwarded"
    class="ui-EmptyMedia"
    :class="[resetClass, `r-size-${context.size.value}`]"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-EmptyMedia {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-11);
  }

  .ui-EmptyMedia:where(.r-variant-icon) {
    width: var(--empty-media-size);
    height: var(--empty-media-size);
    border-radius: var(--empty-media-radius);
    background-color: var(--gray-a3);
    color: var(--gray-12);
  }

  .ui-EmptyMedia:where(.r-size-1) {
    --empty-media-size: var(--space-6);
    --empty-media-radius: max(var(--radius-2), var(--radius-full));
    font-size: var(--font-size-3);
  }

  .ui-EmptyMedia:where(.r-size-2) {
    --empty-media-size: var(--space-7);
    --empty-media-radius: max(var(--radius-3), var(--radius-full));
    font-size: var(--font-size-4);
  }

  .ui-EmptyMedia:where(.r-size-3) {
    --empty-media-size: var(--space-8);
    --empty-media-radius: max(var(--radius-4), var(--radius-full));
    font-size: var(--font-size-5);
  }
}
</style>
