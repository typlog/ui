<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onKeyStroke } from '@vueuse/core'
import MiniSearch, { type SearchResult } from 'minisearch'
import { computed, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { useData, type DefaultTheme } from 'vitepress'
import localSearchIndex from '@localSearchIndex'
import {
  DialogDescription,
  DialogPopup,
  DialogRoot,
  DialogTitle,
  TextField,
} from '#components'

interface SearchRecord {
  title: string
  titles: string[]
  text?: string
}

type SearchItem = SearchResult & SearchRecord

interface ResultGroupItem {
  result: SearchItem
  index: number
}

interface ResultGroup {
  pagePath: string
  title: string
  header?: ResultGroupItem
  items: ResultGroupItem[]
}

const descriptionSeparator = '\u0001'
const { localeIndex, theme } = useData()
const open = ref(false)
const query = ref('')
const selectedIndex = ref(-1)
const searchIndex = shallowRef<MiniSearch<SearchRecord>>()

const pageTitles = computed(() => {
  const titles = new Map<string, string>()
  const sidebar = theme.value.sidebar
  const groups = !sidebar
    ? []
    : Array.isArray(sidebar)
      ? sidebar
      : Object.values(sidebar).flat()

  collectPageTitles(groups, titles)
  return titles
})

const results = computed(() => {
  if (!query.value.trim() || !searchIndex.value) return []
  const normalizedQuery = query.value.trim().toLocaleLowerCase()
  const indexedResults = searchIndex.value.search(query.value, {
    fuzzy: 0.2,
    prefix: true,
    boost: { title: 4, text: 2, titles: 1 },
  }).map(result => result as SearchItem)

  const indexedPageTitles = new Map<string, string>()
  for (const result of indexedResults) {
    if (!result.id.includes('#')) {
      indexedPageTitles.set(result.id, result.title)
    }
  }

  const pageResults = new Map<string, SearchItem>()
  for (const result of indexedResults) {
    const pagePath = result.id.split('#', 1)[0]
    const pageTitle = indexedPageTitles.get(pagePath) || pageTitles.value.get(pagePath)
    if (!pageTitle) continue

    const existing = pageResults.get(pagePath)
    if (!existing || result.score > existing.score) {
      pageResults.set(pagePath, {
        ...result,
        id: pagePath,
        title: pageTitle,
        titles: [],
      })
    }
  }

  return [
    ...pageResults.values(),
    ...indexedResults.filter(result => result.id.includes('#')),
  ]
    .sort((a, b) => {
      const aTitle = a.title.toLocaleLowerCase()
      const bTitle = b.title.toLocaleLowerCase()
      const aExact = aTitle === normalizedQuery ? 1 : 0
      const bExact = bTitle === normalizedQuery ? 1 : 0
      if (aExact !== bExact) return bExact - aExact

      const aStartsWith = aTitle.startsWith(normalizedQuery) ? 1 : 0
      const bStartsWith = bTitle.startsWith(normalizedQuery) ? 1 : 0
      if (aStartsWith !== bStartsWith) return bStartsWith - aStartsWith

      return b.score - a.score
    })
})

const resultGroups = computed<ResultGroup[]>(() => {
  const groups = new Map<string, { title: string; root?: SearchItem; sections: SearchItem[] }>()

  for (const result of results.value) {
    const pagePath = result.id.split('#', 1)[0]
    const group = groups.get(pagePath) || {
      title: pageTitles.value.get(pagePath) || result.titles[0] || result.title,
      sections: [],
    }

    if (result.id === pagePath) {
      group.root = result
      group.title = result.title
    } else {
      group.sections.push(result)
    }
    groups.set(pagePath, group)
  }

  let index = 0
  return Array.from(groups.values()).map((group) => {
    return {
      pagePath: group.root?.id || group.sections[0]?.id.split('#', 1)[0] || group.title,
      title: group.title,
      header: group.root
        ? { result: group.root, index: index++ }
        : undefined,
      items: group.sections.map(result => ({ result, index: index++ })),
    }
  }).filter(group => group.header || group.items.length)
})

const displayedResults = computed(() => resultGroups.value.flatMap(group => [
  ...(group.header ? [group.header] : []),
  ...group.items,
]))

const selectedResult = computed(() => displayedResults.value[selectedIndex.value]?.result)

onMounted(async () => {
  const loader = localSearchIndex[localeIndex.value]
  if (!loader) return

  const data = await loader()
  searchIndex.value = MiniSearch.loadJSON<SearchRecord>(data.default, {
    fields: ['title', 'titles', 'text'],
    storeFields: ['title', 'titles', 'text'],
  })
})

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  document.getElementById('docs-search-input')?.focus()
})

watch(displayedResults, (nextResults) => {
  if (!nextResults.length) {
    selectedIndex.value = -1
    return
  }

  selectedIndex.value = Math.min(Math.max(selectedIndex.value, 0), nextResults.length - 1)
})

watch(selectedIndex, async (index) => {
  if (index < 0) return
  await nextTick()
  document
    .querySelector<HTMLElement>(`[data-search-index="${index}"]`)
    ?.scrollIntoView({ block: index === 0 ? 'start' : 'nearest' })
})

onKeyStroke('k', (event) => {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault()
    open.value = true
  }
})

onKeyStroke('/', (event) => {
  const target = event.target as HTMLElement | null
  if (target?.matches('input, textarea, [contenteditable="true"]')) return
  event.preventDefault()
  open.value = true
})

onKeyStroke('ArrowDown', (event) => {
  if (!open.value || !displayedResults.value.length) return
  event.preventDefault()
  selectedIndex.value = (selectedIndex.value + 1) % displayedResults.value.length
})

onKeyStroke('ArrowUp', (event) => {
  if (!open.value || !displayedResults.value.length) return
  event.preventDefault()
  selectedIndex.value = selectedIndex.value <= 0
    ? displayedResults.value.length - 1
    : selectedIndex.value - 1
})

onKeyStroke('Enter', (event) => {
  if (!open.value || !selectedResult.value) return
  event.preventDefault()
  goToResult(selectedResult.value)
})

function goToResult(result: SearchItem) {
  open.value = false
  window.location.href = result.id
}

function getDescription(result: SearchItem) {
  return result.text?.split(descriptionSeparator, 1)[0] || ''
}

function collectPageTitles(items: DefaultTheme.SidebarItem[], titles: Map<string, string>) {
  for (const item of items) {
    if (item.link && item.text && !item.items) {
      titles.set(item.link.split('#', 1)[0], item.text)
    }
    if (item.items) collectPageTitles(item.items, titles)
  }
}

function focusInput() {
  document.getElementById('docs-search-input')?.focus()
}
</script>

<template>
  <div class="flex items-center">
    <button
      class="inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-sm text-gray-11 transition-colors hover:bg-gray-a3 hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
      type="button"
      aria-label="Search"
      aria-keyshortcuts="/ control+k meta+k"
      @click="open = true"
    >
      <Icon aria-hidden="true" class="h-4 w-4" icon="lucide:search" />
      <span class="hidden sm:inline">Search</span>
      <kbd class="hidden rounded border border-gray-a5 px-1.5 py-0.5 text-[11px] leading-none text-gray-10 sm:inline">⌘K</kbd>
    </button>

    <DialogRoot v-model:open="open">
      <DialogPopup class="docs-search-popup" size="3">
        <DialogTitle class="sr-only">Search documentation</DialogTitle>
        <DialogDescription class="sr-only">
          Search documentation by title, description, and content.
        </DialogDescription>

        <div class="flex flex-col gap-3">
          <TextField
            id="docs-search-input"
            ref="search-input"
            v-model="query"
            class="docs-search-field"
            type="search"
            size="3"
            variant="surface"
            placeholder="Search documentation…"
            autocomplete="off"
            aria-label="Search documentation"
          >
            <template #left>
              <Icon aria-hidden="true" class="h-4 w-4 text-gray-10" icon="lucide:search" />
            </template>
            <template #right>
              <button
                v-if="query"
                class="rounded p-0.5 text-gray-10 hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
                type="button"
                aria-label="Clear search"
                @click="query = ''; focusInput()"
              >
                <Icon aria-hidden="true" class="h-4 w-4" icon="lucide:x" />
              </button>
            </template>
          </TextField>

          <div
            v-if="query && !results.length"
            class="px-2 py-8 text-center text-sm text-gray-11"
          >
            No results for “{{ query }}”.
          </div>

          <ul v-else-if="displayedResults.length" class="docs-search-results" role="listbox" aria-label="Search results">
            <li v-for="group in resultGroups" :key="group.pagePath">
              <a
                v-if="group.header"
                class="docs-search-group-title block rounded-md px-3 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent-8)]"
                :class="selectedIndex === group.header.index ? 'docs-search-result-selected' : 'hover:bg-gray-a3'"
                :href="group.header.result.id"
                :data-search-index="group.header.index"
                :aria-selected="selectedIndex === group.header.index"
                role="option"
                @mouseenter="selectedIndex = group.header.index"
                @click="open = false"
              >
                <span class="block truncate text-sm font-semibold text-gray-12">{{ group.title }}</span>
                <span v-if="getDescription(group.header.result)" class="mt-1 block line-clamp-2 text-sm leading-5 text-gray-11">{{ getDescription(group.header.result) }}</span>
              </a>
              <ul v-if="group.items.length" class="docs-search-group-items">
                <li v-for="item in group.items" :key="item.result.id" role="option" :aria-selected="selectedIndex === item.index">
                  <a
                    class="block rounded-md px-3 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent-8)]"
                    :class="selectedIndex === item.index ? 'docs-search-result-selected' : 'hover:bg-gray-a3'"
                    :href="item.result.id"
                    :data-search-index="item.index"
                    @mouseenter="selectedIndex = item.index"
                    @click="open = false"
                  >
                    <span class="block truncate text-sm font-medium text-gray-12">{{ item.result.title }}</span>
                    <span v-if="getDescription(item.result)" class="mt-1 block line-clamp-2 text-sm leading-5 text-gray-11">{{ getDescription(item.result) }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <p v-else class="px-2 py-8 text-center text-sm text-gray-10">
            Type to search the documentation.
          </p>

          <div class="hidden items-center justify-between border-t border-gray-a3 pt-3 text-xs text-gray-10 sm:flex">
            <span><kbd class="rounded border border-gray-a4 px-1">↑</kbd> <kbd class="rounded border border-gray-a4 px-1">↓</kbd> to navigate</span>
            <span><kbd class="rounded border border-gray-a4 px-1">↵</kbd> to select · <kbd class="rounded border border-gray-a4 px-1">esc</kbd> to close</span>
          </div>
        </div>
      </DialogPopup>
    </DialogRoot>
  </div>
</template>

<style>
.docs-search-popup {
  --dialog-popup-padding: var(--space-4);
  width: min(100%, 680px);
}

.docs-search-field {
  width: 100%;
}

.docs-search-results {
  display: flex;
  max-height: min(52vh, 480px);
  flex-direction: column;
  gap: var(--space-1);
  overflow-y: auto;
  margin: 0 calc(var(--space-2) * -1);
  padding: 0 var(--space-2);
}

.docs-search-group-title {
  margin-bottom: var(--space-1);
}

.docs-search-group-items {
  margin-left: var(--space-3);
  border-left: 1px solid var(--gray-a4);
  padding-left: var(--space-2);
}

.docs-search-result-selected {
  background-color: var(--accent-a3);
}
</style>
