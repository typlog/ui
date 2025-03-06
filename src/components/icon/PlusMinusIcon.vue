<script lang="ts">
import type { ColorType } from '../types'

export interface PlusMinusIconProps {
  color?: ColorType
  size?: '1' | '2' | '3' | '4'
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<PlusMinusIconProps>(), {
  color: undefined,
  size: '1',
})
</script>

<template>
  <div class="ui-PlusMinusIcon" :class="`r-size-${props.size}`" :data-accent-color="props.color">
    <div class="ui-PlusMinusIcon-1"></div>
    <div class="ui-PlusMinusIcon-2"></div>
  </div>
</template>

<style>
.ui-PlusMinusIcon {
  position: relative;
  width: var(--plus-minus-icon-size);
  height: var(--plus-minus-icon-size);
  cursor: pointer;
  display: inline-block;
  --plus-minus-icon-color: var(--gray-11);
}

.ui-PlusMinusIcon:where([data-accent-color]) {
  --plus-minus-icon-color: var(--accent-9);
}

.ui-PlusMinusIcon:where(.r-size-1) {
  --plus-minus-icon-size: var(--font-size-3);
  --plus-minus-line-width: 1px;
}

.ui-PlusMinusIcon:where(.r-size-2) {
  --plus-minus-icon-size: var(--font-size-4);
  --plus-minus-line-width: 1px;
}

.ui-PlusMinusIcon:where(.r-size-3) {
  --plus-minus-icon-size: var(--font-size-5);
  --plus-minus-line-width: 2px;
}

.ui-PlusMinusIcon:where(.r-size-4) {
  --plus-minus-icon-size: var(--font-size-6);
  --plus-minus-line-width: 2px;
}

.ui-PlusMinusIcon-1,
.ui-PlusMinusIcon-2 {
  position: absolute;
  background-color: var(--plus-minus-icon-color);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.ui-PlusMinusIcon-1 {
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--plus-minus-line-width);
  transform: translateY(-50%) rotate(0deg);
}

.ui-PlusMinusIcon-2 {
  top: 0;
  left: 50%;
  width: var(--plus-minus-line-width);
  height: 100%;
  transform: translateX(-50%) rotate(0deg);
}

:where([data-state="open"]) .ui-PlusMinusIcon-1,
:where([aria-plus-minused="true"]) .ui-PlusMinusIcon-1 {
  transform: translateY(-50%) rotate(180deg);
}

:where([data-state="open"]) .ui-PlusMinusIcon-2,
:where([aria-plus-minused="true"]) .ui-PlusMinusIcon-2 {
  transform: translateX(-50%) rotate(90deg);
  opacity: 0;
  height: 0;
}
</style>
