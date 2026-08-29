<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
</script>

<script setup lang="ts">
import { Primitive, injectDrawerRootContext, useForwardExpose } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'p',
})
const rootContext = injectDrawerRootContext()
useForwardExpose()
</script>

<template>
  <Primitive v-bind="props" :id="rootContext.descriptionId" class="ui-DrawerDescription">
    <slot></slot>
  </Primitive>
</template>
