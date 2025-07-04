<script lang="ts">
export interface InsetProps {
  side?: 'all' | 'x' | 'y' | 'top' | 'bottom' | 'left' | 'right'
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  clip?: 'border-box' | 'padding-box'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<InsetProps>(), {
  side: 'all',
  clip: 'border-box',
})

const resetClass = computed(() => {
  const rv: string[] = []
  if (props.top || ['all', 'y', 'top'].includes(props.side)) {
    rv.push('inset-top')
  }
  if (props.bottom || ['all', 'y', 'bottom'].includes(props.side)) {
    rv.push('inset-bottom')
  }
  if (props.left || ['all', 'x', 'left'].includes(props.side)) {
    rv.push('inset-left')
  }
  if (props.right || ['all', 'x', 'right'].includes(props.side)) {
    rv.push('inset-right')
  }
  if (props.clip) {
    rv.push(`r-clip-${props.clip}`)
  }
  return rv
})
</script>

<template>
  <div
    class="ui-Inset"
    :class="resetClass"
  >
    <slot></slot>
  </div>
</template>

<style>
.ui-Inset {
  box-sizing: border-box;
  --margin-top: 0px;
  --margin-right: 0px;
  --margin-bottom: 0px;
  --margin-left: 0px;
  overflow: hidden;
  margin-top: var(--margin-top-override, var(--margin-top));
  margin-right: var(--margin-right-override, var(--margin-right));
  margin-bottom: var(--margin-bottom-override, var(--margin-bottom));
  margin-left: var(--margin-left-override, var(--margin-left));
}

.ui-Inset > * {
  --margin-top-override: initial;
  --margin-right-override: initial;
  --margin-bottom-override: initial;
  --margin-left-override: initial;
}

.ui-Inset:where(.r-clip-border-box) {
  --inset-border-radius-calc: calc(var(--inset-border-radius, 0px) - var(--inset-border-width, 0px));
  --inset-padding-top-calc: var(--inset-padding-top, 0px);
  --inset-padding-right-calc: var(--inset-padding-right, 0px);
  --inset-padding-bottom-calc: var(--inset-padding-bottom, 0px);
  --inset-padding-left-calc: var(--inset-padding-left, 0px);
}
.ui-Inset:where(.r-clip-padding-box) {
  --inset-border-radius-calc: var(--inset-border-radius, 0px);
  --inset-padding-top-calc: calc(var(--inset-padding-top, 0px) + var(--inset-border-width, 0px));
  --inset-padding-right-calc: calc(var(--inset-padding-right, 0px) + var(--inset-border-width, 0px));
  --inset-padding-bottom-calc: calc(var(--inset-padding-bottom, 0px) + var(--inset-border-width, 0px));
  --inset-padding-left-calc: calc(var(--inset-padding-left, 0px) + var(--inset-border-width, 0px));
}
.ui-Inset:where(.inset-top) {
  --margin-top-override: calc(var(--margin-top) - var(--inset-padding-top-calc));
  border-top-left-radius: var(--inset-border-radius-calc);
  border-top-right-radius: var(--inset-border-radius-calc);
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.ui-Inset:where(.inset-bottom) {
  --margin-bottom-override: calc(var(--margin-bottom) - var(--inset-padding-bottom-calc));
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: var(--inset-border-radius-calc);
  border-bottom-right-radius: var(--inset-border-radius-calc);
}
.ui-Inset:where(.inset-left) {
  --margin-left-override: calc(var(--margin-left) - var(--inset-padding-left-calc));
  border-top-left-radius: var(--inset-border-radius-calc);
  border-top-right-radius: 0px;
  border-bottom-left-radius: var(--inset-border-radius-calc);
  border-bottom-right-radius: 0px;
}
.ui-Inset:where(.inset-right) {
  --margin-right-override: calc(var(--margin-right) - var(--inset-padding-right-calc));
  border-top-left-radius: 0px;
  border-top-right-radius: var(--inset-border-radius-calc);
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: var(--inset-border-radius-calc);
}
</style>
