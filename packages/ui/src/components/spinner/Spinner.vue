<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ColorType } from '../types'

export interface SpinnerProps extends PrimitiveProps {
  /**
   * Controls the size of the spinner.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Overrides the accent color inherited from the theme. */
  color?: ColorType
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { buildPropsClass, useForwardPropsWithout } from '../util'

const props = withDefaults(defineProps<SpinnerProps>(), {
  as: 'span',
  size: '2',
})

const attrs = useAttrs()
const hasAccessibleName = computed(() => Boolean(
  attrs['aria-label'] || attrs['aria-labelledby'],
))
const hasExplicitRole = computed(() => attrs.role != null)
const isDecorative = computed(() => (
  !hasAccessibleName.value
  && !hasExplicitRole.value
  && attrs['aria-hidden'] == null
))
const rootRole = computed(() => attrs.role ?? (hasAccessibleName.value ? 'status' : undefined))
const rootAriaHidden = computed(() => attrs['aria-hidden'] ?? (isDecorative.value ? true : undefined))
const forwarded = useForwardPropsWithout(props, ['size', 'color'])
const resetClass = buildPropsClass(props, ['size'])
</script>

<template>
  <Primitive
    v-bind="forwarded"
    class="ui-Spinner"
    :class="resetClass"
    :data-accent-color="props.color"
    :role="rootRole"
    :aria-hidden="rootAriaHidden"
  >
    <svg
      class="ui-SpinnerGraphic"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        class="ui-SpinnerTrack"
        cx="12"
        cy="12"
        r="9"
      />
      <circle
        class="ui-SpinnerIndicator"
        cx="12"
        cy="12"
        r="9"
      />
    </svg>
    <slot></slot>
  </Primitive>
</template>

<style>
@layer components {
  .ui-Spinner {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--spinner-size);
    height: var(--spinner-size);
    color: var(--accent-9);
    vertical-align: middle;
  }

  .ui-SpinnerGraphic {
    display: block;
    width: 100%;
    height: 100%;
    animation: ui-spin 800ms linear infinite;
  }

  .ui-SpinnerTrack,
  .ui-SpinnerIndicator {
    fill: none;
    stroke-linecap: round;
    stroke-width: var(--spinner-stroke-width);
  }

  .ui-SpinnerTrack {
    stroke: var(--accent-a4);
  }

  .ui-SpinnerIndicator {
    stroke: currentColor;
    stroke-dasharray: 42 56.5;
    stroke-dashoffset: 0;
  }
}

.ui-Spinner:where(.r-size-1) {
  --spinner-size: var(--space-3);
  --spinner-stroke-width: 2.5;
}

.ui-Spinner:where(.r-size-2) {
  --spinner-size: var(--space-4);
  --spinner-stroke-width: 2.25;
}

.ui-Spinner:where(.r-size-3) {
  --spinner-size: var(--space-5);
  --spinner-stroke-width: 2;
}

@media (prefers-reduced-motion: reduce) {
  .ui-SpinnerGraphic {
    animation: none;
  }
}
</style>
