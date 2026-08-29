<script lang="ts">
import type { PinInputInputProps as _PinInputInputProps } from 'reka-ui'

export type PinInputInputProps = _PinInputInputProps
</script>

<script setup lang="ts">
import { PinInputInput, useForwardExpose, useForwardProps } from 'reka-ui'

const props = withDefaults(defineProps<PinInputInputProps>(), {
  as: 'input',
})
const forwarded = useForwardProps(props)

useForwardExpose()
</script>

<template>
  <PinInputInput
    class="ui-PinInputInput"
    v-bind="forwarded"
  >
    <slot></slot>
  </PinInputInput>
</template>

<style>
@layer components {
  .ui-PinInputInput {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    flex: 0 0 var(--pin-input-size);
    width: var(--pin-input-size);
    height: var(--pin-input-size);
    padding: var(--pin-input-padding);
    border: var(--pin-input-border-width) solid var(--pin-input-border-color);
    border-radius: var(--pin-input-radius);
    outline: none;
    color: var(--gray-12);
    background-color: var(--color-surface);
    font: inherit;
    line-height: 1;
    text-align: center;
    font-variant-numeric: tabular-nums;
    caret-color: var(--accent-9);
    appearance: none;
  }
  .ui-PinInputRoot:where(.r-variant-surface) .ui-PinInputInput {
    background-color: var(--color-surface);
  }

  .ui-PinInputRoot:where(.r-variant-soft) .ui-PinInputInput {
    background-color: var(--accent-a3);
    color: var(--accent-12);
  }

  .ui-PinInputInput:where(:focus, :focus-visible) {
    box-shadow: 0 0 0 2px var(--pin-input-selection-color);
    border-color: var(--pin-input-focus-color);
  }

  .ui-PinInputInput::selection {
    background-color: var(--pin-input-selection-color);
  }

  .ui-PinInputInput::placeholder {
    color: var(--gray-a10);
    opacity: 1;
  }

  .ui-PinInputRoot:where(.r-variant-soft) .ui-PinInputInput::placeholder {
    color: var(--accent-12);
    opacity: 0.6;
  }

  .ui-PinInputInput:where(:disabled, [data-disabled]) {
    cursor: var(--cursor-disabled);
    color: var(--gray-a8);
    background-color: var(--gray-a3);
    -webkit-text-fill-color: var(--gray-a8);
  }

  .ui-PinInputInput:where(:disabled, [data-disabled])::placeholder {
    color: var(--gray-a8);
  }

  .ui-PinInputRoot:where(.r-variant-soft) .ui-PinInputInput:where(:disabled, [data-disabled]) {
    background-color: var(--gray-a3);
  }

  .ui-PinInputInput:where([data-complete]) {
    /* Completion describes input state, not validation success. */
  }
}
</style>
