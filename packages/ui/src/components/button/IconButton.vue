<script lang="ts">
import type { ButtonProps } from './Button.vue'

export type IconButtonProps = ButtonProps
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<IconButtonProps>(), {
  as: 'button',
  size: '2',
  variant: 'solid',
  highContrast: false,
})

const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <Primitive
    class="ui-Button ui-IconButton"
    :class="resetClass"
    :as-child="props.asChild"
    :as="props.as"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :data-disabled="props.disabled ? true : undefined"
    :disabled="props.disabled && props.as === 'button' ? true : undefined"
  >
    <slot></slot>
  </Primitive>
</template>

<style src="./style.css"></style>

<style>
.ui-Button.ui-IconButton {
  height: var(--button-height);
  width: var(--button-height);
  padding: 0;
}
</style>
