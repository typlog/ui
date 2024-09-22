<script lang="ts">
import type { PrimitiveProps } from 'radix-vue'
import type { ColorType, RadiusType } from './types'

export interface ButtonProps extends PrimitiveProps {
  color?: ColorType
  radius?: RadiusType
  variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
  size?: '1' | '2' | '3' | '4'
  highContrast?: boolean
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { Primitive } from 'radix-vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  size: '2',
  variant: 'solid',
  highContrast: false,
})
const $attrs = useAttrs()
const attrs = computed(() => {
  const dataset: Record<string, any> = {
    'data-accent-color': props.color,
    'data-variant': props.variant,
    'data-radius': props.radius,
    'data-size': props.size,
  }
  if (props.highContrast) {
    dataset['data-high-contrast'] = true
  }
  if (props.disabled) {
    return {...$attrs, ...dataset, disabled: true, 'data-disabled': true}
  } else {
    return {...$attrs, ...dataset}
  }
})
</script>

<template>
  <Primitive
    class="ui-Button"
    :as-child="props.asChild"
    :as="props.as"
    v-bind="attrs"
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
  text-align: center;
  height: var(--button-height);
}
.ui-Button:where([data-variant="ghost"]) {
  box-sizing: content-box;
  /* Make sure that the height is not stretched in a Flex/Grid layout */
  height: fit-content;
}
.ui-Button:where(:not([data-variant="ghost"])) {
  font-weight: var(--font-weight-medium);
}

.ui-Button:where([data-disabled]) {
  cursor: not-allowed;
}

.ui-Button[data-size="1"] {
  gap: var(--space-1);
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  --button-height: var(--space-5);
  border-radius: max(var(--radius-1), var(--radius-full));
}
.ui-Button[data-size="1"]:where(:not([data-variant="ghost"])) {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}
.ui-Button[data-size="1"]:where([data-variant="ghost"]) {
  gap: var(--space-1);
  --button-ghost-padding-x: var(--space-2);
  --button-ghost-padding-y: var(--space-1);
}
.ui-Button[data-size="2"] {
  gap: var(--space-2);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  --button-height: var(--space-6);
  border-radius: max(var(--radius-2), var(--radius-full));
}
.ui-Button[data-size="2"]:where(:not([data-variant="ghost"])) {
  padding-left: var(--space-3);
  padding-right: var(--space-3);
}
.ui-Button[data-size="2"]:where([data-variant="ghost"]) {
  gap: var(--space-1);
  --button-ghost-padding-x: var(--space-2);
  --button-ghost-padding-y: var(--space-1);
}
.ui-Button[data-size="3"] {
  gap: var(--space-3);
  font-size: var(--font-size-3);
  line-height: var(--line-height-3);
  letter-spacing: var(--letter-spacing-3);
  --button-height: var(--space-7);
  border-radius: max(var(--radius-3), var(--radius-full));
}
.ui-Button[data-size="3"]:where(:not([data-variant="ghost"])) {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}
.ui-Button[data-size="3"]:where([data-variant="ghost"]) {
  gap: var(--space-2);
  --button-ghost-padding-x: var(--space-3);
  --button-ghost-padding-y: calc(var(--space-1) * 1.5);
}
.ui-Button[data-size="4"] {
  gap: var(--space-3);
  font-size: var(--font-size-4);
  line-height: var(--line-height-4);
  letter-spacing: var(--letter-spacing-4);
  --button-height: var(--space-8);
  border-radius: max(var(--radius-4), var(--radius-full));
}
.ui-Button[data-size="4"]:where(:not([data-variant="ghost"])) {
  padding-left: var(--space-5);
  padding-right: var(--space-5);
}
.ui-Button[data-size="4"]:where([data-variant="ghost"]) {
  gap: var(--space-2);
  --button-ghost-padding-x: var(--space-4);
  --button-ghost-padding-y: var(--space-2);
}

/* solid */
.radix-ui {
  --button-solid-active-filter: brightness(0.92) saturate(1.1);
  --button-solid-high-contrast-hover-filter: contrast(0.88) saturate(1.1) brightness(1.1);
  --button-solid-high-contrast-active-filter: contrast(0.82) saturate(1.2) brightness(1.16);
}

:is(.dark, .dark-theme) .radix-ui {
  --button-solid-active-filter: brightness(1.08);
  --button-solid-high-contrast-hover-filter: contrast(0.88) saturate(1.3) brightness(1.18);
  --button-solid-high-contrast-active-filter: brightness(0.95) saturate(1.2);
}

.ui-Button[data-variant="solid"] {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
@media (hover: hover) {
  .ui-Button[data-variant="solid"]:where(:hover) {
    background-color: var(--accent-10);
  }
}
.ui-Button[data-variant="solid"]:where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
.ui-Button[data-variant="solid"]:where([data-high-contrast="true"]) {
  background-color: var(--accent-12);
  color: var(--gray-1);
}
@media (hover: hover) {
  .ui-Button[data-variant="solid"]:where([data-high-contrast="true"]:hover) {
    background-color: var(--accent-12);
    filter: var(--button-solid-high-contrast-hover-filter);
  }
}
.ui-Button[data-variant="solid"]:where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
  outline: none;
  filter: none;
}

/* soft / ghost */
.ui-Button:where([data-variant="soft"], [data-variant="ghost"]) {
  color: var(--accent-a11);
}
.ui-Button:where([data-variant="soft"], [data-variant="ghost"]):where([data-high-contrast="true"]) {
  color: var(--accent-12);
}
.ui-Button:where([data-variant="soft"], [data-variant="ghost"]):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}

.ui-Button[data-variant="soft"] {
  background-color: var(--accent-a3);
}
@media (hover: hover) {
  .ui-Button[data-variant="soft"]:where(:hover) {
    background-color: var(--accent-a4);
  }
}
.ui-Button[data-variant="soft"]:where(:focus-visible) {
  outline: 2px solid var(--accent-8);
  outline-offset: -1px;
}
.ui-Button[data-variant="soft"]:where([data-disabled]) {
  color: var(--gray-a8);
  background-color: var(--gray-a3);
}

.ui-Button:where([data-variant="ghost"]) {
  padding: var(--button-ghost-padding-y) var(--button-ghost-padding-x);
}
@media (hover: hover) {
  .ui-Button:where([data-variant="ghost"]):where(:hover) {
    background-color: var(--accent-a3);
  }
}
.ui-Button:where([data-variant="ghost"]):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}
.ui-Button:where([data-variant="ghost"]):where([data-disabled]) {
  color: var(--gray-a8);
  background-color: transparent;
}

/* outline */
.ui-Button[data-variant="outline"] {
  box-shadow: inset 0 0 0 1px var(--accent-a8);
  color: var(--accent-a11);
}
@media (hover: hover) {
  .ui-Button[data-variant="outline"]:where(:hover) {
    background-color: var(--accent-a2);
  }
}
.ui-Button[data-variant="outline"]:where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}
.ui-Button[data-variant="outline"]:where([data-high-contrast="true"]) {
  box-shadow: inset 0 0 0 1px var(--accent-a7), inset 0 0 0 1px var(--gray-a11);
  color: var(--accent-12);
}
.ui-Button[data-variant="outline"]:where([data-disabled]) {
  color: var(--gray-a8);
  box-shadow: inset 0 0 0 1px var(--gray-a7);
  background-color: transparent;
}

/* surface */
.ui-Button[data-variant="surface"] {
  background-color: var(--accent-surface);
  box-shadow: inset 0 0 0 1px var(--accent-a7);
  color: var(--accent-a11);
}
@media (hover: hover) {
  .ui-Button[data-variant="surface"]:where(:hover) {
    box-shadow: inset 0 0 0 1px var(--accent-a8);
  }
}
.ui-Button[data-variant="surface"]:where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}
.ui-Button[data-variant="surface"]:where([data-high-contrast="true"]) {
  color: var(--accent-12);
}
.ui-Button[data-variant="surface"]:where([data-disabled]) {
  color: var(--gray-a8);
  box-shadow: inset 0 0 0 1px var(--gray-a6);
  background-color: var(--gray-a2);
}
</style>
