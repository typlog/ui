<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarGroupLabelProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarGroupLabelProps>(), { as: 'div' })
</script>

<template>
  <Primitive class="ui-SidebarGroupLabel" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
