<script lang="ts">
import type {
  NavigationMenuTriggerProps as RekaNavigationMenuTriggerProps,
} from 'reka-ui'
import { ColorType, RadiusType } from '../types'

export interface NavigationMenuTriggerProps extends RekaNavigationMenuTriggerProps {
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
  /** Control the size of the component. */
  size?: '1' | '2' | '3'
  /** Overrides the radius inherited from the ThemeProvider. */
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { NavigationMenuTrigger } from 'reka-ui'
import CaretDownIcon from '~icons/radix-icons/caret-down'
import { injectNavigationMenuListContext } from './NavigationMenuList.vue'
import { useForwardPropsWithout } from '../util'

const props = defineProps<NavigationMenuTriggerProps>()

const ctx = injectNavigationMenuListContext(null)

const forwarded = useForwardPropsWithout(props, ['color', 'size', 'radius'])

const attrs = useAttrs()

const defaultAs = computed(() => {
  if (props.as) {
    return props.as
  }
  if (attrs.href) {
    return 'a'
  } else {
    return forwarded.value.as
  }
})

const resetClass = computed(() => {
  const size = props.size || ctx?.size.value || '2'
  return `r-size-${size}`
})
</script>

<template>
  <NavigationMenuTrigger
    class="ui-NavigationMenuTrigger"
    v-bind="forwarded"
    :as="defaultAs"
    :class="resetClass"
    :data-accent-color="props.color || ctx?.color.value"
    :data-radius="props.radius || ctx?.radius.value"
  >
    <slot></slot>
    <CaretDownIcon class="ui-NavigationMenuTriggerArrow" />
  </NavigationMenuTrigger>
</template>

<style src="./style.css"></style>

<style>
.ui-NavigationMenuTriggerArrow {
  transform: rotate(0deg);
  transition: transform 250ms ease;
}
:where(.ui-NavigationMenuTrigger[data-state="open"]) .ui-NavigationMenuTriggerArrow {
  transform: rotate(-180deg);
}
</style>
