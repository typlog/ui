<script lang="ts">
export interface BreadcrumbProps {
  /**
   * The accessible name for the navigation landmark.
   * @default "Breadcrumb"
   */
  label?: string
  /**
   * Controls the breadcrumb typography and spacing.
   * @default "2"
   */
  size?: '1' | '2' | '3'
}
</script>

<script setup lang="ts">
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  label: 'Breadcrumb',
  size: '2',
})

const resetClass = buildPropsClass(props, ['size'])
</script>

<template>
  <nav
    class="ui-Breadcrumb"
    :class="resetClass"
    :aria-label="props.label"
  >
    <ol class="ui-BreadcrumbList">
      <slot></slot>
    </ol>
  </nav>
</template>

<style>
@layer components {
  .ui-Breadcrumb {
    color: var(--gray-11);
  }

  .ui-Breadcrumb:where(.r-size-1) {
    --breadcrumb-gap: var(--space-1);
    --breadcrumb-font-size: var(--font-size-1);
    --breadcrumb-line-height: var(--line-height-1);
    --breadcrumb-letter-spacing: var(--letter-spacing-1);
  }

  .ui-Breadcrumb:where(.r-size-2) {
    --breadcrumb-gap: var(--space-2);
    --breadcrumb-font-size: var(--font-size-2);
    --breadcrumb-line-height: var(--line-height-2);
    --breadcrumb-letter-spacing: var(--letter-spacing-2);
  }

  .ui-Breadcrumb:where(.r-size-3) {
    --breadcrumb-gap: var(--space-3);
    --breadcrumb-font-size: var(--font-size-3);
    --breadcrumb-line-height: var(--line-height-3);
    --breadcrumb-letter-spacing: var(--letter-spacing-3);
  }

  .ui-BreadcrumbList {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: var(--breadcrumb-gap);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--breadcrumb-font-size);
    line-height: var(--breadcrumb-line-height);
    letter-spacing: var(--breadcrumb-letter-spacing);
  }
}
</style>
