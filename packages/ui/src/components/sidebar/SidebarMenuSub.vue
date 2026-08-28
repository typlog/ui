<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarMenuSubProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarMenuSubProps>(), { as: 'ul' })
</script>

<template>
  <Primitive class="ui-SidebarMenuSub" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
