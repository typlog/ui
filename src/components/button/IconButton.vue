<script lang="ts">
import type { ButtonProps as IconButtonProps } from './Button.vue'

export type { IconButtonProps }
</script>

<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import Button from './Button.vue'

const props = defineProps<IconButtonProps>()
const forwarded = useForwardProps(props)
</script>

<template>
  <Button
    class="ui-IconButton"
    v-bind="forwarded"
  >
    <slot></slot>
  </Button>
</template>

<style>
.ui-Button.ui-IconButton {
  height: var(--button-height);
  width: var(--button-height);
  padding: 0;
}
</style>
