<script lang="ts">
import type { PaginationRootProps, PaginationRootEmits } from 'reka-ui'
import type { ColorType } from '../types'

export interface PaginationProps extends PaginationRootProps {
  color?: ColorType
  size?: '1' | '2' | '3' | '4'
  variant?: 'soft' | 'surface' | 'outline' | 'ghost'
  navigation?: 'none' | 'prev-next' | 'first-last' | 'all'
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import {
  PaginationRoot,
  PaginationList,
  PaginationListItem,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
} from 'reka-ui'
import FirstIcon from '~icons/radix-icons/double-arrow-left'
import LastIcon from '~icons/radix-icons/double-arrow-right'
import PrevIcon from '~icons/radix-icons/chevron-left'
import NextIcon from '~icons/radix-icons/chevron-right'
import PaginationEllipsis from './PaginationEllipsis.vue'

import { useForwardPropsEmitsWithout, buildPropsClass } from '../util'

const props = withDefaults(defineProps<PaginationProps>(), {
  color: 'gray',
  size: '2',
  variant: 'ghost',
  navigation: 'all',
  itemsPerPage: 10,
})
const emits = defineEmits<PaginationRootEmits>()
const forwarded = useForwardPropsEmitsWithout(
  props, emits, ['color', 'size', 'variant', 'navigation'],
)

const resetClass = buildPropsClass(props, ['size', 'variant'])

const showPrevNext = computed(() => {
  return props.navigation === 'all' || props.navigation === 'prev-next'
})
const showFirstLast = computed(() => {
  return props.navigation === 'all' || props.navigation === 'first-last'
})


</script>

<template>
  <PaginationRoot
    v-bind="forwarded"
    class="ui-PaginationRoot"
    :class="resetClass"
    :data-accent-color="color"
  >
    <PaginationList v-slot="{ items }" class="ui-PaginationList">
      <PaginationFirst
        v-if="showFirstLast"
        class="ui-PaginationFirst ui-Button"
        :class="resetClass"
      >
        <FirstIcon />
      </PaginationFirst>
      <PaginationPrev
        v-if="showPrevNext"
        class="ui-PaginationPrev ui-Button"
        :class="resetClass"
      >
        <PrevIcon />
      </PaginationPrev>
      <template v-for="(page, index) in items" :key="index">
        <PaginationListItem
          v-if="page.type === 'page'"
          class="ui-PaginationListItem ui-Button"
          :class="resetClass"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :items="items"
          :index="index"
          :class="resetClass"
          as="button"
        />
      </template>
      <PaginationNext
        v-if="showPrevNext"
        class="ui-PaginationNext ui-Button"
        :class="resetClass"
      >
        <NextIcon />
      </PaginationNext>
      <PaginationLast
        v-if="showFirstLast"
        class="ui-PaginationLast ui-Button"
        :class="resetClass"
      >
        <LastIcon />
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>

<style>
.ui-PaginationList {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}
.ui-PaginationList .ui-Button {
  height: var(--button-height);
  width: var(--button-height);
  padding: 0;
}

.ui-PaginationRoot:where(.r-variant-ghost):where([data-accent-color="gray"]) :where(.ui-Button) {
  color: var(--accent-12);
}

/** selected on ghost -> outline */
.ui-PaginationRoot:where(.r-variant-ghost) :where(.ui-Button[data-selected]) {
  box-shadow: inset 0 0 0 1px var(--accent-a6);
}
.ui-PaginationRoot:where(.r-variant-soft, .r-variant-surface, .r-variant-outline) :where(.ui-Button[data-selected]) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
.ui-PaginationRoot:where([data-accent-color="gray"]):where(.r-variant-soft, .r-variant-surface, .r-variant-outline) :where(.ui-Button[data-selected]) {
  background-color: var(--accent-12);
}
.ui-PaginationRoot:where(.r-variant-surface, .r-variant-outline) :where(.ui-Button[data-selected]) {
  box-shadow: none;
}
</style>
