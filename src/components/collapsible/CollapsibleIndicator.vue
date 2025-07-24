<template>
  <svg
    class="ui-CollapsibleIndicator"
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
</template>

<style>
.ui-CollapsibleIndicator {
  display: inline-flex;
  align-items: center;
  font-size: var(--collapsible-indicator-icon-size);
  transition: transform 0.2s ease;
  color: var(--gray-10);
}

.ui-CollapsibleIndicator:where([data-side="left"]) {
  order: -1;
}

:where([data-state="open"]) .ui-CollapsibleIndicator {
  transform: rotate(90deg);
}
</style>
