<script lang="ts">
export interface ChevronIconProps {
  arrowTransform?: 'right-down' | 'right-up' | 'up-down' | 'down-up'
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<ChevronIconProps>(), {
  arrowTransform: 'right-down',
})
</script>

<template>
  <Icon class="ui-ChevronIcon" icon="lucide:chevron-right" :data-arrow-transform="arrowTransform" />
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
