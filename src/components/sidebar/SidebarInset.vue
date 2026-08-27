<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export type SidebarInsetProps = PrimitiveProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = withDefaults(defineProps<SidebarInsetProps>(), { as: 'main' })
</script>

<template>
  <Primitive class="ui-SidebarInset" :as="props.as" :as-child="props.asChild">
    <slot></slot>
  </Primitive>
</template>
