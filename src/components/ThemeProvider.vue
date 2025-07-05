<script lang="ts">
import { toRefs, type Ref } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import type { ColorType, RadiusType } from './types'

type GrayColorType = 'auto' | 'mauve' | 'olive' | 'sage' | 'sand' | 'slate'
type ScalingType = '90%' | '95%' | '100%' | '105%' | '110%' | '115%' | '120%'

export interface ThemeProviderProps extends PrimitiveProps {
  accentColor?: ColorType
  radius?: RadiusType
  grayColor?: GrayColorType
  scaling?: ScalingType
}

interface ThemeProviderContext {
  accentColor: Ref<ColorType>
  radius: Ref<RadiusType>
  grayColor: Ref<GrayColorType>
  scaling: Ref<ScalingType>
}

export const [injectThemeContext, provideThemeContext]
  = createContext<ThemeProviderContext>('ThemeProvider')
</script>

<script setup lang="ts">
import { Primitive, TooltipProvider, createContext } from 'reka-ui'

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  as: 'div',
  accentColor: 'indigo',
  radius: 'medium',
  grayColor: 'auto',
  scaling: '100%',
})

const { accentColor, radius, grayColor, scaling } = toRefs(props)
provideThemeContext({
  accentColor,
  radius,
  grayColor,
  scaling,
})
</script>

<template>
  <Primitive
    class="ui-root"
    data-is-root-theme
    :data-accent-color="props.accentColor"
    :data-gray-color="props.grayColor"
    :data-radius="props.radius"
    :data-scaling="props.scaling"
    :as="props.as"
    :as-child="props.asChild"
  >
    <TooltipProvider>
      <slot></slot>
    </TooltipProvider>
  </Primitive>
</template>

<style>
.ui-root[data-is-root-theme] {
  position: relative;
  z-index: 0;
}
</style>
