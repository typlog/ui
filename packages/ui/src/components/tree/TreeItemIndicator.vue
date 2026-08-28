<script lang="ts">
export interface TreeItemIndicatorProps {
  /** Whether the parent item is expanded. */
  expanded?: boolean
  /** Whether the item has children. */
  hasChildren?: boolean
  /** Whether the item is disabled. */
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<TreeItemIndicatorProps>(), {
  expanded: false,
  hasChildren: false,
  disabled: false,
})
</script>

<template>
  <span
    class="ui-TreeItemIndicator"
    :data-expanded="props.expanded ? true : undefined"
    :data-has-children="props.hasChildren ? true : undefined"
    :data-disabled="props.disabled ? true : undefined"
    aria-hidden="true"
  >
    <slot>
      <Icon
        class="ui-TreeItemIndicatorGraphic"
        icon="lucide:chevron-right"
        aria-hidden="true"
      />
    </slot>
  </span>
</template>
