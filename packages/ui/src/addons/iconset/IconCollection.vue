<script lang="ts">
import type { IconGridUI } from './IconGrid.vue'
import type { IconifyCollectionGroup, IconifyCollectionItem } from './api'

export interface IconCollectionUI {
  base?: string
  browser?: string
  toolbar?: string
  title?: string
  filter?: string
  groups?: string
  group?: string
  groupTitle?: string
  cards?: string
  card?: string
  info?: string
  samples?: string
  message?: string
  back?: string
  grid?: IconGridUI
}

export interface IconCollectionProps {
  /** The selected icon name, such as `lucide:heart`. */
  modelValue?: string
  /** The current icon set prefix. An empty value displays the collection catalog. */
  collection?: string
  /** The current search query within the selected icon set. */
  query?: string
  /** The current collection catalog filter. */
  filter?: string
  /** Size of each rendered icon. @default 20 */
  iconSize?: string | number
  /** Width and height of each icon button. @default 40 */
  cellSize?: number
  /** Height of the catalog or icon grid scroll viewport. @default 420 */
  height?: string | number
  /** Number of extra icon rows rendered outside the viewport. @default 4 */
  overscan?: number
  /** Classes for the component's stable visual parts. */
  ui?: IconCollectionUI
}

export interface IconCollectionEmits {
  (event: 'update:modelValue', icon: string): void
  (event: 'update:collection', prefix: string): void
  (event: 'update:query', query: string): void
  (event: 'update:filter', filter: string): void
  (event: 'select', icon: string): void
}

export type { IconifyCollectionGroup, IconifyCollectionItem }
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { Button, TextField } from '@typlog/ui'
import IconGrid from './IconGrid.vue'
import { fetchCollections } from './api'

const props = withDefaults(defineProps<IconCollectionProps>(), {
  collection: '',
  query: '',
  filter: '',
  iconSize: 20,
  cellSize: 40,
  height: 420,
  overscan: 4,
})
const emits = defineEmits<IconCollectionEmits>()

const groups = ref<IconifyCollectionGroup[]>([])
const selectedIcon = ref(props.modelValue || '')
const collection = ref(props.collection)
const query = ref(props.query)
const filter = ref(props.filter)
const loading = ref(true)
const error = ref<Error>()

const toCssSize = (size: string | number) => {
  const value = String(size)
  return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value
}
const viewportHeight = computed(() => toCssSize(props.height))
const visibleGroups = computed(() => {
  const normalizedFilter = filter.value.trim().toLowerCase()
  if (!normalizedFilter) return groups.value
  return groups.value.map(group => ({
    ...group,
    items: group.items.filter(item =>
      [group.category, item.name, item.prefix].join(' ').toLowerCase().includes(normalizedFilter),
    ),
  })).filter(group => group.items.length > 0)
})
const collectionCount = computed(() => groups.value.reduce((count, group) => count + group.items.length, 0))

const updateFilter = (value: string) => {
  filter.value = value
  emits('update:filter', value)
}

const selectCollection = (item: IconifyCollectionItem) => {
  collection.value = item.prefix
  query.value = ''
  emits('update:collection', item.prefix)
  emits('update:query', '')
}

const showCollections = () => {
  collection.value = ''
  query.value = ''
  emits('update:collection', '')
  emits('update:query', '')
}

const updateQuery = (value: string) => {
  query.value = value
  emits('update:query', value)
}

const selectIcon = (icon: string) => {
  selectedIcon.value = icon
  emits('update:modelValue', icon)
  emits('select', icon)
}

watch(() => props.modelValue, value => { selectedIcon.value = value || '' })
watch(() => props.collection, value => { collection.value = value })
watch(() => props.query, value => { query.value = value })
watch(() => props.filter, value => { filter.value = value })

onMounted(async () => {
  try {
    groups.value = await fetchCollections()
  } catch (cause) {
    error.value = cause instanceof Error ? cause : new Error('Unable to load icon collections')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="ui-IconCollection" :class="props.ui?.base">
    <IconGrid
      v-if="collection"
      :model-value="selectedIcon"
      :query="query"
      :collections="[collection]"
      :icon-size="props.iconSize"
      :cell-size="props.cellSize"
      :height="props.height"
      :overscan="props.overscan"
      :ui="props.ui?.grid"
      @update:query="updateQuery"
      @select="selectIcon"
    >
      <template #header-leading>
        <Button
          type="button"
          variant="ghost"
          color="gray"
          class="ui-IconCollectionBack"
          :class="props.ui?.back"
          aria-label="Back to icon sets"
          @click="showCollections"
        >
          <Icon icon="lucide:chevron-left" aria-hidden="true" />
          Back
        </Button>
      </template>
    </IconGrid>

    <div
      v-else
      class="ui-IconCollectionBrowser"
      :class="props.ui?.browser"
      :style="{ height: viewportHeight }"
      tabindex="0"
    >
      <div class="ui-IconCollectionToolbar" :class="props.ui?.toolbar">
        <h2 class="ui-IconCollectionTitle" :class="props.ui?.title">{{ collectionCount }} icon sets</h2>
        <TextField
          :model-value="filter"
          type="search"
          placeholder="Filter icon sets..."
          aria-label="Filter icon sets"
          class="ui-IconCollectionFilter"
          :class="props.ui?.filter"
          @update:model-value="updateFilter"
        />
      </div>

      <p
        v-if="loading"
        class="ui-IconCollectionMessage"
        :class="props.ui?.message"
        role="status"
      >
        Loading icon sets...
      </p>
      <p
        v-else-if="error"
        class="ui-IconCollectionMessage"
        :class="props.ui?.message"
        role="alert"
      >
        {{ error.message }}
      </p>
      <p
        v-else-if="visibleGroups.length === 0"
        class="ui-IconCollectionMessage"
        :class="props.ui?.message"
      >
        No icon sets found.
      </p>

      <div v-else class="ui-IconCollectionGroups" :class="props.ui?.groups">
        <section
          v-for="group in visibleGroups"
          :key="group.category"
          class="ui-IconCollectionGroup"
          :class="props.ui?.group"
        >
          <h3 class="ui-IconCollectionGroupTitle" :class="props.ui?.groupTitle">
            <span>{{ group.category }}</span>
            <span>({{ group.items.length }} icon sets)</span>
          </h3>
          <div class="ui-IconCollectionCards" :class="props.ui?.cards">
            <button
              v-for="item in group.items"
              :key="item.prefix"
              type="button"
              class="ui-IconCollectionCard"
              :class="props.ui?.card"
              @click="selectCollection(item)"
            >
              <span class="ui-IconCollectionInfo" :class="props.ui?.info">
                <strong>{{ item.name }}</strong>
                <span>{{ item.license?.title || 'Unknown license' }}</span>
                <span>{{ item.total }} icons</span>
              </span>
              <span class="ui-IconCollectionSamples" :class="props.ui?.samples" aria-hidden="true">
                <Icon
                  v-for="sample in item.samples?.slice(0, 6)"
                  :key="sample"
                  :icon="`${item.prefix}:${sample}`"
                />
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style>
@layer components {
  .ui-IconCollection {
    container-name: icon-collection;
    container-type: inline-size;
    min-width: 0;
  }

  .ui-IconCollectionBrowser {
    box-sizing: border-box;
    min-width: 0;
    overflow: auto;
    overscroll-behavior: contain;
    border-radius: var(--radius-3);
    outline: none;
  }

  .ui-IconCollectionBrowser:focus-visible {
    outline: 2px solid var(--focus-8);
    outline-offset: 2px;
  }

  .ui-IconCollectionToolbar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .ui-IconCollectionFilter {
    flex: 1 1 auto;
  }

  .ui-IconCollectionTitle,
  .ui-IconCollectionGroupTitle {
    font-weight: var(--font-weight-medium);
  }

  .ui-IconCollectionTitle {
    font-size: var(--font-size-4);
    line-height: var(--line-height-4);
  }

  .ui-IconCollectionGroupTitle span:last-child,
  .ui-IconCollectionInfo span {
    color: var(--gray-a10);
    font-size: var(--font-size-1);
    line-height: var(--line-height-1);
  }

  .ui-IconCollectionGroup {
    margin-bottom: var(--space-4);
  }

  .ui-IconCollectionGroup:last-child {
    margin-bottom: 0;
  }

  .ui-IconCollectionGroupTitle {
    display: flex;
    align-items: baseline;
    gap: var(--space-1);
    margin-bottom: var(--space-2);
    font-size: var(--font-size-3);
    line-height: var(--line-height-3);
  }

  .ui-IconCollectionCards {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: var(--space-2);
  }

  .ui-IconCollectionCard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-2);
    color: inherit;
    text-align: start;
    background: var(--gray-a2);
    border: 1px solid transparent;
    border-radius: var(--radius-3);
    cursor: pointer;
  }

  .ui-IconCollectionCard:hover {
    background: var(--gray-a3);
    border-color: var(--accent-6);
  }

  .ui-IconCollectionCard:focus-visible {
    outline: 2px solid var(--focus-8);
    outline-offset: 2px;
  }

  .ui-IconCollectionInfo {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: var(--space-1);
  }

  .ui-IconCollectionInfo strong {
    overflow: hidden;
    font-size: var(--font-size-2);
    line-height: var(--line-height-2);
    font-weight: var(--font-weight-medium);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ui-IconCollectionSamples {
    display: grid;
    flex: none;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-2);
  }

  .ui-IconCollectionMessage {
    display: grid;
    min-height: 8rem;
    place-items: center;
    padding: var(--space-6);
    color: var(--gray-a11);
    text-align: center;
  }
}

@container icon-collection (min-width: 768px) {
  .ui-IconCollectionToolbar {
    flex-direction: row;
    align-items: center;
  }

  .ui-IconCollectionFilter {
    max-width: 28rem;
  }

  .ui-IconCollectionCards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@container icon-collection (min-width: 1024px) {
  .ui-IconCollectionCards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container icon-collection (min-width: 1280px) {
  .ui-IconCollectionCards {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
