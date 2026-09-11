<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'

export interface BreadcrumbItemProps {
  /** Link destination. Omit for the current page. */
  href?: string
  /**
   * Marks the item as the current page. Defaults to `true` when no link target
   * or custom component is provided.
   */
  current?: boolean
  /** The element or component used for the item's content. */
  as?: AsTag | Component
  /** Uses the slotted child as the item's link or current-page element. */
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import ChevronRightIcon from '~icons/radix-icons/chevron-right'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  current: undefined,
})
const isCurrent = computed(() => props.current ?? (!props.href && !props.as && !props.asChild))
const contentElement = computed(() => props.as ?? (props.href ? 'a' : 'span'))
</script>

<template>
  <li class="ui-BreadcrumbItem">
    <span
      class="ui-BreadcrumbSeparator"
      role="presentation"
      aria-hidden="true"
    >
      <ChevronRightIcon />
    </span>
    <Primitive
      v-bind="$attrs"
      :class="isCurrent ? 'ui-BreadcrumbPage' : 'ui-BreadcrumbLink'"
      :as="contentElement"
      :as-child="props.asChild"
      :href="props.href"
      :aria-current="isCurrent ? 'page' : undefined"
    >
      <slot></slot>
    </Primitive>
  </li>
</template>

<style>
@layer components {
  .ui-BreadcrumbItem {
    display: inline-flex;
    align-items: center;
    gap: var(--breadcrumb-gap);
    min-width: 0;
  }

  .ui-BreadcrumbItem:not(:first-child) {
    margin-inline-start: var(--breadcrumb-gap);
  }

  .ui-BreadcrumbItem:first-child > .ui-BreadcrumbSeparator {
    display: none;
  }

  .ui-BreadcrumbSeparator {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    color: var(--gray-a9);
  }

  .ui-BreadcrumbSeparator > :where(svg) {
    width: 1em;
    height: 1em;
  }

  :where([dir='rtl']) .ui-BreadcrumbSeparator > :where(svg) {
    transform: rotate(180deg);
  }

  .ui-BreadcrumbLink {
    color: inherit;
    text-decoration: none;
  }

  .ui-BreadcrumbLink:where(:hover) {
    color: var(--gray-12);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .ui-BreadcrumbLink:where(:focus-visible) {
    border-radius: max(var(--radius-1), var(--radius-full));
    outline: 2px solid var(--focus-8);
    outline-offset: 2px;
  }

  .ui-BreadcrumbPage {
    overflow: hidden;
    color: var(--gray-12);
    font-weight: var(--font-weight-medium);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
