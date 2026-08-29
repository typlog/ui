<script lang="ts">
import type { DrawerRootEmits as RekaDrawerRootEmits, DrawerRootProps as RekaDrawerRootProps } from 'reka-ui'

// Keep a named interface so the generated API metadata exposes the native props.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerRootProps extends RekaDrawerRootProps {}
export type DrawerRootEmits = RekaDrawerRootEmits
</script>

<script setup lang="ts">
import { DrawerRoot as RekaDrawerRoot } from 'reka-ui'
import { useForwardPropsEmitsWithout } from '../util'

const props = defineProps<DrawerRootProps>()
const emits = defineEmits<DrawerRootEmits>()
const forwarded = useForwardPropsEmitsWithout(props, emits, [])
</script>

<template>
  <RekaDrawerRoot v-bind="forwarded">
    <template #default="slotProps">
      <slot v-bind="slotProps"></slot>
    </template>
  </RekaDrawerRoot>
</template>
