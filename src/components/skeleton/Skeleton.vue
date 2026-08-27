<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { RadiusType } from '../types'

export interface SkeletonProps extends PrimitiveProps {
  /** Overrides the radius inherited from the theme. */
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { useForwardPropsWithout } from '../util'

const props = withDefaults(defineProps<SkeletonProps>(), {
  as: 'div',
})

const forwarded = useForwardPropsWithout(props, ['radius'])
</script>

<template>
  <Primitive
    v-bind="forwarded"
    class="ui-Skeleton"
    :data-radius="props.radius"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-Skeleton {
    display: block;
    min-height: var(--space-2);
    border-radius: max(var(--radius-2), var(--radius-full));
    background-color: var(--gray-a3);
    animation: ui-skeleton-pulse 1.5s ease-in-out infinite;
  }
}

@keyframes ui-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-Skeleton {
    animation: none;
  }
}
</style>
