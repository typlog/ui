<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { useForwardExpose } from 'reka-ui'
</script>

<script setup lang="ts">
import { Primitive, injectDialogRootContext } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps>(), { as: 'p' })

useForwardExpose()
const rootContext = injectDialogRootContext()
</script>

<template>
  <Primitive
    v-bind="props"
    :id="rootContext.descriptionId"
    class="ui-DialogDescription"
  >
    <slot></slot>
  </Primitive>
</template>

<style>
.ui-DialogDescription {
  font-size: var(--font-size-3);
  line-height: var(--line-height-2);
  color: var(--gray-11);
}
.ui-DialogTitle + .ui-DialogDescription {
  margin-top: var(--space-2);
}
</style>
