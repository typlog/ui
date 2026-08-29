<script lang="ts">
import type { Ref } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import { createContext } from 'reka-ui'
import type { RadiusType } from '../types'

export interface EmptyProps extends PrimitiveProps {
  /**
   * Controls the spacing and typography of the empty state.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Overrides the radius inherited from the theme. */
  radius?: RadiusType
}

export interface EmptyContext {
  size: Ref<'1' | '2' | '3'>
}

export const [injectEmptyContext, provideEmptyContext] = createContext<EmptyContext>('ui:Empty')
</script>

<script setup lang="ts">
import { toRef } from 'vue'
import { Primitive } from 'reka-ui'
import { buildPropsClass, useForwardPropsWithout } from '../util'

const props = withDefaults(defineProps<EmptyProps>(), {
  as: 'div',
  size: '2',
})

const forwarded = useForwardPropsWithout(props, ['size', 'radius'])
const resetClass = buildPropsClass(props, ['size'])

provideEmptyContext({ size: toRef(props, 'size') })
</script>

<template>
  <Primitive
    v-bind="forwarded"
    class="ui-Empty"
    :class="resetClass"
    :data-radius="props.radius"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-Empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    padding: var(--empty-padding);
    gap: var(--empty-section-gap);
    border-radius: var(--empty-radius);
    text-align: center;
  }
  .ui-Empty:where(.r-size-1) {
    --empty-padding: var(--space-4);
    --empty-radius: max(var(--radius-2), var(--radius-full));
    --empty-section-gap: var(--space-3);
    --empty-gap: var(--space-1);
    --empty-title-font-size: var(--font-size-3);
    --empty-title-line-height: var(--line-height-3);
    --empty-description-font-size: var(--font-size-2);
    --empty-description-line-height: var(--line-height-2);
  }

  .ui-Empty:where(.r-size-2) {
    --empty-padding: var(--space-6);
    --empty-radius: max(var(--radius-3), var(--radius-full));
    --empty-section-gap: var(--space-4);
    --empty-gap: var(--space-2);
    --empty-title-font-size: var(--font-size-4);
    --empty-title-line-height: var(--line-height-4);
    --empty-description-font-size: var(--font-size-3);
    --empty-description-line-height: var(--line-height-3);
  }

  .ui-Empty:where(.r-size-3) {
    --empty-padding: var(--space-8);
    --empty-radius: max(var(--radius-4), var(--radius-full));
    --empty-section-gap: var(--space-5);
    --empty-gap: var(--space-3);
    --empty-title-font-size: var(--font-size-5);
    --empty-title-line-height: var(--line-height-5);
    --empty-description-font-size: var(--font-size-4);
    --empty-description-line-height: var(--line-height-4);
  }
}
</style>
