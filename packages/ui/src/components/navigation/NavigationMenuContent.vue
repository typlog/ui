<script lang="ts">
import type {
  NavigationMenuContentProps,
  NavigationMenuContentEmits,
} from 'reka-ui'
</script>

<script setup lang="ts">
import {
  NavigationMenuContent,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<NavigationMenuContentProps>()
const emits = defineEmits<NavigationMenuContentEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <NavigationMenuContent v-bind="forwarded" class="ui-NavigationMenuContent">
    <slot></slot>
  </NavigationMenuContent>
</template>

<style>
@layer components {
  .ui-NavigationMenuContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    animation: var(--navigation-menu-content-animation);
  }
}

.ui-NavigationMenuContent:where([data-motion="from-start"]) {
  --navigation-menu-content-animation: enterFromLeft 250ms ease;
}
.ui-NavigationMenuContent:where([data-motion="to-start"]) {
  --navigation-menu-content-animation: exitToLeft 250ms ease;
}
.ui-NavigationMenuContent:where([data-motion="from-end"]) {
  --navigation-menu-content-animation: enterFromRight 250ms ease;
}
.ui-NavigationMenuContent:where([data-motion="to-end"]) {
  --navigation-menu-content-animation: exitToRight 250ms ease;
}
</style>
