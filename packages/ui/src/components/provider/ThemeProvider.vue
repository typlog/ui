<script lang="ts">
import { toRefs, type Ref } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

type GrayColorType = 'auto' | 'mauve' | 'olive' | 'sage' | 'sand' | 'slate'
type ScalingType = '90%' | '95%' | '100%' | '105%' | '110%' | '115%' | '120%'

export interface ThemeProviderProps extends PrimitiveProps {
  accentColor?: ColorType
  radius?: RadiusType
  grayColor?: GrayColorType
  scaling?: ScalingType
  panelBackground?: 'solid' | 'translucent'
  hasBackground?: boolean
}

interface ThemeProviderContext {
  accentColor: Ref<ColorType>
  radius: Ref<RadiusType>
  grayColor: Ref<GrayColorType>
  scaling: Ref<ScalingType>
  panelBackground: Ref<'solid' | 'translucent'>
  hasBackground: Ref<boolean>
}

export const [injectThemeContext, provideThemeContext]
  = createContext<ThemeProviderContext>('ThemeProvider')
</script>

<script setup lang="ts">
import { Primitive, TooltipProvider, createContext } from 'reka-ui'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ThemeProviderProps>(), {
  as: 'div',
  accentColor: 'indigo',
  radius: 'medium',
  grayColor: 'auto',
  scaling: '100%',
  panelBackground: 'translucent',
  hasBackground: true,
})

const { accentColor, radius, grayColor, scaling, panelBackground, hasBackground } = toRefs(props)
provideThemeContext({
  accentColor,
  radius,
  grayColor,
  scaling,
  panelBackground,
  hasBackground,
})
</script>

<template>
  <TooltipProvider>
    <Primitive
      class="ui-root"
      :data-accent-color="accentColor"
      :data-gray-color="grayColor"
      :data-radius="radius"
      :data-scaling="scaling"
      :data-panel-background="panelBackground"
      :data-has-background="hasBackground"
      :as="props.as"
      :as-child="props.asChild"
      v-bind="$attrs"
    >
      <slot></slot>
    </Primitive>
  </TooltipProvider>
</template>

<style>
[data-v-app] > .ui-root {
  position: relative;
  z-index: 0;
}
</style>
