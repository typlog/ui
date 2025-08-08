<script lang="ts">
import type {
  NavigationMenuLinkProps as RekaNavigationMenuLinkProps,
  NavigationMenuLinkEmits,
} from 'reka-ui'
import { ColorType, RadiusType } from '../types'

export interface NavigationMenuLinkProps extends RekaNavigationMenuLinkProps {
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
  /** Control the size of the component. */
  size?: '1' | '2' | '3'
  /** Overrides the radius inherited from the ThemeProvider. */
  radius?: RadiusType
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { NavigationMenuLink } from 'reka-ui'
import { injectNavigationMenuListContext } from './NavigationMenuList.vue'
import { useForwardPropsEmitsWithout } from '../util'

const props = withDefaults(defineProps<NavigationMenuLinkProps>(), {
  size: '2',
})
const emits = defineEmits<NavigationMenuLinkEmits>()

const ctx = injectNavigationMenuListContext(null)

const forwarded = useForwardPropsEmitsWithout(props, emits, ['color', 'size', 'radius'])
const resetClass = computed(() => {
  const size = props.size || ctx?.size.value || '2'
  return `r-size-${size}`
})
</script>

<template>
  <NavigationMenuLink
    class="ui-NavigationMenuLink"
    v-bind="forwarded"
    :class="resetClass"
    :data-accent-color="props.color || ctx?.color.value"
    :data-radius="props.radius || ctx?.radius.value"
  >
    <slot></slot>
  </NavigationMenuLink>
</template>

<style src="./style.css"></style>
