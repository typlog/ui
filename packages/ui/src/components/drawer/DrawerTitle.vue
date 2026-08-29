<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
</script>
<script setup lang="ts">
import { Primitive, injectDrawerRootContext, useForwardExpose } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'h2',
})
const rootContext = injectDrawerRootContext()
useForwardExpose()
</script>

<template>
  <Primitive v-bind="props" :id="rootContext.titleId" class="ui-DrawerTitle">
    <slot></slot>
  </Primitive>
</template>
