<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface ButtonProps {
  /**
   * The visual variant to apply.
   * @default "solid"
   */
  variant?: 'classic' | 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
  /** Overrides the accent color inherited from the Theme. */
  color?: ColorType
  /** Overrides the radius inherited from the theme. */
  radius?: RadiusType
  /**
   * Control the size of the button.
   * @default "2"
   */
  size?: '1' | '2' | '3' | '4'
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
  /** Mark the button as disabled. */
  disabled?: boolean
  /**
   * The element or component this component should render as.
   * @default "button"
   */
  as?: AsTag | Component
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { extractClass } from '../util'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  size: '2',
  variant: 'solid',
  highContrast: false,
})

const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant', 'highContrast'])
})
</script>

<template>
  <Primitive
    class="ui-Button"
    :class="resetClass"
    :as-child="props.asChild"
    :as="props.as"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :data-disabled="props.disabled ? true : undefined"
    :disabled="props.disabled && props.as === 'button' ? true : undefined"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  user-select: none;
  vertical-align: top;
  font-style: normal;
  font-weight: var(--button-font-weight);
  text-align: center;
  white-space: nowrap;
  height: var(--button-height);
  padding-left: var(--button-padding-x);
  padding-right: var(--button-padding-x);
}

.ui-Button:where(.r-variant-ghost) {
  --button-font-weight: var(--font-weight-regular);
}

.ui-Button:where(:not(.r-variant-ghost)) {
  --button-font-weight: var(--font-weight-medium);
}

.ui-Button:where([data-disabled]) {
  cursor: not-allowed;
}

.ui-Button:where(.r-size-1) {
  gap: var(--space-1);
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  border-radius: max(var(--radius-1), var(--radius-full));
  --button-height: var(--space-5);
  --button-padding-x: var(--space-2);
}
.ui-Button:where(.r-size-1):where(.r-variant-ghost) {
  --button-ghost-padding-y: var(--space-1);
}
.ui-Button:where(.r-size-2) {
  gap: var(--space-2);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  border-radius: max(var(--radius-2), var(--radius-full));
  --button-height: var(--space-6);
  --button-padding-x: var(--space-3);
}
.ui-Button:where(.r-size-2):where(.r-variant-ghost) {
  gap: var(--space-1);
  --button-padding-x: var(--space-2);
  --button-ghost-padding-y: var(--space-1);
}
.ui-Button:where(.r-size-3) {
  gap: var(--space-3);
  font-size: var(--font-size-3);
  line-height: var(--line-height-3);
  letter-spacing: var(--letter-spacing-3);
  border-radius: max(var(--radius-3), var(--radius-full));
  --button-height: var(--space-7);
  --button-padding-x: var(--space-4);
}
.ui-Button:where(.r-size-3):where(.r-variant-ghost) {
  gap: var(--space-2);
  --button-padding-x: var(--space-3);
  --button-ghost-padding-y: calc(var(--space-1) * 1.5);
}
.ui-Button:where(.r-size-4) {
  gap: var(--space-3);
  font-size: var(--font-size-4);
  line-height: var(--line-height-4);
  letter-spacing: var(--letter-spacing-4);
  border-radius: max(var(--radius-4), var(--radius-full));
  --button-height: var(--space-8);
  --button-padding-x: var(--space-5);
}
.ui-Button:where(.r-size-4):where(.r-variant-ghost) {
  gap: var(--space-2);
  --button-padding-x: var(--space-4);
  --button-ghost-padding-y: var(--space-2);
}

/* solid */
.ui-root {
  --button-solid-active-filter: brightness(0.92) saturate(1.1);
  --button-solid-high-contrast-hover-filter: contrast(0.88) saturate(1.1) brightness(1.1);
}

:is(.dark, .dark-theme) .ui-root {
  --button-solid-active-filter: brightness(1.08);
  --button-solid-high-contrast-hover-filter: contrast(0.88) saturate(1.3) brightness(1.18);
}

.ui-Button:where(.r-variant-solid) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-solid):where(:hover) {
    background-color: var(--accent-10);
  }
}
.ui-Button:where(.r-variant-solid):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-Button:where(.r-variant-solid):where(:active) {
  background-color: var(--accent-10);
  filter: var(--button-solid-active-filter);
}
.ui-Button:where(.r-variant-solid):where(.r-high-contrast) {
  background-color: var(--accent-12);
  color: var(--gray-1);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-solid):where(.r-high-contrast:hover) {
    background-color: var(--accent-12);
    filter: var(--button-solid-high-contrast-hover-filter);
  }
}
.ui-Button:where(.r-variant-solid):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
  outline: none;
  filter: none;
}

/* soft / ghost */
.ui-Button:where(.r-variant-soft, .r-variant-ghost) {
  color: var(--accent-a11);
}
.ui-Button:where(.r-variant-soft, .r-variant-ghost):where(.r-high-contrast) {
  color: var(--accent-12);
}
.ui-Button:where(.r-variant-soft):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}

.ui-Button:where(.r-variant-soft) {
  background-color: var(--accent-a3);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-soft):where(:hover) {
    background-color: var(--accent-a4);
  }
}
.ui-Button:where(.r-variant-soft):where(:focus-visible) {
  outline: 2px solid var(--accent-8);
  outline-offset: -1px;
}
.ui-Button:where(.r-variant-soft):where(:active) {
  background-color: var(--accent-a5);
}
.ui-Button:where(.r-variant-soft):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}

.ui-Button:where(.r-variant-ghost) {
  padding: var(--button-ghost-padding-y) var(--button-padding-x);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-ghost):where(:hover) {
    background-color: var(--accent-a3);
  }
}
.ui-Button:where(.r-variant-ghost):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}
.ui-Button:where(.r-variant-ghost):where(:active) {
  background-color: var(--accent-a4);
}
.ui-Button:where(.r-variant-ghost):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: transparent;
}

/* classic */
.ui-Button:where(.r-variant-classic) {
  box-shadow: var(--shadow-2);
  background-color: var(--color-background);
}
.ui-Button:where(.r-variant-classic):where(.r-high-contrast) {
  color: var(--gray-12);
  box-shadow: 0 0 0 1px var(--gray-a6), 0 1px 1px 0 var(--black-a4), 0 2px 1px -1px var(--black-a2), 0 1px 3px 0 var(--black-a1);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-classic):where(:hover) {
    color: var(--accent-a11);
    background-color: var(--gray-a2);
  }
  .ui-Button:where(.r-variant-classic):where(.r-high-contrast):where(:hover) {
    color: var(--accent-12);
  }
}
.ui-Button:where(.r-variant-classic):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-Button:where(.r-variant-classic):where(:active:not([data-disabled])) {
  box-shadow: var(--shadow-1);
}
.ui-Button:where(.r-variant-classic):where([data-disabled]) {
  color: var(--gray-a10);
  background-color: var(--gray-a2);
}

/* outline */
.ui-Button:where(.r-variant-outline) {
  box-shadow: inset 0 0 0 1px var(--accent-a8);
  color: var(--accent-a11);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-outline):where(:hover) {
    background-color: var(--accent-a2);
  }
}
.ui-Button:where(.r-variant-outline):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}
.ui-Button:where(.r-variant-outline):where(.r-high-contrast) {
  box-shadow: inset 0 0 0 1px var(--accent-a7), inset 0 0 0 1px var(--gray-a11);
  color: var(--accent-12);
}
.ui-Button:where(.r-variant-outline):where(:active) {
  background-color: var(--accent-a4);
}
.ui-Button:where(.r-variant-outline):where([data-disabled]) {
  color: var(--gray-a8);
  box-shadow: inset 0 0 0 1px var(--gray-a7);
  background-color: transparent;
}

/* surface */
.ui-Button:where(.r-variant-surface) {
  background-color: var(--accent-surface);
  box-shadow: inset 0 0 0 1px var(--accent-a7);
  color: var(--accent-a11);
}
@media (hover: hover) {
  .ui-Button:where(.r-variant-surface):where(:hover) {
    box-shadow: inset 0 0 0 1px var(--accent-a8);
  }
}
.ui-Button:where(.r-variant-surface):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}
.ui-Button:where(.r-variant-surface):where(.r-high-contrast) {
  color: var(--accent-12);
}
.ui-Button:where(.r-variant-surface):where(:active) {
  background-color: var(--accent-a4);
}
.ui-Button:where(.r-variant-surface):where([data-disabled]) {
  color: var(--gray-a8);
  box-shadow: inset 0 0 0 1px var(--gray-a6);
  background-color: var(--gray-a2);
}
</style>
