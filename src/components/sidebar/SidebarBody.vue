<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarBodyProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarBodyProps>(), { as: 'div' })
</script>

<template>
  <Primitive class="ui-SidebarBody" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
