<script lang="ts">
export interface IconGridUI {
  base?: string
  header?: string
  search?: string
  tabs?: string
  tab?: string
  viewport?: string
  content?: string
  cell?: string
  message?: string
}

export interface IconGridProps {
  /** Iconify collection prefixes to display. */
  collections?: string[]
  /** The selected icon name, such as `lucide:heart`. */
  modelValue?: string
  /** The current icon search query. */
  query?: string
  /** Active collection prefix; an empty value displays all collections. */
  activeCollection?: string
  /** Size of each rendered icon. @default 20 */
  iconSize?: string | number
  /** Width and height of each icon button. @default 40 */
  cellSize?: number
  /** Height of the scroll viewport. @default 420 */
  height?: string | number
  /** Classes for the component's stable visual parts. */
  ui?: IconGridUI
  /** Number of extra rows rendered outside the viewport. @default 4 */
  overscan?: number
}

export interface IconGridEmits {
  (event: 'update:modelValue', icon: string): void
  (event: 'update:query', query: string): void
  (event: 'update:activeCollection', prefix: string): void
  (event: 'select', icon: string): void
}
</script>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { TextField } from '#components'
import {
  fetchCollection,
  fetchCollections,
  getCollectionIconNames,
  searchIcons,
} from './api'

const props = withDefaults(defineProps<IconGridProps>(), {
  collections: () => [],
  query: '',
  activeCollection: '',
  iconSize: 20,
  cellSize: 40,
  height: 420,
  overscan: 4,
})
const emits = defineEmits<IconGridEmits>()

const viewport = ref<HTMLElement>()
const viewportWidth = ref(0)
const icons = ref<string[]>([])
const labels = ref<Record<string, string>>({})
const selectedIcon = ref(props.modelValue || '')
const query = ref(props.query)
const activeCollection = ref(props.activeCollection)
const loading = ref(false)
const error = ref<Error>()
const requestId = ref(0)
let searchController: AbortController | undefined

const toCssSize = (size: string | number) => {
  const value = String(size)
  return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value
}
const iconSize = computed(() => toCssSize(props.iconSize))
const viewportHeight = computed(() => toCssSize(props.height))
const columns = computed(() => Math.max(1, Math.floor(viewportWidth.value / props.cellSize) || 1))
const rowCount = computed(() => Math.ceil(icons.value.length / columns.value))
const activePrefix = computed(() => {
  if (props.collections.length <= 1) return props.collections[0] || ''
  return props.collections.includes(activeCollection.value) ? activeCollection.value : ''
})
const hasCollectionTabs = computed(() => props.collections.length > 1)

const virtualizer = useVirtualizer<HTMLElement, HTMLElement>({
  get count() { return rowCount.value },
  getScrollElement() { return viewport.value || null },
  estimateSize() { return props.cellSize },
  getItemKey(index) { return `${activePrefix.value}:${query.value}:${index}` },
  get overscan() { return props.overscan },
})

const virtualRows = computed(() => virtualizer.value.getVirtualItems())

const selectCollection = (prefix: string) => {
  activeCollection.value = prefix
  emits('update:activeCollection', prefix)
}

const selectIcon = (icon: string) => {
  selectedIcon.value = icon
  emits('update:modelValue', icon)
  emits('select', icon)
}

const updateQuery = (value: string) => {
  query.value = value
  emits('update:query', value)
}

const resetScroll = async () => {
  await nextTick()
  virtualizer.value.scrollToOffset(0)
  virtualizer.value.measure()
}

const loadIcons = async () => {
  const id = ++requestId.value
  searchController?.abort()
  searchController = undefined
  error.value = undefined
  icons.value = []
  const normalizedQuery = query.value.trim()

  if (props.collections.length === 0 && !normalizedQuery) {
    loading.value = false
    await resetScroll()
    return
  }

  loading.value = true
  try {
    if (props.collections.length === 0) {
      searchController = new AbortController()
      const result = await searchIcons(normalizedQuery, searchController.signal)
      if (id !== requestId.value) return
      icons.value = result.icons
    } else {
      const prefixes = activePrefix.value ? [activePrefix.value] : props.collections
      const data = await Promise.all(prefixes.map(prefix => fetchCollection(prefix)))
      if (id !== requestId.value) return
      const nextIcons: string[] = []
      data.forEach((collection, index) => {
        const prefix = prefixes[index]
        getCollectionIconNames(collection, normalizedQuery).forEach(name => nextIcons.push(`${prefix}:${name}`))
      })
      icons.value = [...new Set(nextIcons)]
    }
  } catch (cause) {
    if (id !== requestId.value || (cause instanceof DOMException && cause.name === 'AbortError')) return
    error.value = cause instanceof Error ? cause : new Error('Unable to load icons')
  } finally {
    if (id === requestId.value) {
      loading.value = false
      resetScroll()
    }
  }
}

const loadLabels = async () => {
  if (props.collections.length === 0) {
    labels.value = {}
    return
  }
  try {
    const groups = await fetchCollections()
    const next: Record<string, string> = {}
    groups.forEach(group => group.items.forEach(item => { next[item.prefix] = item.name }))
    labels.value = next
  } catch {
    labels.value = {}
  }
}

const resizeObserver = typeof ResizeObserver !== 'undefined'
  ? new ResizeObserver(entries => { viewportWidth.value = entries[0]?.contentRect.width || 0 })
  : undefined

watch(viewport, (element, previous) => {
  if (previous) resizeObserver?.unobserve(previous)
  if (element) {
    resizeObserver?.observe(element)
    const style = getComputedStyle(element)
    viewportWidth.value = element.clientWidth
      - Number.parseFloat(style.paddingLeft)
      - Number.parseFloat(style.paddingRight)
  }
})
watch(() => props.modelValue, value => { selectedIcon.value = value || '' })
watch(() => props.query, value => { query.value = value })
watch(() => props.activeCollection, value => { activeCollection.value = value })
watch(() => [props.collections, query.value, activeCollection.value], loadIcons, { deep: true, immediate: true })
watch(() => props.collections, loadLabels, { deep: true, immediate: true })
watch(() => props.cellSize, () => virtualizer.value.measure())
onBeforeUnmount(() => {
  searchController?.abort()
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="ui-IconGrid" :class="props.ui?.base">
    <div class="ui-IconGridHeader" :class="props.ui?.header">
      <slot name="header-leading"></slot>
      <slot name="header-search">
        <TextField
          :model-value="query"
          type="search"
          placeholder="Search icons..."
          aria-label="Search icons"
          class="ui-IconGridSearch"
          :class="props.ui?.search"
          @update:model-value="updateQuery"
        />
      </slot>
    </div>
    <div
      v-if="hasCollectionTabs"
      class="ui-IconGridTabs"
      :class="props.ui?.tabs"
      role="group"
      aria-label="Icon collections"
    >
      <button
        type="button"
        :class="[props.ui?.tab, { 'is-active': !activePrefix }]"
        :aria-pressed="!activePrefix"
        @click="selectCollection('')"
      >
        All
      </button>
      <button
        v-for="prefix in props.collections"
        :key="prefix"
        type="button"
        :class="[props.ui?.tab, { 'is-active': activePrefix === prefix }]"
        :aria-pressed="activePrefix === prefix"
        @click="selectCollection(prefix)"
      >
        {{ labels[prefix] || prefix }}
      </button>
    </div>

    <div
      ref="viewport"
      class="ui-IconGridViewport"
      :class="props.ui?.viewport"
      :style="{ height: viewportHeight }"
      tabindex="0"
    >
      <p v-if="loading" class="ui-IconGridMessage" :class="props.ui?.message" role="status">
        Loading icons...
      </p>
      <p v-else-if="error" class="ui-IconGridMessage" :class="props.ui?.message" role="alert">
        {{ error.message }}
      </p>
      <p v-else-if="icons.length === 0" class="ui-IconGridMessage" :class="props.ui?.message">
        No icons found.
      </p>
      <div
        v-else
        class="ui-IconGridContent"
        :class="props.ui?.content"
        :style="{ height: `${virtualizer.getTotalSize()}px` }"
      >
        <div
          v-for="row in virtualRows"
          :key="String(row.key)"
          class="ui-IconGridRow"
          :style="{ transform: `translateY(${row.start}px)`, height: `${props.cellSize}px` }"
        >
          <button
            v-for="icon in icons.slice(row.index * columns, (row.index + 1) * columns)"
            :key="icon"
            type="button"
            class="ui-IconGridCell"
            :class="props.ui?.cell"
            :aria-label="icon"
            :aria-pressed="selectedIcon === icon"
            :title="icon"
            :style="{ flexBasis: `${100 / columns}%` }"
            @click="selectIcon(icon)"
          >
            <Icon :icon="icon" :style="{ fontSize: iconSize }" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@layer components {
  .ui-IconGrid {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: var(--space-3);
  }

  .ui-IconGridHeader {
    display: flex;
    gap: var(--space-4);
    align-items: center;
  }

  .ui-IconGridSearch {
    width: 100%;
  }

  .ui-IconGridTabs {
    display: inline-flex;
    align-self: flex-start;
    max-width: 100%;
    overflow-x: auto;
    padding: 2px;
    gap: 2px;
    background: var(--gray-a3);
    border-radius: var(--radius-3);
  }

  .ui-IconGridTabs button {
    padding: var(--space-1) var(--space-3);
    color: var(--gray-a11);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
    white-space: nowrap;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--radius-2);
    cursor: pointer;
  }

  .ui-IconGridTabs button:hover,
  .ui-IconGridTabs button.is-active {
    color: var(--gray-12);
    background: var(--color-panel-solid);
    border-color: var(--gray-a5);
  }

  .ui-IconGridTabs button:focus-visible,
  .ui-IconGridCell:focus-visible {
    outline: 2px solid var(--focus-8);
    outline-offset: 2px;
  }

  .ui-IconGridViewport {
    position: relative;
    box-sizing: border-box;
    min-width: 0;
    overflow: auto;
    overscroll-behavior: contain;
    border-radius: var(--radius-3);
    outline: none;
  }

  .ui-IconGridViewport:focus-visible {
    outline: 2px solid var(--focus-8);
    outline-offset: 2px;
  }

  .ui-IconGridContent {
    position: relative;
    width: 100%;
  }

  .ui-IconGridRow {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    align-items: stretch;
  }

  .ui-IconGridCell {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    min-width: 0;
    height: 100%;
    padding: var(--space-2);
    color: var(--gray-12);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--radius-3);
    cursor: pointer;
  }

  .ui-IconGridCell:hover,
  .ui-IconGridCell[aria-pressed='true'] {
    background: var(--gray-a3);
  }

  .ui-IconGridMessage {
    display: grid;
    height: 100%;
    min-height: 8rem;
    place-items: center;
    padding: var(--space-6);
    color: var(--gray-a11);
    text-align: center;
  }
}
</style>
