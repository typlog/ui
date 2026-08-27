<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarMenuSubItemProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarMenuSubItemProps>(), { as: 'li' })
</script>

<template>
  <Primitive class="ui-SidebarMenuSubItem" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
