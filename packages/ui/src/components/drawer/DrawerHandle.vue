<script lang="ts">
import type { DrawerHandleProps as RekaDrawerHandleProps } from 'reka-ui'

export type { RekaDrawerHandleProps as DrawerHandleProps }
</script>

<script setup lang="ts">
import { DrawerHandle as RekaDrawerHandle } from 'reka-ui'

const props = defineProps<RekaDrawerHandleProps>()
</script>

<template>
  <RekaDrawerHandle v-bind="props" class="ui-DrawerHandle">
    <slot></slot>
  </RekaDrawerHandle>
</template>
