<script setup lang="ts">
import { computed } from 'vue'
import {
  PaginationEllipsis,
  injectPaginationRootContext,
} from 'reka-ui'
import EllipsisIcon from '~icons/radix-icons/dots-horizontal'

type EllipsisPage = { type: 'ellipsis' }
type NumberPage = { type: 'page', value: number }
type Pages = Array<EllipsisPage | NumberPage>

const props = defineProps<{items: Pages, index: number}>()

const ellipsisPage = computed(() => {
  if (props.index === 1) {
    const page = props.items[props.index + 1] as NumberPage
    return page.value - 1
  } else {
    const page = props.items[props.index - 1] as NumberPage
    return page.value + 1
  }
})

const ctx = injectPaginationRootContext()

const onSelect = () => {
  ctx.onPageChange(ellipsisPage.value)
}
</script>

<template>
  <PaginationEllipsis
    class="ui-PaginationEllipsis ui-Button"
    as="button"
    type="button"
    :value="ellipsisPage"
    :aria-label="`Page ${ellipsisPage}`"
    @click.prevent="onSelect"
  >
    <EllipsisIcon />
  </PaginationEllipsis>
</template>
