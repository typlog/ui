<script lang="ts">
import type { SelectTriggerProps as _SelectTriggerProps } from 'radix-vue'
import type { ColorType, RadiusType } from './types'

export interface SelectTriggerProps extends _SelectTriggerProps {
  variant?: 'surface' | 'soft' | 'ghost'
  color?: ColorType
  radius?: RadiusType
  placeholder?: string
}
</script>

<script setup lang="ts">
import { inject } from 'vue'
import { Icon } from '@iconify/vue'
import { SelectTrigger, SelectValue, SelectIcon, useForwardExpose } from 'radix-vue'

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  variant: 'surface',
})
const size = inject('SelectRoot.size')

useForwardExpose()
</script>

<template>
  <SelectTrigger
    class="ui-SelectTrigger"
    :disabled="props.disabled"
    :data-variant="props.variant"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :data-size="size"
  >
    <span class="ui-SelectTriggerInner">
      <SelectValue :placeholder="props.placeholder" />
    </span>
    <SelectIcon as-child>
      <Icon
        class="ui-SelectIcon"
        icon="radix-icons:chevron-down"
      />
    </SelectIcon>
  </SelectTrigger>
</template>

<style>
.ui-SelectTrigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  user-select: none;
  vertical-align: top;
  font-weight: var(--font-weight-regular);
  font-style: normal;
  text-align: start;
  color: var(--gray-12);
}

.ui-SelectTriggerInner {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-SelectIcon {
  flex-shrink: 0;
}

.ui-SelectTrigger:where(:not([data-variant="ghost"])).ui-SelectIcon {
  opacity: 0.9;
}


.ui-SelectTrigger:where(:not([data-variant="ghost"])) {
  box-sizing: border-box;
  height: var(--select-trigger-height);
}

.ui-SelectTrigger:where([data-variant="ghost"]) {
  box-sizing: content-box;
  height: fit-content;
  padding: var(--select-trigger-ghost-padding-y) var(--select-trigger-ghost-padding-x);
  margin: calc(0px - var(--select-trigger-ghost-padding-y)) calc(0px - var(--select-trigger-ghost-padding-x));
}

.ui-SelectTrigger:where([data-size="1"]) {
  --select-trigger-height: var(--space-5);
  gap: var(--space-1);
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  border-radius: max(var(--radius-1), var(--radius-full));
}

.ui-SelectTrigger:where([data-size="1"]):where([data-variant="ghost"]) {
  --select-trigger-ghost-padding-x: var(--space-2);
  --select-trigger-ghost-padding-y: var(--space-1);
}

.ui-SelectTrigger:where([data-size="1"]):where(:not([data-variant="ghost"])) {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}

.ui-SelectTrigger:where([data-size="2"]) {
  --select-trigger-height: var(--space-6);
  gap: calc(var(--space-1) * 1.5);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  border-radius: max(var(--radius-2), var(--radius-full));
}

.ui-SelectTrigger:where([data-size="1"]):where([data-variant="ghost"]) {
  --select-trigger-ghost-padding-x: var(--space-2);
  --select-trigger-ghost-padding-y: var(--space-1);
}

.ui-SelectTrigger:where([data-size="2"]):where(:not([data-variant="ghost"])) {
  padding-left: var(--space-3);
  padding-right: var(--space-3);
}

.ui-SelectTrigger:where([data-size="3"]) {
  --select-trigger-height: var(--space-7);
  gap: var(--space-2);
  font-size: var(--font-size-3);
  line-height: var(--line-height-3);
  letter-spacing: var(--letter-spacing-3);
  border-radius: max(var(--radius-3), var(--radius-full));
}

.ui-SelectTrigger:where([data-size="3"]):where([data-variant="ghost"]) {
  --select-trigger-ghost-padding-x: var(--space-3);
  --select-trigger-ghost-padding-y: calc(var(--space-1) * 1.5);
}

.ui-SelectTrigger:where([data-size="3"]):where(:not([data-variant="ghost"])) {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.ui-SelectTrigger:where([data-size="3"]) .ui-SelectIcon {
  width: 11px;
  height: 11px;
}

.ui-SelectTrigger:where([data-variant="surface"]) {
  --select-trigger-border-width: 1px;
  --select-trigger-border-color: var(--gray-a7);
  outline: 0;
  color: var(--gray-12);
  background-color: var(--color-surface);
  border: var(--select-trigger-border-width) solid var(--select-trigger-border-color);
}

.ui-SelectTrigger:where([data-variant="surface"]):where(:focus-visible) {
  --select-trigger-border-color: var(--focus-a8);
  box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

@media (hover: hover) {
  .ui-SelectTrigger:where([data-variant="surface"]):hover {
    --select-trigger-border-color: var(--gray-a8);
  }
}

.ui-SelectTrigger:where([data-variant="surface"]):where([data-state='open']) {
  --select-trigger-border-color: var(--gray-a8);
}

.ui-SelectTrigger:where([data-variant="surface"]):where(:disabled) {
  color: var(--gray-a11);
  background-color: var(--gray-a2);
  --select-trigger-border-color: var(--gray-a6);
}

.ui-SelectTrigger:where([data-variant="surface"]):where([data-placeholder]) .ui-SelectTriggerInner {
  color: var(--gray-a10);
}

.ui-SelectTrigger:where([data-variant="soft"]),
.ui-SelectTrigger:where([data-variant="ghost"]) {
  color: var(--accent-12);
}

.ui-SelectTrigger:where([data-variant="soft"]):where(:focus-visible),
.ui-SelectTrigger:where([data-variant="ghost"]):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}

.ui-SelectTrigger:where([data-variant="soft"]):where([data-placeholder]) .ui-SelectTriggerInner,
.ui-SelectTrigger:where([data-variant="ghost"]):where([data-placeholder]) .ui-SelectTriggerInner {
  color: var(--accent-12);
  opacity: 0.6;
}

.ui-SelectTrigger:where([data-variant="soft"]) {
  background-color: var(--accent-a3);
}
@media (hover: hover) {
  .ui-SelectTrigger:where([data-variant="soft"]):hover {
    background-color: var(--accent-a4);
  }
}
.ui-SelectTrigger:where([data-variant="soft"]):where([data-state='open']) {
  background-color: var(--accent-a4);
}
.ui-SelectTrigger:where([data-variant="soft"]):where(:focus-visible) {
  outline-color: var(--accent-8);
}
.ui-SelectTrigger:where([data-variant="soft"]):where(:disabled) {
  color: var(--gray-a11);
  background-color: var(--gray-a3);
}

@media (hover: hover) {
  .ui-SelectTrigger:where([data-variant="ghost"]):hover {
    background-color: var(--accent-a3);
  }
}
.ui-SelectTrigger:where([data-variant="ghost"]):where([data-state='open']) {
  background-color: var(--accent-a3);
}

.ui-SelectTrigger:where([data-variant="ghost"]):where(:disabled) {
  color: var(--gray-a11);
  background-color: transparent;
}

.ui-SelectTrigger:where(:disabled) .ui-SelectIcon {
  color: var(--gray-a9);
}
</style>
