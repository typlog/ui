<script setup lang="ts">
import { TabsTrigger, useForwardProps, type TabsTriggerProps } from 'reka-ui'

const props = defineProps<TabsTriggerProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <TabsTrigger
    v-bind="forwarded"
    class="ui-TabTrigger"
  >
    <span class="ui-TabTriggerInner">
      <slot></slot>
    </span>
    <span class="ui-TabTriggerInnerHidden">
      <slot></slot>
    </span>
  </TabsTrigger>
</template>

<style>
.ui-root {
  --tab-active-letter-spacing: -0.01em;
  --tab-active-word-spacing: 0em;
  --tab-inactive-letter-spacing: 0em;
  --tab-inactive-word-spacing: 0em;
}
.ui-TabTrigger {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  user-select: none;
  box-sizing: border-box;
  height: var(--tab-height);
  color: var(--gray-a11);
  outline: none;
}

.ui-TabTrigger:disabled {
  color: var(--gray-a8);
  border-color: currentColor;
}

.ui-TabTriggerInner,
.ui-TabTriggerInnerHidden {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: var(--tab-inner-height);
  padding-left: var(--tab-inner-padding-x);
  padding-right: var(--tab-inner-padding-x);
  border-radius: var(--tab-item-radius);
}

.ui-TabTriggerInner {
  position: absolute;
}

:where(.ui-TabTrigger[data-state='inactive']) .ui-TabTriggerInner {
  letter-spacing: var(--tab-inactive-letter-spacing);
  word-spacing: var(--tab-inactive-word-spacing);
}

:where(.ui-TabTrigger[data-state='active']) .ui-TabTriggerInner {
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tab-active-letter-spacing);
  word-spacing: var(--tab-active-word-spacing);
}

.ui-TabTriggerInnerHidden {
  visibility: hidden;
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tab-active-letter-spacing);
  word-spacing: var(--tab-active-word-spacing);
}

@media (hover: hover) {
  .ui-TabList:where(.r-variant-outline) :where(.ui-TabTrigger:hover) {
    color: var(--gray-12);
  }
  .ui-TabList:where(.r-variant-surface, .r-variant-soft) :where(.ui-TabTrigger:hover) {
    color: var(--accent-a11);
  }
  .ui-TabList:where(.r-variant-outline) :where(.ui-TabTrigger:not(:disabled):hover) :where(.ui-TabTriggerInner) {
    background-color: var(--gray-a3);
  }
  .ui-TabTrigger:where(:focus-visible:hover) :where(.ui-TabTriggerInner) {
    background-color: var(--accent-a3);
  }
}

.ui-TabTrigger:where(:focus-visible) :where(.ui-TabTriggerInner) {
  outline: 2px solid var(--focus-8);
  outline-offset: -2px;
}

.ui-TabList:where(.r-variant-outline) :where(.ui-TabTrigger) {
  padding-left: var(--tab-padding-x);
  padding-right: var(--tab-padding-x);
}

.ui-TabList:where(.r-variant-outline) :where(.ui-TabTrigger[data-state='active']) {
  color: var(--gray-12);
}

.ui-TabList:where(.r-variant-soft) :where(.ui-TabTrigger + .ui-TabTrigger) {
  margin-left: calc(var(--tab-padding-x) / 2)
}

.ui-TabList:where(.r-variant-surface) :where(.ui-TabTrigger + .ui-TabTrigger) {
  box-shadow: inset 1px 0 0 var(--gray-a3);
}

.ui-TabList:where(.r-variant-surface, .r-variant-soft) :where(.ui-TabTrigger[data-state='active']) {
  color: var(--accent-a11);
}
</style>
