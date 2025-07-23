<script lang="ts">
export interface CollapsibleIndicatorProps {
  variant?: 'chevron' | 'plus'
}
</script>

<script setup lang="ts">
withDefaults(defineProps<CollapsibleIndicatorProps>(), {
  variant: 'chevron',
})
</script>

<template>
  <div class="ui-CollapsibleIndicator">
    <svg
      v-if="variant == 'chevron'"
      class="ui-CollapsibleIndicator-chevron"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
    <div v-if="variant == 'plus'" class="ui-CollapsibleIndicator-plus">
      <span class="ui-CollapsibleIndicator-plus-1"></span>
      <span class="ui-CollapsibleIndicator-plus-2"></span>
    </div>
  </div>
</template>

<style>
.ui-CollapsibleIndicator {
  display: inline-flex;
  align-items: center;
  --collapsible-indicator-color: var(--gray-10);
}

.ui-CollapsibleIndicator-chevron {
  transition: transform 0.2s ease;
  font-size: var(--collapsible-indicator-icon-size);
  color: var(--collapsible-indicator-color);
}

:where(.ui-CollapsibleRoot[data-state="open"]) .ui-CollapsibleIndicator-chevron {
  transform: rotate(90deg);
}

.ui-CollapsibleIndicator-plus {
  position: relative;
  width: var(--collapsible-indicator-icon-size);
  height: var(--collapsible-indicator-icon-size);
  cursor: pointer;
  display: inline-block;
}

.ui-CollapsibleIndicator-plus-1,
.ui-CollapsibleIndicator-plus-2 {
  position: absolute;
  background-color: var(--collapsible-indicator-color);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.ui-CollapsibleIndicator-plus-1 {
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--collapsible-indicator-line-width);
  transform: translateY(-50%) rotate(0deg);
}

.ui-CollapsibleIndicator-plus-2 {
  top: 0;
  left: 50%;
  width: var(--collapsible-indicator-line-width);
  height: 100%;
  transform: translateX(-50%) rotate(0deg);
}

:where(.ui-CollapsibleRoot[data-state="open"]) .ui-CollapsibleIndicator-plus-1 {
  transform: translateY(-50%) rotate(180deg);
}

:where(.ui-CollapsibleRoot[data-state="open"]) .ui-CollapsibleIndicator-plus-2 {
  transform: translateX(-50%) rotate(90deg);
  opacity: 0;
  height: 0;
}
</style>
