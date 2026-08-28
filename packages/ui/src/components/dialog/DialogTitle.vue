<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { useForwardExpose } from 'reka-ui'
import { Primitive, injectDialogRootContext } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps>(), { as: 'h2' })
const rootContext = injectDialogRootContext()
useForwardExpose()
</script>

<template>
  <Primitive
    v-bind="props"
    :id="rootContext.titleId"
    class="ui-DialogTitle"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-DialogTitle {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-4);
}
</style>
