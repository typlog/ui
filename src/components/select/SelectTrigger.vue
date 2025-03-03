<script lang="ts">
import type { SelectTriggerProps as _SelectTriggerProps } from 'reka-ui'
import type { RadiusType } from '../types'

export interface SelectTriggerProps extends _SelectTriggerProps {
  variant?: 'surface' | 'soft' | 'ghost'
  radius?: RadiusType
  placeholder?: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { SelectTrigger, SelectValue, SelectIcon } from 'reka-ui'
import { injectSelectRootContext } from './SelectRoot.vue'

const props = withDefaults(defineProps<SelectTriggerProps>(), {
  variant: 'surface',
})
const context = injectSelectRootContext()
const resetClass = computed(() => {
  return [`r-variant-${props.variant}`, `r-size-${context.size.value}`]
})
</script>

<template>
  <SelectTrigger
    class="ui-SelectTrigger"
    :class="resetClass"
    :disabled="props.disabled"
    :data-accent-color="context.color"
    :data-radius="props.radius"
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

.ui-SelectTrigger:where(:not(.r-variant-ghost)).ui-SelectIcon {
  opacity: 0.9;
}


.ui-SelectTrigger:where(:not(.r-variant-ghost)) {
  box-sizing: border-box;
  height: var(--select-trigger-height);
}

.ui-SelectTrigger:where(.r-variant-ghost) {
  box-sizing: content-box;
  height: fit-content;
  padding: var(--select-trigger-ghost-padding-y) var(--select-trigger-ghost-padding-x);
  margin: calc(0px - var(--select-trigger-ghost-padding-y)) calc(0px - var(--select-trigger-ghost-padding-x));
}

.ui-SelectTrigger:where(.r-size-1) {
  --select-trigger-height: var(--space-5);
  gap: var(--space-1);
  font-size: var(--font-size-1);
  line-height: var(--line-height-1);
  letter-spacing: var(--letter-spacing-1);
  border-radius: max(var(--radius-1), var(--radius-full));
}

.ui-SelectTrigger:where(.r-size-1):where(.r-variant-ghost) {
  --select-trigger-ghost-padding-x: var(--space-2);
  --select-trigger-ghost-padding-y: var(--space-1);
}

.ui-SelectTrigger:where(.r-size-1):where(:not(.r-variant-ghost)) {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}

.ui-SelectTrigger:where(.r-size-2) {
  --select-trigger-height: var(--space-6);
  gap: calc(var(--space-1) * 1.5);
  font-size: var(--font-size-2);
  line-height: var(--line-height-2);
  letter-spacing: var(--letter-spacing-2);
  border-radius: max(var(--radius-2), var(--radius-full));
}

.ui-SelectTrigger:where(.r-size-1):where(.r-variant-ghost) {
  --select-trigger-ghost-padding-x: var(--space-2);
  --select-trigger-ghost-padding-y: var(--space-1);
}

.ui-SelectTrigger:where(.r-size-2):where(:not(.r-variant-ghost)) {
  padding-left: var(--space-3);
  padding-right: var(--space-3);
}

.ui-SelectTrigger:where(.r-size-3) {
  --select-trigger-height: var(--space-7);
  gap: var(--space-2);
  font-size: var(--font-size-3);
  line-height: var(--line-height-3);
  letter-spacing: var(--letter-spacing-3);
  border-radius: max(var(--radius-3), var(--radius-full));
}

.ui-SelectTrigger:where(.r-size-3):where(.r-variant-ghost) {
  --select-trigger-ghost-padding-x: var(--space-3);
  --select-trigger-ghost-padding-y: calc(var(--space-1) * 1.5);
}

.ui-SelectTrigger:where(.r-size-3):where(:not(.r-variant-ghost)) {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

.ui-SelectTrigger:where(.r-size-3) .ui-SelectIcon {
  width: 11px;
  height: 11px;
}

.ui-SelectTrigger:where(.r-variant-surface) {
  --select-trigger-border-width: 1px;
  --select-trigger-border-color: var(--gray-a7);
  outline: 0;
  color: var(--gray-12);
  background-color: var(--color-surface);
  border: var(--select-trigger-border-width) solid var(--select-trigger-border-color);
}

.ui-SelectTrigger:where(.r-variant-surface):where(:focus-visible) {
  --select-trigger-border-color: var(--focus-a8);
  box-shadow: 0 0 0 2px var(--accent-4), 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

@media (hover: hover) {
  .ui-SelectTrigger:where(.r-variant-surface):hover {
    --select-trigger-border-color: var(--gray-a8);
  }
}

.ui-SelectTrigger:where(.r-variant-surface):where([data-state='open']) {
  --select-trigger-border-color: var(--gray-a8);
}

.ui-SelectTrigger:where(.r-variant-surface):where(:disabled) {
  color: var(--gray-a11);
  background-color: var(--gray-a2);
  --select-trigger-border-color: var(--gray-a6);
}

.ui-SelectTrigger:where(.r-variant-surface):where([data-placeholder]) .ui-SelectTriggerInner {
  color: var(--gray-a10);
}

.ui-SelectTrigger:where(.r-variant-soft),
.ui-SelectTrigger:where(.r-variant-ghost) {
  color: var(--accent-12);
}

.ui-SelectTrigger:where(.r-variant-soft):where(:focus-visible),
.ui-SelectTrigger:where(.r-variant-ghost):where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: -1px;
}

.ui-SelectTrigger:where(.r-variant-soft):where([data-placeholder]) .ui-SelectTriggerInner,
.ui-SelectTrigger:where(.r-variant-ghost):where([data-placeholder]) .ui-SelectTriggerInner {
  color: var(--accent-12);
  opacity: 0.6;
}

.ui-SelectTrigger:where(.r-variant-soft) {
  background-color: var(--accent-a3);
}
@media (hover: hover) {
  .ui-SelectTrigger:where(.r-variant-soft):hover {
    background-color: var(--accent-a4);
  }
}
.ui-SelectTrigger:where(.r-variant-soft):where([data-state='open']) {
  background-color: var(--accent-a4);
}
.ui-SelectTrigger:where(.r-variant-soft):where(:focus-visible) {
  outline-color: var(--accent-8);
}
.ui-SelectTrigger:where(.r-variant-soft):where(:disabled) {
  color: var(--gray-a11);
  background-color: var(--gray-a3);
}

@media (hover: hover) {
  .ui-SelectTrigger:where(.r-variant-ghost):hover {
    background-color: var(--accent-a3);
  }
}
.ui-SelectTrigger:where(.r-variant-ghost):where([data-state='open']) {
  background-color: var(--accent-a3);
}

.ui-SelectTrigger:where(.r-variant-ghost):where(:disabled) {
  color: var(--gray-a11);
  background-color: transparent;
}

.ui-SelectTrigger:where(:disabled) .ui-SelectIcon {
  color: var(--gray-a9);
}
</style>
