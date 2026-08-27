<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarHeaderProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarHeaderProps>(), { as: 'header' })
</script>

<template>
  <Primitive class="ui-SidebarHeader" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
