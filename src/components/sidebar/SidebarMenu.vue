<script lang="ts">
import type { Ref } from 'vue'
import { createContext, type PrimitiveProps } from 'reka-ui'
import type { ColorType } from '../types'

export interface SidebarMenuProps extends PrimitiveProps {
  /**
   * Controls the inherited size of menu and submenu buttons.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  /** Overrides the accent color inherited from the ThemeProvider. */
  color?: ColorType
}

interface SidebarMenuContext {
  size: Ref<'1' | '2' | '3'>
  color: Ref<ColorType | undefined>
}

export const [injectSidebarMenuContext, provideSidebarMenuContext]
  = createContext<SidebarMenuContext>('ui:SidebarMenu')
</script>

<script setup lang="ts">
import { toRefs } from 'vue'
import { Primitive } from 'reka-ui'
import { buildPropsClass, useForwardPropsWithout } from '../util'

const props = withDefaults(defineProps<SidebarMenuProps>(), {
  as: 'ul',
  size: '2',
})
const forwarded = useForwardPropsWithout(props, ['size', 'color'])
const resetClass = buildPropsClass(props, ['size'])
const { size, color } = toRefs(props)

provideSidebarMenuContext({ size, color })
</script>

<template>
  <Primitive
    v-bind="forwarded"
    class="ui-SidebarMenu"
    :class="resetClass"
    :data-accent-color="props.color"
  >
    <slot></slot>
  </Primitive>
</template>
