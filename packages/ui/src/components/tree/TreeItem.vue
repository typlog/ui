<script lang="ts">
import type {
  TreeItemEmits as RekaTreeItemEmits,
  TreeItemProps as RekaTreeItemProps,
} from 'reka-ui'

export interface TreeItemProps<T extends Record<string, any> = Record<string, any>>
  extends RekaTreeItemProps<T> {
  /** Whether the item should display a disclosure indicator. Defaults to the tree data. */
  hasChildren?: boolean
  /** Iconify icon rendered before the item text. */
  icon?: string
  /** Text rendered when no text or default slot is provided. */
  text?: string
  /** Iconify icon rendered at the end of the row. */
  trailingIcon?: string
}

export type TreeItemEmits<T extends Record<string, any> = Record<string, any>> = RekaTreeItemEmits<T>

export interface TreeItemSlotProps<T extends Record<string, any> = Record<string, any>> {
  value: T
  hasChildren: boolean
  isExpanded: boolean
  isSelected: boolean
  isIndeterminate: boolean | undefined
  isDisabled: boolean
  handleSelect: () => void
  handleToggle: () => void
}
</script>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { TreeItem as RekaTreeItem, useForwardExpose } from 'reka-ui'
import { injectTreeRootContext as injectRekaTreeRootContext } from 'reka-ui'
import { useForwardPropsEmitsWithout } from '../util'
import TreeItemIndicator from './TreeItemIndicator.vue'
import { injectTreeContext } from './TreeRoot.vue'

const props = withDefaults(defineProps<TreeItemProps<T>>(), {
  as: 'li',
  hasChildren: undefined,
})
const emits = defineEmits<TreeItemEmits<T>>()

type SlotProps = TreeItemSlotProps<T>
defineSlots<{
  /** Text shorthand for the item. */
  default?: (props: SlotProps) => any
  /** Replaces the leading icon. */
  icon?: (props: SlotProps) => any
  /** Replaces the item text. */
  text?: (props: SlotProps) => any
  /** Replaces the trailing icon. */
  trailing?: (props: SlotProps) => any
  /** Replaces the disclosure indicator. */
  indicator?: (props: SlotProps) => any
}>()

const rootContext = injectRekaTreeRootContext()
const context = injectTreeContext()
const forwarded = useForwardPropsEmitsWithout(
  props,
  emits,
  ['hasChildren', 'icon', 'text', 'trailingIcon'],
)
const hasChildren = computed(() => props.hasChildren ?? Boolean(rootContext.getChildren(props.value)))

useForwardExpose()

function slotProps(state: Omit<SlotProps, 'value' | 'hasChildren'>): SlotProps {
  return {
    ...state,
    value: props.value,
    hasChildren: hasChildren.value,
  }
}

</script>

<template>
  <RekaTreeItem
    v-slot="state"
    v-bind="forwarded"
    :value="props.value"
    :level="props.level"
    class="ui-TreeItem"
    :data-accent-color="context.color.value"
    :class="context.highContrast.value ? 'r-high-contrast' : undefined"
    :style="{ '--tree-item-level': props.level }"
  >
    <div
      class="ui-TreeItemRow"
    >
      <TreeItemIndicator
        class="ui-TreeItemIndicator"
        :expanded="state.isExpanded"
        :has-children="hasChildren"
        :disabled="state.isDisabled"
      >
        <template v-if="$slots.indicator" #default>
          <slot
            name="indicator"
            v-bind="slotProps(state)"
          ></slot>
        </template>
      </TreeItemIndicator>
      <span class="ui-TreeItemTarget">
        <span
          v-if="$slots.icon || props.icon"
          class="ui-TreeItemIcon"
        >
          <slot
            name="icon"
            v-bind="slotProps(state)"
          >
            <Icon
              v-if="props.icon"
              class="ui-TreeItemIconGraphic"
              :icon="props.icon"
              aria-hidden="true"
            />
          </slot>
        </span>
        <span class="ui-TreeItemText">
          <slot
            name="text"
            v-bind="slotProps(state)"
          >
            <slot v-bind="slotProps(state)">{{ props.text }}</slot>
          </slot>
        </span>
      </span>
      <span
        v-if="$slots.trailing || props.trailingIcon"
        class="ui-TreeItemTrailing"
      >
        <slot
          name="trailing"
          v-bind="slotProps(state)"
        >
          <Icon
            class="ui-TreeItemTrailingIcon"
            :icon="props.trailingIcon!"
            aria-hidden="true"
          />
        </slot>
      </span>
    </div>
  </RekaTreeItem>
</template>
