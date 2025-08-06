<script lang="ts">
import type { ButtonProps } from './Button.vue'

export interface CloseButtonProps extends ButtonProps {}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import CrossIcon from '~icons/radix-icons/cross-2'
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<CloseButtonProps>(), {
  as: 'button',
  size: '2',
  variant: 'ghost',
  color: 'gray',
  highContrast: false,
})

const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <Primitive
    class="ui-Button ui-CloseButton"
    :class="resetClass"
    :as-child="props.asChild"
    :as="props.as"
    :data-accent-color="props.color"
    :data-radius="props.radius"
    :data-disabled="props.disabled ? true : undefined"
    :disabled="props.disabled && props.as === 'button' ? true : undefined"
  >
    <CrossIcon />
  </Primitive>
</template>

<style src="./style.css"></style>

<style>
.ui-Button.ui-CloseButton {
  height: var(--button-height);
  width: var(--button-height);
  padding: 0;
}
</style>
