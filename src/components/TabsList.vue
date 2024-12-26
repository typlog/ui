<script lang="ts">
import type { ColorType } from './types'

export interface TabsListProps {
  size?: '1' | '2'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justify?: 'start' | 'center' | 'end'
  color?: ColorType
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { TabsList } from 'reka-ui'

const props = withDefaults(defineProps<TabsListProps>(), {
  size: '2',
})
</script>

<template>
  <TabsList
    class="ui-TabList"
    :data-accent-color="props.color"
    :data-size="props.size"
    :data-wrap="props.wrap"
    :data-justify="props.justify"
    :data-high-contrast="props.highContrast"
  >
    <slot></slot>
  </TabsList>
</template>

<style>
.ui-TabList {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;
  font-style: normal;
  scrollbar-width: none;
  box-shadow: inset 0 -1px 0 0 var(--gray-a5);
}
.ui-TabList::-webkit-scrollbar {
  display: none;
}
.ui-TabList[data-size="1"] {
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  --tab-height: var(--space-6);
  --tab-padding-x: var(--space-1);
  --tab-inner-padding-x: var(--space-1);
  --tab-inner-padding-y: calc(var(--space-1) * 0.5);
  --tab-inner-border-radius: var(--radius-1);
}
.ui-TabList[data-size="2"] {
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  --tab-height: var(--space-7);
  --tab-padding-x: var(--space-2);
  --tab-inner-padding-x: var(--space-2);
  --tab-inner-padding-y: var(--space-1);
  --tab-inner-border-radius: var(--radius-2);
}
</style>
