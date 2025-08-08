<script lang="ts">
import type { Ref } from 'vue'
import {
  type NavigationMenuListProps as RekaNavigationMenuListProps,
  createContext,
} from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface NavigationMenuListProps extends RekaNavigationMenuListProps {
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
  /**
   * Control the size of the button.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Overrides the radius inherited from the ThemeProvider. */
  radius?: RadiusType
}

interface NavigationMenuListContext {
  color: Ref<ColorType | undefined>
  radius: Ref<RadiusType | undefined>
  size: Ref<'1' | '2' | '3'>
}

export const [injectNavigationMenuListContext, provideNavigationMenuListContext]
  = createContext<NavigationMenuListContext>('ui:NavigationMenuList')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import { NavigationMenuList, NavigationMenuIndicator } from 'reka-ui'
import { useForwardPropsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<NavigationMenuListProps>(), {
  size: '2',
})

const forwarded = useForwardPropsWithout(props, ['color', 'size', 'radius'])
const resetClass = buildPropsClass(props, ['size'])

const { color, radius, size  } = toRefs(props)

provideNavigationMenuListContext({
  color,
  radius,
  size,
})
</script>

<template>
  <NavigationMenuList
    v-bind="forwarded"
    class="ui-NavigationMenuList"
    :class="resetClass"
  >
    <slot></slot>
    <NavigationMenuIndicator class="ui-NavigationMenuIndicator">
    </NavigationMenuIndicator>
  </NavigationMenuList>
</template>

<style>
@layer components {
  .ui-NavigationMenuList {
    display: flex;
    gap: var(--navigation-menu-gap);
  }
}

.ui-NavigationMenuList:where(.r-size-1) {
  --navigation-menu-gap: calc(var(--space-1) / 2);
  --navigation-menu-height: var(--space-5);
  --navigation-menu-padding-x: var(--space-2);
  --navigation-menu-font-size: var(--font-size-1);
  --navigation-menu-line-height: var(--line-height-1);
  --navigation-menu-letter-spacing: var(--letter-spacing-1);
  --navigation-menu-radius: max(var(--radius-1), var(--radius-full));
}

.ui-NavigationMenuList:where(.r-size-2) {
  --navigation-menu-gap: var(--space-1);
  --navigation-menu-height: var(--space-6);
  --navigation-menu-padding-x: var(--space-3);
  --navigation-menu-font-size: var(--font-size-2);
  --navigation-menu-line-height: var(--line-height-2);
  --navigation-menu-letter-spacing: var(--letter-spacing-2);
  --navigation-menu-radius: max(var(--radius-2), var(--radius-full));
}

.ui-NavigationMenuList:where(.r-size-3) {
  --navigation-menu-gap: calc(var(--space-1) * 1.5);
  --navigation-menu-height: var(--space-7);
  --navigation-menu-padding-x: var(--space-4);
  --navigation-menu-font-size: var(--font-size-3);
  --navigation-menu-line-height: var(--line-height-3);
  --navigation-menu-letter-spacing: var(--letter-spacing-3);
  --navigation-menu-radius: max(var(--radius-3), var(--radius-full));
}

.ui-NavigationMenuIndicator {
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width, transform 250ms ease;
  width: var(--reka-navigation-menu-indicator-size);
  transform: translateX(var(--reka-navigation-menu-indicator-position));
}

.ui-NavigationMenuIndicator:where([data-state="visible"]) {
  animation: ui-fade-in 200ms ease;
}
.ui-NavigationMenuIndicator:where([data-state="hidden"]) {
  animation: ui-fade-out 200ms ease;
}
.ui-NavigationMenuIndicator:before {
  content: '';
  position: relative;
  top: 70%;
  background-color: var(--color-panel-solid);
  border: 1px solid var(--gray-a4);
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  border-top-left-radius: 2px;
}
</style>
