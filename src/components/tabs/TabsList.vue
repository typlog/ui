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
import { computed } from 'vue'
import { TabsList, TabsIndicator } from 'reka-ui'
import { extractClass } from '../util'

const props = withDefaults(defineProps<TabsListProps>(), {
  variant: 'outline',
  size: '2',
})
const resetClass = computed(() => {
  return extractClass(props, ['variant', 'size', 'highContrast'])
})
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
  position: relative;
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;
  font-style: normal;
  scrollbar-width: none;
  box-shadow: inset 0 -1px 0 0 var(--gray-a5);
}
.ui-TabsIndicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  transition-property: width, transform;
  transition-duration: 300ms;
  width: var(--reka-tabs-indicator-size);
  background-color: var(--accent-indicator);
  transform: translateX(var(--reka-tabs-indicator-position));
}
.ui-TabList::-webkit-scrollbar {
  display: none;
}
.ui-TabList:where(.r-size-1) {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  --tab-height: var(--space-6);
  --tab-padding-x: var(--space-1);
  --tab-inner-padding-x: var(--space-1);
  --tab-inner-height: var(--space-5);
  --tab-inner-border-radius: var(--radius-1);
}
.ui-TabList:where(.r-size-2) {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  --tab-height: var(--space-7);
  --tab-padding-x: var(--space-2);
  --tab-inner-padding-x: var(--space-2);
  --tab-inner-height: calc(var(--space-6) - var(--space-1));
  --tab-inner-border-radius: var(--radius-2);
}
:where(.ui-TabList.r-high-contrast) .ui-TabsIndicator {
  background-color: var(--accent-12);
}
</style>
