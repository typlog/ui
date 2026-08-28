<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarFooterProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarFooterProps>(), { as: 'footer' })
</script>

<template>
  <Primitive class="ui-SidebarFooter" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
