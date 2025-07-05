<script lang="ts">
import type { ColorType, RadiusType } from '../types'
import { injectThemeContext } from './ThemeProvider.vue'

interface ThemeWrapperProps {
  accentColor?: ColorType
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'

const props = defineProps<ThemeWrapperProps>()
const theme = injectThemeContext()
</script>

<template>
  <Primitive
    class="ui-root"
    :data-accent-color="props.accentColor || theme.accentColor.value"
    :data-gray-color="theme.grayColor.value"
    :data-radius="props.radius || theme.radius.value"
    :data-scaling="theme.scaling.value"
    as-child
  >
    <slot></slot>
  </Primitive>
</template>
