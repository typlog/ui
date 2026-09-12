<script lang="ts" generic="Row extends object">
export type DataTableSortDirection = 'ascending' | 'descending'

export interface DataTableSort {
  key: string
  direction: DataTableSortDirection
}

export interface DataTableRequest {
  page: number
  pageSize: number
  search: string
  sort?: DataTableSort
}

export interface DataTableColumn<Row extends object = Record<string, unknown>> {
  /** Stable column identifier and fallback property name. */
  key: string
  /** Visible column heading. */
  label: string
  /** Returns the value used for rendering, filtering, and sorting. */
  accessor?: (row: Row) => unknown
  /** Allows users to sort the column. */
  sortable?: boolean
  /** Includes the column in text filtering. Defaults to `true`. */
  searchable?: boolean
  /** Aligns the heading and cell content. */
  align?: 'start' | 'center' | 'end'
  /** Sets the column width. */
  width?: string
}

export interface DataTableProps<Row extends object = Record<string, unknown>> {
  /** Column definitions in display order. */
  columns: readonly DataTableColumn<Row>[]
  /** Rows displayed by the table. */
  rows: readonly Row[]
  /** Property or function that returns a stable key for each row. */
  rowKey?: keyof Row & string | ((row: Row, index: number) => string | number)
  /** Accessible table caption. */
  caption?: string
  /** Shows the built-in text filter. */
  searchable?: boolean
  /** Accessible label for the text filter. */
  searchLabel?: string
  /** Placeholder displayed by the text filter. */
  searchPlaceholder?: string
  /** Number of rows displayed on each page. */
  pageSize?: number
  /** Controlled current page. Can be bound with `v-model:page`. */
  page?: number
  /** Controlled text filter. Can be bound with `v-model:search`. */
  search?: string
  /** Controlled sort state. Can be bound with `v-model:sort`. */
  sort?: DataTableSort | null
  /**
   * Disables client-side filtering, sorting, and pagination. In manual mode,
   * `rows` should contain the current page and `request` drives data loading.
   */
  manual?: boolean
  /** Total row count used for pagination in manual mode. */
  total?: number
  /** Displays the loading state instead of rows. */
  loading?: boolean
  /** Message displayed while rows are loading. */
  loadingText?: string
  /** Message displayed when no rows match. */
  emptyText?: string
  /** Controls table density. */
  size?: '1' | '2' | '3'
  /** Controls the table surface treatment. */
  variant?: 'surface' | 'ghost'
  /** Controls the native table layout algorithm. */
  layout?: 'auto' | 'fixed'
}

export interface DataTableEmits {
  /** Emitted when the text filter changes. */
  'update:search': [value: string]
  /** Emitted when the current page changes. */
  'update:page': [value: number]
  /** Emitted when sorting changes or is cleared. */
  'update:sort': [value: DataTableSort | null]
  /** Emitted on mount and whenever query state changes in manual mode. */
  'request': [request: DataTableRequest]
}

export interface DataTableCellSlotProps<Row extends object = Record<string, unknown>> {
  row: Row
  column: DataTableColumn<Row>
  value: unknown
}

export interface DataTableToolbarSlotProps<Row extends object = Record<string, unknown>> {
  rows: readonly Row[]
  query: string
  clearSearch: () => void
}

export type DataTableSlots<Row extends object = Record<string, unknown>> = {
  [name: `cell-${string}`]: (props: DataTableCellSlotProps<Row>) => any
} & {
  toolbar?: (props: DataTableToolbarSlotProps<Row>) => any
  loading?: () => any
  empty?: (props: { query: string }) => any
}
</script>

<script setup lang="ts" generic="Row extends object">
import { computed, onMounted, ref, watch } from 'vue'
import ArrowDownIcon from '~icons/radix-icons/arrow-down'
import ArrowUpIcon from '~icons/radix-icons/arrow-up'
import CaretSortIcon from '~icons/radix-icons/caret-sort'
import SearchIcon from '~icons/radix-icons/magnifying-glass'
import Pagination from '../pagination/Pagination.vue'
import Table from '../table/Table.vue'
import TextField from '../inputs/TextField.vue'

type IndexedRow = {
  row: Row
  index: number
}

const props = withDefaults(defineProps<DataTableProps<Row>>(), {
  searchable: true,
  searchLabel: 'Search rows',
  searchPlaceholder: 'Filter rows…',
  pageSize: 10,
  manual: false,
  loading: false,
  loadingText: 'Loading rows…',
  emptyText: 'No results found.',
  size: '2',
  variant: 'surface',
  layout: 'auto',
})

const emits = defineEmits<DataTableEmits>()
defineSlots<DataTableSlots<Row>>()

const internalSearch = ref(props.search ?? '')
const internalPage = ref(props.page ?? 1)
const internalSort = ref<DataTableSort | null>(props.sort ?? null)

const currentSearch = computed({
  get: () => props.search ?? internalSearch.value,
  set (value: string) {
    internalSearch.value = value
    emits('update:search', value)
  },
})
const currentPage = computed({
  get: () => Math.max(1, Math.floor(props.page ?? internalPage.value)),
  set (value: number) {
    const nextPage = Math.max(1, Math.floor(value))
    if (nextPage === currentPage.value) return
    internalPage.value = nextPage
    emits('update:page', nextPage)
  },
})
const currentSort = computed({
  get: () => props.sort === undefined ? internalSort.value : props.sort,
  set (value: DataTableSort | null) {
    internalSort.value = value
    emits('update:sort', value)
  },
})

const normalizedPageSize = computed(() => Math.max(1, Math.floor(props.pageSize)))
const normalizedQuery = computed(() => currentSearch.value.trim().toLocaleLowerCase())

const indexedRows = computed<IndexedRow[]>(() => {
  return props.rows.map((row, index) => ({ row, index }))
})

const filteredRows = computed(() => {
  if (props.manual) return indexedRows.value
  if (!normalizedQuery.value) return indexedRows.value

  return indexedRows.value.filter(({ row }) => {
    return props.columns.some(column => {
      if (column.searchable === false) return false
      return searchableText(getCellValue(row, column)).includes(normalizedQuery.value)
    })
  })
})

const sortedRows = computed(() => {
  if (props.manual || !currentSort.value) return filteredRows.value

  const column = props.columns.find(candidate => candidate.key === currentSort.value?.key)
  if (!column) return filteredRows.value

  const direction = currentSort.value.direction === 'ascending' ? 1 : -1
  return [...filteredRows.value].sort((left, right) => {
    const result = compareValues(
      getCellValue(left.row, column),
      getCellValue(right.row, column),
    )
    return result === 0 ? left.index - right.index : result * direction
  })
})

const totalRows = computed(() => {
  if (!props.manual) return sortedRows.value.length
  return Math.max(0, props.total ?? props.rows.length)
})
const pageCount = computed(() => Math.max(1, Math.ceil(totalRows.value / normalizedPageSize.value)))
const visibleRows = computed(() => {
  if (props.manual) return sortedRows.value
  const start = (currentPage.value - 1) * normalizedPageSize.value
  return sortedRows.value.slice(start, start + normalizedPageSize.value)
})
const matchedRows = computed(() => sortedRows.value.map(({ row }) => row))
const hasRows = computed(() => visibleRows.value.length > 0)
const hasResults = computed(() => totalRows.value > 0)
const hasPagination = computed(() => totalRows.value > normalizedPageSize.value)
const resultSummary = computed(() => {
  const total = totalRows.value
  if (!total) return '0 rows'

  const start = (currentPage.value - 1) * normalizedPageSize.value + 1
  const pageEnd = props.manual
    ? start + visibleRows.value.length - 1
    : currentPage.value * normalizedPageSize.value
  const end = Math.min(pageEnd, total)
  return `${start}–${end} of ${total} ${total === 1 ? 'row' : 'rows'}`
})
const requestState = computed<DataTableRequest>(() => ({
  page: currentPage.value,
  pageSize: normalizedPageSize.value,
  search: currentSearch.value,
  sort: currentSort.value ? { ...currentSort.value } : undefined,
}))

watch([normalizedQuery, currentSort], () => {
  currentPage.value = 1
})
watch(pageCount, count => {
  currentPage.value = Math.min(currentPage.value, count)
})

let isMounted = false
onMounted(() => {
  isMounted = true
  if (props.manual) emits('request', requestState.value)
})
watch([() => props.manual, requestState], ([manual, request]) => {
  if (isMounted && manual) emits('request', request)
}, { deep: true, flush: 'post' })

function getCellValue(row: Row, column: DataTableColumn<Row>) {
  if (column.accessor) return column.accessor(row)
  return Reflect.get(row, column.key)
}

function searchableText(value: unknown) {
  if (value === null || value === undefined) return ''
  if (value instanceof Date) return value.toISOString().toLocaleLowerCase()
  return String(value).toLocaleLowerCase()
}

function compareValues(left: unknown, right: unknown) {
  if (left === right) return 0
  if (left === null || left === undefined) return 1
  if (right === null || right === undefined) return -1
  if (typeof left === 'number' && typeof right === 'number') return left - right
  if (left instanceof Date && right instanceof Date) return left.getTime() - right.getTime()
  return String(left).localeCompare(String(right), undefined, { numeric: true, sensitivity: 'base' })
}

function formatCellValue(value: unknown) {
  if (value === null || value === undefined || value === '') return '—'
  if (value instanceof Date) return value.toLocaleString()
  return String(value)
}

function rowIdentifier({ row, index }: IndexedRow) {
  if (typeof props.rowKey === 'function') return props.rowKey(row, index)
  if (props.rowKey) {
    const value = Reflect.get(row, props.rowKey)
    if (typeof value === 'string' || typeof value === 'number') return value
  }
  return index
}

function toggleSort(column: DataTableColumn<Row>) {
  if (!column.sortable) return

  if (currentSort.value?.key !== column.key) {
    currentSort.value = { key: column.key, direction: 'ascending' }
    return
  }
  if (currentSort.value.direction === 'ascending') {
    currentSort.value = { key: column.key, direction: 'descending' }
    return
  }
  currentSort.value = null
}

function ariaSort(column: DataTableColumn<Row>) {
  if (currentSort.value?.key !== column.key) return undefined
  return currentSort.value.direction
}

function sortActionLabel(column: DataTableColumn<Row>) {
  if (currentSort.value?.key !== column.key) return `Sort ${column.label} ascending`
  if (currentSort.value.direction === 'ascending') return `Sort ${column.label} descending`
  return `Clear ${column.label} sorting`
}

function clearSearch() {
  currentSearch.value = ''
}
</script>

<template>
  <div class="ui-DataTable">
    <div v-if="props.searchable || $slots.toolbar" class="ui-DataTableToolbar">
      <TextField
        v-if="props.searchable"
        v-model="currentSearch"
        class="ui-DataTableSearch"
        type="search"
        :aria-label="props.searchLabel"
        :placeholder="props.searchPlaceholder"
      >
        <template #left>
          <SearchIcon aria-hidden="true" />
        </template>
      </TextField>
      <div v-if="$slots.toolbar" class="ui-DataTableActions">
        <slot
          name="toolbar"
          :rows="matchedRows"
          :query="currentSearch"
          :clear-search="clearSearch"
        ></slot>
      </div>
    </div>

    <Table :size="props.size" :variant="props.variant" :layout="props.layout">
      <caption v-if="props.caption" class="ui-DataTableCaption">
        {{ props.caption }}
      </caption>
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            scope="col"
            :aria-sort="ariaSort(column)"
            :data-align="column.align"
            :style="column.width ? { width: column.width } : undefined"
          >
            <button
              v-if="column.sortable"
              class="ui-DataTableSortButton"
              type="button"
              :aria-label="sortActionLabel(column)"
              @click="toggleSort(column)"
            >
              <span>{{ column.label }}</span>
              <ArrowUpIcon
                v-if="currentSort?.key === column.key && currentSort.direction === 'ascending'"
                aria-hidden="true"
              />
              <ArrowDownIcon
                v-else-if="currentSort?.key === column.key && currentSort.direction === 'descending'"
                aria-hidden="true"
              />
              <CaretSortIcon v-else aria-hidden="true" />
            </button>
            <template v-else>{{ column.label }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.loading">
          <td class="ui-DataTableState" :colspan="props.columns.length || 1">
            <slot name="loading">{{ props.loadingText }}</slot>
          </td>
        </tr>
        <tr v-else-if="!hasRows">
          <td class="ui-DataTableState" :colspan="props.columns.length || 1">
            <slot name="empty" :query="currentSearch">{{ props.emptyText }}</slot>
          </td>
        </tr>
        <tr v-for="entry in visibleRows" v-else :key="rowIdentifier(entry)">
          <td
            v-for="column in props.columns"
            :key="column.key"
            :data-align="column.align"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="entry.row"
              :column="column"
              :value="getCellValue(entry.row, column)"
            >
              {{ formatCellValue(getCellValue(entry.row, column)) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </Table>

    <div v-if="!props.loading && hasResults" class="ui-DataTableFooter">
      <span class="ui-DataTableSummary" aria-live="polite">{{ resultSummary }}</span>
      <Pagination
        v-if="hasPagination"
        v-model:page="currentPage"
        :total="totalRows"
        :items-per-page="normalizedPageSize"
        navigation="prev-next"
        size="1"
      />
    </div>
  </div>
</template>

<style>
@layer components {
  .ui-DataTable {
    display: grid;
    gap: var(--space-3);
    min-width: 0;
  }

  .ui-DataTableToolbar,
  .ui-DataTableFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .ui-DataTableSearch {
    width: min(calc(280px * var(--scaling)), 100%);
  }

  .ui-DataTableActions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-inline-start: auto;
  }

  .ui-DataTableCaption {
    padding: var(--space-3);
    border-block-end: 1px solid var(--gray-a5);
    color: var(--gray-12);
    font-weight: var(--font-weight-semibold);
    text-align: start;
  }

  .ui-DataTableSortButton {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-1);
    width: 100%;
    margin: calc(var(--space-2) * -1);
    padding: var(--space-2);
    border: 0;
    border-radius: max(var(--radius-2), var(--radius-full));
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: inherit;
    cursor: pointer;
  }

  .ui-DataTableSortButton:where(:hover) {
    background-color: var(--gray-a3);
  }

  .ui-DataTableSortButton:where(:focus-visible) {
    outline: 2px solid var(--focus-8);
    outline-offset: 1px;
  }

  .ui-DataTableSortButton > :where(svg) {
    flex: none;
    width: 1em;
    height: 1em;
    color: var(--gray-a10);
  }

  .ui-DataTable :where(th, td):where([data-align='center']) {
    text-align: center;
  }

  .ui-DataTable :where(th, td):where([data-align='end']) {
    text-align: end;
  }

  .ui-DataTable :where(th[data-align='center']) .ui-DataTableSortButton {
    justify-content: center;
  }

  .ui-DataTable :where(th[data-align='end']) .ui-DataTableSortButton {
    justify-content: flex-end;
  }

  .ui-DataTableState {
    height: calc(120px * var(--scaling));
    color: var(--gray-11);
    text-align: center;
  }

  .ui-DataTableSummary {
    color: var(--gray-11);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
  }

  @media (max-width: 520px) {
    .ui-DataTableToolbar {
      align-items: stretch;
      flex-direction: column;
    }

    .ui-DataTableSearch {
      width: 100%;
    }

    .ui-DataTableActions {
      margin-inline-start: 0;
    }
  }
}
</style>
