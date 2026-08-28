<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarMenuItemProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarMenuItemProps>(), { as: 'li' })
</script>

<template>
  <Primitive class="ui-SidebarMenuItem" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
