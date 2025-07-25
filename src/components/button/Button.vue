<script lang="ts">
import type { Component } from 'vue'
import type { AsTag } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface ButtonProps {
  /**
   * The visual variant to apply.
   * @default "solid"
   */
  variant?: 'classic' | 'solid' | 'soft' | 'surface' | 'outline' | 'ghost'
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
  /** Overrides the radius inherited from the ThemeProvider. */
  radius?: RadiusType
  /**
   * Control the size of the button.
   * @default "2"
   */
  size?: '1' | '2' | '3' | '4'
  /** Uses a higher contrast color for the component. */
  highContrast?: boolean
  /** Mark the button as disabled. */
  disabled?: boolean
  /**
   * The element or component this component should render as.
   * @default "button"
   */
  as?: AsTag | Component
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { buildPropsClass } from '../util'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  size: '2',
  variant: 'solid',
  highContrast: false,
})

const resetClass = buildPropsClass(props, ['size', 'variant', 'highContrast'])
</script>

<template>
  <Primitive
    class="ui-Button"
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
