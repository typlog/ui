<script lang="ts">
import type {
  NavigationMenuRootProps,
  NavigationMenuRootEmits,
} from 'reka-ui'
</script>

<script setup lang="ts">
import {
  NavigationMenuRoot,
  NavigationMenuViewport,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<NavigationMenuRootProps>()
const emits = defineEmits<NavigationMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <NavigationMenuRoot v-bind="forwarded" class="ui-NavigationMenuRoot">
    <slot></slot>
    <NavigationMenuViewport class="ui-NavigationMenuViewport" />
  </NavigationMenuRoot>
</template>

<style>
.ui-NavigationMenuRoot {
  position: relative;
  z-index: 1;
}

.ui-NavigationMenuViewport {
  position: absolute;
  margin-top: 10px;
  top: 100%;
  left: var(--reka-navigation-menu-viewport-left);
  height: var(--reka-navigation-menu-viewport-height);
  background-color: white;
  border-radius: var(--radius-4);
  overflow: hidden;
  box-shadow: var(--shadow-3);
  width: 100%;
  max-width: var(--reka-navigation-menu-viewport-width);
  transition: width, height, 300ms ease;
  transform-origin: top center;
}
.ui-NavigationMenuViewport:where([data-state="open"]) {
  animation: navigation-menu-viewport-scale-in 200ms ease;
}
.ui-NavigationMenuViewport:where([data-state="closed"]) {
  animation: navigation-menu-viewport-scale-out 200ms ease;
}

@keyframes navigation-menu-viewport-scale-in {
  from {
    opacity: 0;
    transform: rotateX(-30deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
}

@keyframes navigation-menu-viewport-scale-out {
  from {
    opacity: 1;
    transform: rotateX(0deg) scale(1);
  }
  to {
    opacity: 0;
    transform: rotateX(-10deg) scale(0.95);
  }
}
</style>
