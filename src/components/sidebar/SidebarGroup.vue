<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarGroupProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarGroupProps>(), { as: 'div' })
</script>

<template>
  <Primitive class="ui-SidebarGroup" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
