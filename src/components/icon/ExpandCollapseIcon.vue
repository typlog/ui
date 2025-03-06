<script lang="ts">
import type { ColorType } from '../types'

export interface ExpandCollapseIconProps {
  color?: ColorType
  size?: '1' | '2' | '3' | '4'
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ExpandCollapseIconProps>(), {
  color: undefined,
  size: '1',
})
</script>

<template>
  <div class="ui-ExpandCollapseIcon" :class="`r-size-${props.size}`" :data-accent-color="props.color">
    <div class="ui-ExpandCollapseIcon-1"></div>
    <div class="ui-ExpandCollapseIcon-2"></div>
  </div>
</template>

<style>
.ui-ExpandCollapseIcon {
  position: relative;
  width: var(--expand-icon-size);
  height: var(--expand-icon-size);
  cursor: pointer;
  display: inline-block;
  --expand-icon-color: var(--gray-11);
}

.ui-ExpandCollapseIcon:where([data-accent-color]) {
  --expand-icon-color: var(--accent-9);
}

.ui-ExpandCollapseIcon:where(.r-size-1) {
  --expand-icon-size: var(--font-size-3);
  --expand-line-width: 1px;
}

.ui-ExpandCollapseIcon:where(.r-size-2) {
  --expand-icon-size: var(--font-size-4);
  --expand-line-width: 1px;
}

.ui-ExpandCollapseIcon:where(.r-size-3) {
  --expand-icon-size: var(--font-size-5);
  --expand-line-width: 2px;
}

.ui-ExpandCollapseIcon:where(.r-size-4) {
  --expand-icon-size: var(--font-size-6);
  --expand-line-width: 2px;
}

.ui-ExpandCollapseIcon-1,
.ui-ExpandCollapseIcon-2 {
  position: absolute;
  background-color: var(--expand-icon-color);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.ui-ExpandCollapseIcon-1 {
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--expand-line-width);
  transform: translateY(-50%) rotate(0deg);
}

.ui-ExpandCollapseIcon-2 {
  top: 0;
  left: 50%;
  width: var(--expand-line-width);
  height: 100%;
  transform: translateX(-50%) rotate(0deg);
}

:where([data-state="open"]) .ui-ExpandCollapseIcon-1,
:where([aria-expanded="true"]) .ui-ExpandCollapseIcon-1 {
  transform: translateY(-50%) rotate(180deg);
}

:where([data-state="open"]) .ui-ExpandCollapseIcon-2,
:where([aria-expanded="true"]) .ui-ExpandCollapseIcon-2 {
  transform: translateX(-50%) rotate(90deg);
  opacity: 0;
  height: 0;
}
</style>
