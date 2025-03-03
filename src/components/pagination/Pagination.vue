<script lang="ts">
import type { ButtonProps } from '../button/Button.vue'

export interface PaginationProps extends ButtonProps {
  total: number
  perpage?: number
  edge?: number
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import Button from '../button/Button.vue'
import IconButton from '../button/IconButton.vue'
import { extractClass } from '../util'

const props = withDefaults(defineProps<PaginationProps>(), {
  perpage: 10,
  edge: 2,
  size: '1',
  variant: 'ghost',
})

const page = defineModel<number>('page', { required: true })

const resetClass = computed(() => {
  return extractClass(props, ['size', 'variant'])
})

const buttonProps = computed(() => {
  return {
    color: props.color,
    radius: props.radius,
    variant: props.variant,
    size: props.size,
    highContrast: props.highContrast,
    disabled: props.disabled,
  }
})

const pagination = computed(() => {
  const totalPages = Math.ceil(props.total / props.perpage)
  const prevPage = page.value > 1 ? page.value - 1 : null
  const nextPage = page.value < totalPages ? page.value + 1 : null

  const pagesOverflow = 5 + props.edge * 2
  const hasLeftEdge = totalPages > pagesOverflow && page.value > props.edge + 3
  const hasRightEdge = totalPages > pagesOverflow && page.value + props.edge + 2 < totalPages

  const pageList = []

  let left = 2, right = totalPages - 1
  if (hasLeftEdge && !hasRightEdge) {
    left = Math.max(4, totalPages - 2 * props.edge - 2)
  } else if (!hasLeftEdge && hasRightEdge) {
    right = Math.min(2 * props.edge + 3, totalPages - 1)
  } else if (hasLeftEdge && hasRightEdge) {
    left = page.value - props.edge
    right = page.value + props.edge
  }
  for (let i = left; i <= right; i++) {
    pageList.push(i)
  }
  return {
    totalPages: totalPages,
    prev: prevPage,
    next: nextPage,
    hasLeftEdge: hasLeftEdge,
    hasRightEdge: hasRightEdge,
    pageList: pageList,
  }
})

const selectPage = (n: number) => {
  page.value = n
}
const selectLeft = () => {
  selectPage(page.value - props.edge)
}
const selectRight = () => {
  selectPage(page.value + props.edge)
}
</script>

<template>
  <div class="ui-Pagination" :class="resetClass">
    <IconButton
      v-if="pagination.prev"
      v-bind="buttonProps"
      aria-label="Previous"
      @click.prevent="selectPage(pagination.prev)"
    >
      <slot name="prev-page" :page="pagination.prev">
        <Icon icon="lucide:chevron-left" />
      </slot>
    </IconButton>
    <Button
      v-bind="buttonProps"
      :disabled="page === 1"
      aria-current="page"
      @click.prevent="selectPage(1)"
    >
      <slot name="page" :page="1">1</slot>
    </Button>
    <IconButton
      v-if="pagination.hasLeftEdge"
      v-bind="buttonProps"
      @click.prevent="selectLeft"
    >
      <slot name="prev-edge" :page="page - edge">
        <Icon icon="lucide:ellipsis" />
      </slot>
    </IconButton>
    <Button
      v-for="p in pagination.pageList"
      :key="p"
      v-bind="buttonProps"
      :disabled="p === page"
      aria-current="page"
      @click.prevent="selectPage(p)"
    >
      <slot name="page" :page="p">{{ p }}</slot>
    </Button>
    <IconButton
      v-if="pagination.hasRightEdge"
      v-bind="buttonProps"
      @click.prevent="selectRight"
    >
      <slot name="next-edge" :page="page + edge">
        <Icon icon="lucide:ellipsis" />
      </slot>
    </IconButton>
    <Button
      v-if="pagination.totalPages > 1"
      v-bind="buttonProps"
      :disabled="pagination.totalPages === page"
      aria-current="page"
      @click.prevent="selectPage(pagination.totalPages)"
    >
      <slot name="page" :page="pagination.totalPages">{{ pagination.totalPages }}</slot>
    </Button>
    <IconButton
      v-if="pagination.next"
      v-bind="buttonProps"
      aria-label="Next"
      @click.prevent="selectPage(pagination.next)"
    >
      <slot name="next-page" :page="pagination.next">
        <Icon icon="lucide:chevron-right" />
      </slot>
    </IconButton>
  </div>
</template>

<style>
.ui-Pagination {
  display: flex;
  align-items: center;
}
.ui-Pagination:where(.r-size-1) {
  gap: var(--space-1);
}
.ui-Pagination:where(.r-size-2) {
  gap: var(--space-2);
}
.ui-Pagination:where(.r-size-3) {
  gap: var(--space-3);
}
.ui-Pagination:where(.r-size-4) {
  gap: var(--space-4);
}
.ui-Pagination:where(.r-variant-ghost) {
  gap: 0;
}
</style>
