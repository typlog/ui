<script lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'radix-vue'
import type { ColorType, RadiusType } from './types'

export interface SwitchProps extends SwitchRootProps {
  color?: ColorType
  variant?: 'surface' | 'soft'
  size?: '1' | '2' | '3'
  highContrast?: boolean
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { useForwardPropsEmits } from './util'

const emits = defineEmits<SwitchRootEmits>()

const props = withDefaults(defineProps<SwitchProps>(), {
  size: '2',
  variant: 'surface',
})
const forwarded = useForwardPropsEmits(props, emits, [
  'color', 'size', 'variant', 'highContrast', 'radius',
])
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    class="ui-Switch"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :data-high-contrast="props.highContrast"
  >
    <SwitchThumb class="ui-SwitchThumb" />
  </SwitchRoot>
</template>

<style>
.radix-ui {
  --switch-disabled-blend-mode: multiply;
  --switch-high-contrast-checked-color-overlay: var(--black-a8);
  --switch-high-contrast-checked-active-before-filter: contrast(0.82) saturate(1.2) brightness(1.16);
  --switch-surface-checked-active-filter: brightness(0.92) saturate(1.1);
}

:is(.dark, .dark-theme) .radix-ui {
  --switch-disabled-blend-mode: screen;
  --switch-high-contrast-checked-color-overlay: transparent;
  --switch-high-contrast-checked-active-before-filter: brightness(1.08);
  --switch-surface-checked-active-filter: brightness(1.08);
}

.ui-Switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  flex-shrink: 0;

  height: var(--switch-height);
  --switch-width: calc(var(--switch-height) * 1.75);
  --switch-thumb-inset: 1px;
  --switch-thumb-size: calc(var(--switch-height) - var(--switch-thumb-inset) * 2);
  --switch-thumb-translate-x: calc(var(--switch-width) - var(--switch-height));
}

.ui-Switch::before {
  content: '';
  display: block;
  width: var(--switch-width);
  height: var(--switch-height);
  border-radius: var(--switch-border-radius);
  transition: background-position, background-color, box-shadow, filter;
  transition-timing-function: linear, ease-in-out, ease-in-out, ease-in-out;
  background-repeat: no-repeat;
  background-size: calc(var(--switch-width) * 2 + var(--switch-height)) 100%;
}

.ui-Switch:where([data-state='unchecked'])::before {
  transition-duration: 120ms, 140ms, 140ms, 140ms;
  background-position-x: 100%;
}

.ui-Switch:where([data-state='checked'])::before {
  transition-duration: 160ms, 140ms, 140ms, 140ms;
  background-position: 0%;
}

.ui-Switch:where(:active)::before {
  transition-duration: 30ms;
}

.ui-Switch:where(:focus-visible)::before {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}

.ui-Switch::before {
  cursor: default;
}

.ui-Switch:where([data-disabled])::before {
  cursor: not-allowed;
}

.ui-SwitchThumb {
  background-color: white;
  position: absolute;
  left: var(--switch-thumb-inset);
  width: var(--switch-thumb-size);
  height: var(--switch-thumb-size);
  border-radius: calc(var(--switch-border-radius) - var(--switch-thumb-inset));
  transition: transform 140ms cubic-bezier(0.45, 0.05, 0.55, 0.95), box-shadow 140ms ease-in-out;
}
.ui-SwitchThumb:where([data-state='checked']) {
  transform: translateX(var(--switch-thumb-translate-x));
}

.ui-Switch[data-size="1"] {
  --switch-height: var(--space-4);
  --switch-border-radius: max(var(--radius-1), var(--radius-thumb));
}
.ui-Switch[data-size="2"] {
  --switch-height: calc(var(--space-5) * 5 / 6);
  --switch-border-radius: max(var(--radius-2), var(--radius-thumb));
}
.ui-Switch[data-size="3"] {
  --switch-height: var(--space-5);
  --switch-border-radius: max(var(--radius-2), var(--radius-thumb));
}

.ui-Switch[data-variant="surface"]::before {
  background-color: var(--gray-a3);
  background-image: linear-gradient(to right, var(--accent-track) 40%, transparent 60%);
  box-shadow: inset 0 0 0 1px var(--gray-a5);
}

.ui-Switch[data-variant="surface"]:where(:active)::before {
  background-color: var(--gray-a4);
}

.ui-Switch[data-variant="surface"]:where([data-state='checked']:active)::before {
  filter: var(--switch-surface-checked-active-filter);
}

.ui-Switch[data-variant="surface"][data-high-contrast="true"]::before {
  background-image:
    linear-gradient(to right, var(--switch-high-contrast-checked-color-overlay) 40%, transparent 60%),
    linear-gradient(to right, var(--accent-track) 40%, transparent 60%);
}
.ui-Switch[data-variant="surface"][data-high-contrast="true"]:where([data-state='checked']:active)::before {
  filter: var(--switch-high-contrast-checked-active-before-filter);
}
.ui-Switch[data-variant="surface"]:where([data-disabled]) {
  mix-blend-mode: var(--switch-disabled-blend-mode);
}

.ui-Switch[data-variant="surface"]:where([data-disabled])::before {
  filter: none;
  background-image: none;
  background-color: var(--gray-a3);
  box-shadow: inset 0 0 0 1px var(--gray-a3);
}

.ui-Switch[data-variant="surface"] .ui-SwitchThumb:where([data-state='unchecked']) {
  box-shadow: 0 0 1px 1px var(--black-a2), 0 1px 1px var(--black-a1), 0 2px 4px -1px var(--black-a1);
}

.ui-Switch[data-variant="surface"] .ui-SwitchThumb:where([data-state='checked']) {
  box-shadow: 0 1px 3px var(--black-a2), 0 2px 4px -1px var(--black-a1), 0 0 0 1px var(--black-a1),
    0 0 0 1px var(--accent-a4), -1px 0 1px var(--black-a2);
}

.ui-Switch[data-variant="surface"][data-high-contrast="true"] .ui-SwitchThumb:where([data-state='checked']) {
  box-shadow: 0 1px 3px var(--black-a2), 0 2px 4px -1px var(--black-a1), 0 0 0 1px var(--black-a2),
    -1px 0 1px var(--black-a2);
}

.ui-Switch[data-variant="surface"] .ui-SwitchThumb:where([data-disabled]) {
  background-color: var(--gray-2);
  box-shadow: 0 0 0 1px var(--gray-a2), 0 1px 3px var(--black-a1);
  transition: none;
}

.ui-Switch[data-variant="soft"]::before {
  background-image:
    linear-gradient(to right, var(--accent-a4) 40%, transparent 60%),
    linear-gradient(to right, var(--accent-a4) 40%, transparent 60%),
    linear-gradient(to right, var(--accent-a4) 40%, var(--white-a1) 60%),
    linear-gradient(to right, var(--gray-a2) 40%, var(--gray-a3) 60%);
}

.ui-Switch[data-variant="soft"]:where([data-state='unchecked'])::before {
  background-color: var(--gray-a3);
}

.ui-Switch[data-variant="soft"]:where(:active)::before {
  background-color: var(--gray-a4);
}

.ui-Switch[data-variant="soft"][data-high-contrast="true"]::before {
  background-image:
    linear-gradient(to right, var(--switch-high-contrast-checked-color-overlay) 40%, transparent 60%),
    linear-gradient(to right, var(--accent-a6) 40%, transparent 60%),
    linear-gradient(to right, var(--accent-a6) 40%, transparent 60%),
    linear-gradient(to right, var(--accent-a6) 40%, var(--white-a1) 60%),
    linear-gradient(to right, var(--accent-a3) 40%, var(--gray-a3) 60%);
}

.ui-Switch[data-variant="soft"][data-high-contrast="true"]:where([data-state='checked']:active)::before {
  filter: var(--switch-high-contrast-checked-active-before-filter);
}

.ui-Switch[data-variant="soft"]:where([data-disabled]) {
  mix-blend-mode: var(--switch-disabled-blend-mode);
}
.ui-Switch[data-variant="soft"]:where([data-disabled])::before {
  filter: none;
  background-image: none;
  background-color: var(--gray-a4);
}

.ui-Switch[data-variant="soft"] .ui-SwitchThumb {
  filter: saturate(0.45);
}

.ui-Switch[data-variant="soft"] .ui-SwitchThumb:where([data-state='unchecked']) {
  box-shadow: 0 0 0 1px var(--black-a1), 0 1px 3px var(--black-a1), 0 1px 3px var(--black-a1),
    0 2px 4px -1px var(--black-a1);
}

.ui-Switch[data-variant="soft"] .ui-SwitchThumb:where([data-state='checked']) {
  box-shadow: 0 0 0 1px var(--black-a1), 0 1px 3px var(--black-a2), 0 1px 3px var(--accent-a3),
    0 2px 4px -1px var(--accent-a3);
}

.ui-Switch[data-variant="soft"] .ui-SwitchThumb:where([data-disabled]) {
  filter: none;
  background-color: var(--gray-2);
  box-shadow: 0 0 0 1px var(--gray-a2), 0 1px 3px var(--black-a1);
  transition: none;
}
</style>
