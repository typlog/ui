<script lang="ts">
import type { CollectionItem } from './IconifySample.vue'

interface CollectionGroup {
  category: string
  items: CollectionItem[]
}

interface CollectionData {
  prefix: string
  title: string
  total: number
  suffixes?: Record<string, string>
  aliases?: Record<string, string>
  uncategorized?: string[]
  categories?: Record<string, string[]>
  hidden?: string[]
}

interface IconifyCollectionProps {
  prefix?: string
  search?: string
  perpage?: number
  iconSize?: string | number
}

interface IconifyCollectionEmits {
  select: [icon: string]
}

const fetchCollections = async () => {
  const apiLink = 'https://api.iconify.design/collections'
  const resp = await fetch(apiLink)
  const data: Record<string, CollectionItem> = await resp.json()
  const cache: Record<string, CollectionItem[]> = {}
  Object.keys(data).forEach(prefix => {
    const item = data[prefix]
    if (item.hidden) {
      return
    }
    if (!cache[item.category]) {
      cache[item.category] = []
    }
    cache[item.category].push({ ...item, prefix })
  })
  const collections: CollectionGroup[] = []
  Object.keys(cache).forEach(category => {
    collections.push({
      category,
      items: cache[category],
    })
  })
  return collections
}

const searchIcons = async (query: string) => {
  const apiLink = `https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=999`
  const resp = await fetch(apiLink)
  const data = await resp.json()
  return data.icons as string[]
}

const fetchCollectionIcons = async (prefix: string) => {
  const apiLink = `https://api.iconify.design/collection?prefix=${encodeURIComponent(prefix)}&chars=true&aliases=true`
  const resp = await fetch(apiLink)
  const data = await resp.json()
  return data as CollectionData
}

const filterIcons = (names: string[], query?: string, suffix?: string) => {
  return names.filter(key => {
    let match: boolean = true
    if (query && key.indexOf(query) === -1) {
      match = false
    }
    if (suffix && key.indexOf(`-${suffix}`) === -1) {
      match = false
    }
    return match
  })
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { injectDialogRootContext } from 'reka-ui'
import {
  Button,
  Tooltip,
  Pagination,
  TextField,
} from '#components'
import IconifySample from './IconifySample.vue'

const props = withDefaults(defineProps<IconifyCollectionProps>(), {
  perpage: 200,
  iconSize: 20,
})

const emits = defineEmits<IconifyCollectionEmits>()
const dialogContext = injectDialogRootContext(null)

const shouldDisplay = ref<'all' | 'collection' | 'search'>('all')
const groupCollections = ref<CollectionGroup[]>([])
const collectionFilter = ref('')

const page = ref(1)

const searchQuery = ref('')
const searchResultIcons = ref<string[]>([])

const collectionData = ref<CollectionData>()
const collectionQuery = ref('')
const collectionSuffix = ref('')

const reset = () => {
  page.value = 1
  searchQuery.value = ''
  searchResultIcons.value = []
  collectionData.value = undefined
  collectionQuery.value = ''
  collectionSuffix.value = ''
  shouldDisplay.value = 'all'
}

const onSelectIcon = (icon: string) => {
  emits('select', icon)
  if (dialogContext) {
    dialogContext.onOpenChange(false)
  }
}

const onSearch = async () => {
  if (searchQuery.value) {
    shouldDisplay.value = 'search'
    searchResultIcons.value = await searchIcons(searchQuery.value)
  } else {
    shouldDisplay.value = 'all'
  }
}

const onSelectPrefix = async (prefix: string) => {
  collectionData.value = undefined
  collectionQuery.value = ''
  collectionSuffix.value = ''
  shouldDisplay.value = 'collection'
  collectionData.value = await fetchCollectionIcons(prefix)
}

const collectionCount = computed(() => {
  let count = 0
  groupCollections.value.forEach((item) => {
    count += item.items.length
  })
  return count
})

const visibleCollections = computed(() => {
  if (!collectionFilter.value) {
    return groupCollections.value
  }
  return groupCollections.value.map(collection => {
    const items = collection.items.filter(item => {
      const key = [item.category, item.name, item.prefix].join(' ')
      return key.toLowerCase().indexOf(collectionFilter.value) !== -1
    })
    return {...collection, items}
  }).filter(collection => collection.items.length !== 0)
})

const collectionIcons = computed(() => {
  let rv: string[] = []
  if (!collectionData.value) {
    return rv
  }
  if (collectionData.value.uncategorized) {
    rv = filterIcons(collectionData.value.uncategorized, collectionQuery.value, collectionSuffix.value)
  } else if (collectionData.value.categories) {
    Object.keys(collectionData.value.categories).forEach(category => {
      const icons = collectionData.value!.categories![category]
      filterIcons(icons, collectionQuery.value, collectionSuffix.value).forEach(k => { rv.push(k) })
    })
  }
  if (collectionQuery.value && !rv.length && collectionData.value.hidden) {
    rv = filterIcons(collectionData.value.hidden, collectionQuery.value, collectionSuffix.value)
  }
  return rv.map(name => `${collectionData.value?.prefix}:${name}`)
})

const allIcons = computed(() => {
  if (shouldDisplay.value === 'search') {
    return searchResultIcons.value
  } else if (shouldDisplay.value === 'collection') {
    return collectionIcons.value
  } else {
    return []
  }
})

const visibleIcons = computed(() => {
  const start = (page.value - 1) * props.perpage
  const end = page.value * props.perpage
  return allIcons.value.slice(start, end)
})

const iconSize = computed(() => {
  const size = props.iconSize.toString()
  if (/^\d+/.test(size)) {
    return size + 'px'
  } else {
    return size
  }
})

onMounted(async () => {
  if (props.prefix) {
    onSelectPrefix(props.prefix)
  } else if (props.search) {
    searchQuery.value = props.search
    onSearch()
  }
  groupCollections.value = await fetchCollections()
})
</script>

<template>
  <div class="ui-IconifyCollection">
    <div v-show="shouldDisplay === 'all'" class="ui-IconifyCollectionGroups">
      <section class="ui-IconifyCollectionGroupsHead">
        <h1>{{ collectionCount }} icon sets</h1>
        <div class="ui-IconifyCollectionForm">
          <TextField
            v-model="collectionFilter"
            placeholder="Filter icon sets..."
          />
          <TextField
            v-model="searchQuery"
            placeholder="Search icons..."
            @keydown.enter="onSearch"
          />
        </div>
      </section>
      <section
        v-for="collection in visibleCollections"
        :key="collection.category"
        class="ui-IconifyCollectionSample"
      >
        <h1 class="mb-2">
          <span class="font-medium">{{ collection.category }}</span>
          <span class="text-sm ml-1">({{ collection.items.length }} icon sets)</span>
        </h1>
        <div class="ui-IconifyCollectionSampleGrid">
          <IconifySample
            v-for="item in collection.items"
            :key="item.prefix"
            v-bind="item"
            @click.prevent="onSelectPrefix(item.prefix)"
          />
        </div>
      </section>
    </div>
    <div v-if="shouldDisplay !== 'all'" class="ui-IconifyCollectionIcons">
      <div class="ui-IconifyCollectionForm">
        <Button
          type="button"
          variant="surface"
          color="gray"
          @click.prevent="reset"
        >
          Back
        </Button>
        <TextField
          v-if="shouldDisplay === 'search'"
          v-model="searchQuery"
          placeholder="Search icons..."
          @keydown.enter="onSearch"
        />
        <TextField
          v-if="shouldDisplay === 'collection'"
          v-model="collectionQuery"
          placeholder="Search icons..."
        />
      </div>
      <div
        v-if="shouldDisplay === 'collection' && collectionData?.suffixes"
        class="ui-IconifyCollectionSuffixes"
      >
        <Button
          v-for="(k, v) in collectionData.suffixes"
          :key="v"
          :variant="collectionSuffix === v ? 'solid' : 'outline'"
          color="gray"
          high-contrast
          radius="full"
          @click.prevent="collectionSuffix = v"
        >
          {{ k }}
        </Button>
      </div>
      <div class="ui-IconifyCollectionIconGrid" :style="{fontSize: iconSize}">
        <Tooltip v-for="icon in visibleIcons" :key="icon" as="div" :content="icon">
          <button type="button" @click.prevent="onSelectIcon(icon)">
            <Icon :icon="icon" />
          </button>
        </Tooltip>
      </div>
      <Pagination v-model:page="page" :total="allIcons.length" :perpage="perpage" size="2" />
    </div>
  </div>
</template>

<style>
.ui-IconifyCollection {
  container-name: icon-collection;
  container-type: inline-size;
}
.ui-IconifyCollectionForm {
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: var(--space-4);
}
.ui-IconifyCollectionForm .ui-TextField {
  flex-grow: 1;
}
.ui-IconifyCollectionGroupsHead {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  margin-bottom: var(--space-4);
}
@container icon-collection (min-width: 768px) {
  .ui-IconifyCollectionGroupsHead {
    flex-direction: row;
  }
}
.ui-IconifyCollectionGroupsHead > h1 {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-4);
  line-height: var(--line-height-4);
}
.ui-IconifyCollectionSample {
  margin-bottom: var(--space-4);
}
.ui-IconifyCollectionSampleGrid {
  margin-top: var(--space-2);
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
@container icon-collection (min-width: 768px) {
  .ui-IconifyCollectionSampleGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@container icon-collection (min-width: 1024px) {
  .ui-IconifyCollectionSampleGrid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@container icon-collection (min-width: 1280px) {
  .ui-IconifyCollectionSampleGrid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
.ui-IconifyCollectionSuffixes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  flex-grow: 1;
  margin-top: var(--space-4);
}
.ui-IconifyCollectionIconGrid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  flex-grow: 1;
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.ui-IconifyCollectionIconGrid button {
  border: 0;
  padding: var(--space-2);
  border-radius: max(var(--radius-2), var(--radius-full));
}
.ui-IconifyCollectionIconGrid button:hover {
  background-color: var(--gray-a4);
}
</style>
