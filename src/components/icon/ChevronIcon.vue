<script lang="ts">
export interface ChevronIconProps {
  arrowTransform?: 'right-down' | 'right-up' | 'up-down' | 'down-up'
}
</script>

<script setup lang="ts">
withDefaults(defineProps<ChevronIconProps>(), {
  arrowTransform: 'right-down',
})
</script>

<template>
  <svg
    class="ui-ChevronIcon"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :data-arrow-transform="arrowTransform"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
</template>

<style>
.ui-ChevronIcon {
  transition: transform 0.2s ease;
}
.ui-ChevronIcon:where([data-arrow-transform="down-up"]) {
  transform: rotate(90deg);
}
.ui-ChevronIcon:where([data-arrow-transform="up-down"]) {
  transform: rotate(-90deg);
}
:where([data-state="open"]) .ui-ChevronIcon:where([data-arrow-transform="right-down"]),
:where([data-state="open"]) .ui-ChevronIcon:where([data-arrow-transform="up-down"]) {
  transform: rotate(90deg);
}
:where([data-state="open"]) .ui-ChevronIcon:where([data-arrow-transform="right-up"]),
:where([data-state="open"]) .ui-ChevronIcon:where([data-arrow-transform="down-up"]) {
  transform: rotate(-90deg);
}
</style>
