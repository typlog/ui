<template>
  <div
    class="ui-SelectSeparator"
    aria-hidden="true"
  >
  </div>
</template>

<style>
@layer components {
  .ui-SelectSeparator {
    height: 1px;
    margin-top: var(--space-2);
    margin-bottom: var(--space-2);
    margin-left: var(--select-item-indicator-width);
    margin-right: var(--select-separator-margin-right);
    background-color: var(--gray-a6);
  }
}
</style>
