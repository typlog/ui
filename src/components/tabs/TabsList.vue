<script lang="ts">
import type { ColorType } from '../types'

export interface TabsListProps {
  size?: '1' | '2'
  color?: ColorType
  variant?: 'outline' | 'surface' | 'soft'
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { TabsList, TabsIndicator } from 'reka-ui'
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<TabsListProps>(), {
  variant: 'outline',
  size: '2',
})
const resetClass = buildPropsClass(props, ['variant', 'size', 'highContrast'])
</script>

<template>
  <TabsList
    class="ui-TabList"
    :class="resetClass"
    :data-accent-color="props.color"
  >
    <TabsIndicator class="ui-TabsIndicator" />
    <slot></slot>
  </TabsList>
</template>

<style>
.ui-TabList {
  justify-content: flex-start;
  position: relative;
  overflow-x: auto;
  white-space: nowrap;
  font-style: normal;
  scrollbar-width: none;
}
.ui-TabList::-webkit-scrollbar {
  display: none;
}

.ui-TabList:where(.r-variant-outline, .r-variant-soft) {
  display: flex;
  box-shadow: inset 0 -1px 0 0 var(--gray-a5);
}

.ui-TabList:where(.r-variant-surface) {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px var(--gray-a6);
  border-radius: var(--tab-radius);
}

.ui-TabsIndicator {
  position: absolute;
  left: 0;
  transition-property: width, transform;
  transform: translateX(var(--reka-tabs-indicator-position));
  width: var(--reka-tabs-indicator-size);
}

.ui-TabList:where(.r-variant-outline) :where(.ui-TabsIndicator) {
  bottom: 0;
  height: 2px;
  background-color: var(--accent-indicator);
  transition-duration: 300ms;
}

.ui-TabList:where(.r-variant-surface) :where(.ui-TabsIndicator) {
  top: 0;
  height: var(--tab-inner-height);
  background-color: var(--accent-a3);
  transition-duration: 100ms;
}

.ui-TabList:where(.r-variant-soft) :where(.ui-TabsIndicator) {
  top: calc((var(--tab-height) - var(--tab-inner-height)) / 2);
  height: var(--tab-inner-height);
  background-color: var(--accent-a3);
  border-radius: var(--tab-item-radius);
  transition-duration: 100ms;
}

.ui-TabList:where(.r-size-1) {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  --tab-height: var(--space-6);
  --tab-padding-x: var(--space-1);
  --tab-radius: max(var(--radius-2), var(--radius-full));
  --tab-item-radius: var(--radius-1);
  --tab-inner-padding-x: var(--space-1);
  --tab-inner-height: var(--space-5);
}
.ui-TabList:where(.r-size-2) {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  --tab-height: var(--space-7);
  --tab-padding-x: var(--space-2);
  --tab-radius: max(var(--radius-3), var(--radius-full));
  --tab-item-radius: var(--radius-2);
  --tab-inner-padding-x: var(--space-2);
  --tab-inner-height: calc(var(--space-6) - var(--space-1));
}

.ui-TabList:where(.r-variant-surface) {
  --tab-item-radius: 0;
  --tab-inner-height: var(--tab-height);
}

.ui-TabList:where(.r-variant-soft) {
  padding-left: var(--tab-padding-x);
  padding-right: var(--tab-padding-x);
}

.ui-TabList:where(.r-variant-surface.r-size-1),
.ui-TabList:where(.r-variant-soft.r-size-1) {
  --tab-inner-padding-x: calc(var(--space-2) / 4 * 3);
}

:where(.ui-TabList.r-variant-outline.r-high-contrast) .ui-TabsIndicator {
  background-color: var(--accent-12);
}
</style>
