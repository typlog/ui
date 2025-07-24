<script lang="ts">
export interface AccordionIndicatorProps {
  /**
   * The indicator icon for the accordion trigger.
   * @default "chevron"
   */
  variant?: 'chevron' | 'plus'
}
</script>

<script setup lang="ts">
withDefaults(defineProps<AccordionIndicatorProps>(), {
  variant: 'chevron',
})
</script>

<template>
  <div class="ui-AccordionIndicator">
    <svg
      v-if="variant == 'chevron'"
      class="ui-AccordionIndicator-chevron"
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
    <div v-if="variant == 'plus'" class="ui-AccordionIndicator-plus">
      <span class="ui-AccordionIndicator-plus-1"></span>
      <span class="ui-AccordionIndicator-plus-2"></span>
    </div>
  </div>
</template>

<style>
.ui-AccordionIndicator {
  display: inline-flex;
  align-items: center;
  --accordion-indicator-color: var(--gray-10);
}

.ui-AccordionIndicator:where([data-side="left"]) {
  order: -1;
}

.ui-AccordionIndicator:where([data-side="right"]) {
  order: 0;
}

.ui-AccordionIndicator-chevron {
  transition: transform 0.2s ease;
  font-size: var(--accordion-indicator-icon-size);
  color: var(--accordion-indicator-color);
}

:where([data-state="open"]) .ui-AccordionIndicator-chevron {
  transform: rotate(90deg);
}

.ui-AccordionIndicator-plus {
  position: relative;
  width: calc(var(--accordion-indicator-icon-size) - var(--space-1));
  height: calc(var(--accordion-indicator-icon-size) - var(--space-1));
  cursor: pointer;
  display: inline-block;
}

.ui-AccordionIndicator-plus-1,
.ui-AccordionIndicator-plus-2 {
  position: absolute;
  background-color: var(--accordion-indicator-color);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}

.ui-AccordionIndicator-plus-1 {
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--accordion-indicator-line-width);
  transform: translateY(-50%) rotate(0deg);
}

.ui-AccordionIndicator-plus-2 {
  top: 0;
  left: 50%;
  width: var(--accordion-indicator-line-width);
  height: 100%;
  transform: translateX(-50%) rotate(0deg);
}

:where([data-state="open"]) .ui-AccordionIndicator-plus-1 {
  transform: translateY(-50%) rotate(180deg);
}

:where([data-state="open"]) .ui-AccordionIndicator-plus-2 {
  transform: translateX(-50%) rotate(90deg);
  opacity: 0;
  height: 0;
}
</style>
