<script lang="ts">
import type { Ref } from 'vue'
import type {
  FlattenedItem,
  TreeRootEmits as RekaTreeRootEmits,
  TreeRootProps as RekaTreeRootProps,
  TreeVirtualizerProps as RekaTreeVirtualizerProps,
} from 'reka-ui'
import type { VirtualItem } from '@tanstack/vue-virtual'
import { createContext } from 'reka-ui'
import type { ColorType } from '../types'

export interface TreeVirtualOptions<T extends Record<string, any> = Record<string, any>>
  extends Omit<RekaTreeVirtualizerProps, 'textContent'> {
  /** Number of items rendered outside the visible area. @default 12 */
  overscan?: number
  /** Estimated size (in px) of each item. @default 28 */
  estimateSize?: number | ((index: number) => number)
  /** Text content for each item to enable type-ahead navigation. */
  textContent?: (item: T) => string
}

export interface TreeRootProps<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  M extends boolean = false,
> extends RekaTreeRootProps<T, U, M> {
  /** Enables virtual rendering, optionally configuring the virtualizer. @default false */
  virtual?: boolean | TreeVirtualOptions<T>
  /** Controls the size of each tree row. @default "2" */
  size?: '1' | '2' | '3'
  /** Overrides the accent color inherited from the theme. */
  color?: ColorType
  /** Uses a higher contrast color for selected tree items. */
  highContrast?: boolean
}

export type TreeRootEmits<
  T extends Record<string, any> = Record<string, any>,
  M extends boolean = false,
> = RekaTreeRootEmits<T, M>

export interface TreeRootSlotProps<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  M extends boolean = false,
> {
  /** The flattened tree item to render. */
  item: FlattenedItem<T>
  /** The virtual item metadata; present when `virtual` is enabled. */
  virtualItem?: VirtualItem
  modelValue: M extends true ? U[] : U
  expanded: string[]
}

export interface TreeRootContext {
  size: Ref<'1' | '2' | '3'>
  color: Ref<ColorType | undefined>
  highContrast: Ref<boolean>
}

export const [injectTreeContext, provideTreeContext] = createContext<TreeRootContext>('ui:TreeRoot')
</script>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>, U extends Record<string, any> = Record<string, any>, M extends boolean = false">
import { computed, toRefs } from 'vue'
import { TreeRoot as RekaTreeRoot, TreeVirtualizer as RekaTreeVirtualizer } from 'reka-ui'
import { buildPropsClass, useForwardPropsEmitsWithout } from '../util'

const props = withDefaults(defineProps<TreeRootProps<T, U, M>>(), {
  as: 'ul',
  size: '2',
  highContrast: false,
})
const emits = defineEmits<TreeRootEmits<T, M>>()

defineSlots<{
  default?: (props: {
    item: FlattenedItem<T>
    virtualItem?: VirtualItem
    modelValue: M extends true ? U[] : U
    expanded: string[]
  }) => any
}>()

const forwarded = useForwardPropsEmitsWithout(props, emits, ['virtual', 'size', 'color', 'highContrast'])
const resetClass = buildPropsClass(props, ['size', 'highContrast'])
const { size, color, highContrast } = toRefs(props)

provideTreeContext({ size, color, highContrast })

const virtualOptions = computed(() => {
  if (!props.virtual)
    return undefined
  return props.virtual === true ? {} : props.virtual
})
const rekaVirtualOptions = computed(() => virtualOptions.value as RekaTreeVirtualizerProps | undefined)

function withVirtualPosition(item: FlattenedItem<T>, virtualItem: VirtualItem): FlattenedItem<T> {
  return {
    ...item,
    bind: {
      ...item.bind,
      'data-index': virtualItem.index,
      'style': {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translateY(${virtualItem.start}px)`,
        overflowAnchor: 'none',
      },
    },
  }
}
</script>

<template>
  <RekaTreeRoot
    v-bind="forwarded"
    :get-key="props.getKey"
    class="ui-TreeRoot"
    :class="resetClass"
    :data-accent-color="props.color"
  >
    <template #default="slotProps">
      <RekaTreeVirtualizer
        v-if="virtualOptions"
        v-bind="rekaVirtualOptions"
      >
        <template #default="virtualSlotProps">
          <slot
            :item="withVirtualPosition(virtualSlotProps.item as FlattenedItem<T>, virtualSlotProps.virtualItem)"
            :virtual-item="virtualSlotProps.virtualItem"
            :model-value="slotProps.modelValue as M extends true ? U[] : U"
            :expanded="slotProps.expanded"
          ></slot>
        </template>
      </RekaTreeVirtualizer>
      <template v-else>
        <template
          v-for="item in slotProps.flattenItems"
          :key="item._id"
        >
          <slot
            :item="item"
            :model-value="slotProps.modelValue as M extends true ? U[] : U"
            :expanded="slotProps.expanded"
          ></slot>
        </template>
      </template>
    </template>
  </RekaTreeRoot>
</template>

<style src="./style.css"></style>
