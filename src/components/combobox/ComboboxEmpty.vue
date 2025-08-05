<script setup lang="ts">
import { ComboboxEmpty } from 'reka-ui'
</script>

<template>
  <ComboboxEmpty class="ui-ComboboxEmpty">
    <slot></slot>
  </ComboboxEmpty>
</template>

<style>
@layer components {
  .ui-ComboboxEmpty {
    box-sizing: border-box;
    outline: none;
    scroll-margin: var(--combobox-content-padding) 0;
    user-select: none;
    cursor: default;
    padding-left: calc(var(--combobox-indicator-width) / 2);
    padding-right: var(--combobox-indicator-width);
    font-size: var(--combobox-item-font-size);
    line-height: var(--combobox-item-line-height);
    letter-spacing: var(--combobox-item-letter-spacing);
    color: var(--gray-11);
  }
}
</style>
