<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'
import type { ColorType } from '../types'

export interface CalloutProps {
  /** Iconify icon rendered before the content. */
  icon?: string
  /** Optional heading rendered above the message. */
  title?: string
  /** Overrides the accent color inherited from the theme. */
  color?: ColorType
  /**
   * Controls the spacing and typography of the callout.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /**
   * The visual treatment of the callout.
   * @default "soft"
   */
  variant?: 'soft' | 'surface' | 'outline'
  /** Uses a higher contrast text color. */
  highContrast?: boolean
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: AsTag | Component
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Primitive } from 'reka-ui'
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<CalloutProps>(), {
  as: 'div',
  size: '2',
  variant: 'soft',
  highContrast: undefined,
})
defineSlots<{
  /** The callout message. */
  default?: () => any
  /** Replaces the leading `icon` prop. */
  icon?: () => any
  /** Replaces the `title` prop. */
  title?: () => any
}>()

const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <Primitive
    class="ui-Callout"
    :class="resetClass"
    :as="props.as"
    :data-accent-color="props.color"
  >
    <span
      v-if="$slots.icon || props.icon"
      class="ui-CalloutIcon"
      aria-hidden="true"
    >
      <slot name="icon">
        <Icon :icon="props.icon!" />
      </slot>
    </span>
    <div class="ui-CalloutContent">
      <div v-if="$slots.title || props.title" class="ui-CalloutTitle">
        <slot name="title">{{ props.title }}</slot>
      </div>
      <div class="ui-CalloutText">
        <slot></slot>
      </div>
    </div>
  </Primitive>
</template>

<style>
@layer components {
  .ui-Callout {
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    width: 100%;
    border-radius: max(var(--callout-radius), var(--radius-full));
    font-size: var(--callout-font-size);
    line-height: var(--callout-line-height);
    letter-spacing: var(--callout-letter-spacing);
  }

  .ui-Callout:where(.r-size-1) {
    --callout-radius: var(--radius-3);
    --callout-font-size: var(--font-size-2);
    --callout-line-height: var(--line-height-2);
    --callout-letter-spacing: var(--letter-spacing-2);

    gap: var(--space-2);
    padding: var(--space-3);
  }

  .ui-Callout:where(.r-size-2) {
    --callout-radius: var(--radius-4);
    --callout-font-size: var(--font-size-2);
    --callout-line-height: var(--line-height-2);
    --callout-letter-spacing: var(--letter-spacing-2);

    row-gap: var(--space-2);
    column-gap: var(--space-3);
    padding: var(--space-4);
  }

  .ui-Callout:where(.r-size-3) {
    --callout-radius: var(--radius-5);
    --callout-font-size: var(--font-size-3);
    --callout-line-height: var(--line-height-3);
    --callout-letter-spacing: var(--letter-spacing-3);

    row-gap: var(--space-3);
    column-gap: var(--space-4);
    padding: var(--space-5);
  }

  .ui-Callout:where(.r-variant-soft) {
    background-color: var(--accent-a3);
    color: var(--accent-a11);
  }

  .ui-Callout:where(.r-variant-surface) {
    background-color: var(--accent-a2);
    box-shadow: inset 0 0 0 1px var(--accent-a6);
    color: var(--accent-a11);
  }

  .ui-Callout:where(.r-variant-outline) {
    box-shadow: inset 0 0 0 1px var(--accent-a7);
    color: var(--accent-a11);
  }

  .ui-Callout:where(.r-high-contrast) {
    color: var(--accent-12);
  }

  .ui-CalloutIcon {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: var(--callout-line-height);
  }

  .ui-CalloutIcon > :where(svg) {
    width: 1em;
    height: 1em;
  }

  .ui-CalloutContent {
    flex: 1 1 auto;
    min-width: 0;
  }

  .ui-CalloutTitle {
    color: var(--accent-12);
    font-weight: var(--font-weight-semibold);
  }

  .ui-CalloutText {
    min-width: 0;
  }

  .ui-CalloutTitle + .ui-CalloutText {
    margin-top: var(--space-1);
  }
}
</style>
