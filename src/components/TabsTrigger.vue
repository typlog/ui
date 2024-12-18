<script setup lang="ts">
import { TabsTrigger, useForwardProps, type TabsTriggerProps } from 'radix-vue'

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
.radix-ui {
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
  padding-left: var(--tab-padding-x);
  padding-right: var(--tab-padding-x);
  color: var(--gray-a11);
}

.ui-TabTriggerInner,
.ui-TabTriggerInnerHidden {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: var(--tab-inner-padding-y) var(--tab-inner-padding-x);
  border-radius: var(--tab-inner-border-radius);
}

.ui-TabTriggerInner {
  position: absolute;
}
.ui-TabTrigger[data-state='inactive'] .ui-TabTriggerInner {
  letter-spacing: var(--tab-inactive-letter-spacing);
  word-spacing: var(--tab-inactive-word-spacing);
}

.ui-TabTrigger[data-state='active'] .ui-TabTriggerInner {
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
  .ui-TabTrigger:hover {
    color: var(--gray-12);
  }
  .ui-TabTrigger:hover .ui-TabTriggerInner {
    background-color: var(--gray-a3);
  }
  .ui-TabTrigger:focus-visible:hover .ui-TabTriggerInner {
    background-color: var(--accent-a3);
  }
}
.ui-TabTrigger:where([data-state='active']) {
  color: var(--gray-12);
}
.ui-TabTrigger:where(:focus-visible) :where(.ui-TabTriggerInner) {
  outline: 2px solid var(--focus-8);
  outline-offset: -2px;
}
.ui-TabTrigger:where([data-state='active'])::before {
  box-sizing: border-box;
  content: '';
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--accent-indicator);
}
.ui-TabList[data-high-contrast="true"] .ui-TabTrigger:where([data-state='active'])::before {
  background-color: var(--accent-12);
}
</style>
