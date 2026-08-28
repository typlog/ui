<script setup lang="ts">
  import ChevronIcon from '~icons/radix-icons/chevron-right'
</script>

<template>
  <ChevronIcon class="ui-CollapsibleIndicator" />
</template>

<style>
@layer components {
  .ui-CollapsibleIndicator {
    display: inline-flex;
    align-items: center;
    font-size: var(--collapsible-indicator-icon-size);
    transition: transform 0.2s ease;
    color: var(--gray-10);
  }
}

.ui-CollapsibleIndicator:where([data-side="left"]) {
  order: -1;
}

:where([aria-expanded="false"]) .ui-CollapsibleIndicator,
:where([data-state="closed"]) .ui-CollapsibleIndicator {
  transform: rotate(0);
}

:where([aria-expanded="true"]) .ui-CollapsibleIndicator,
:where([data-state="open"]) .ui-CollapsibleIndicator {
  transform: rotate(90deg);
}
</style>
