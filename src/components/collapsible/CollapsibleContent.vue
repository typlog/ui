<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import { CollapsibleContent, useForwardProps } from 'reka-ui'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<CollapsibleContentProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <CollapsibleContent
    v-bind="forwardedProps"
    class="ui-CollapsibleContent"
  >
    <div class="ui-CollapsibleContentInner" v-bind="$attrs">
      <slot></slot>
    </div>
  </CollapsibleContent>
</template>

<style>
@keyframes collapsible-down {
  from {
    height: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}
@keyframes collapsible-up {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
.ui-CollapsibleContent {
  overflow: hidden;
  font-size: var(--collapsible-font-size);
  font-weight: var(--font-weight-regular);
  padding-block: var(--collapsible-padding-y);
}
.ui-CollapsibleContent:where([data-state="open"]) {
  animation: collapsible-down 0.2s ease-out;
}
.ui-CollapsibleContent:where([data-state="closed"]) {
  animation: collapsible-up 0.2s ease-out;
}
:where(.ui-CollapsibleRoot:not(.r-variant-ghost)) .ui-CollapsibleContent {
  padding-inline: var(--collapsible-padding-x);
}
</style>
