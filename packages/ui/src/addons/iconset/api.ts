export interface IconifyCollectionItem {
  prefix: string
  category: string
  name: string
  samples: string[]
  total: number
  license?: {
    title: string
    spdx?: string
    url?: string
  }
  hidden?: boolean
  [key: string]: unknown
}

export interface IconifyCollectionData {
  prefix: string
  title?: string
  total?: number
  suffixes?: Record<string, string>
  aliases?: Record<string, string>
  uncategorized?: string[]
  categories?: Record<string, string[]>
  hidden?: string[]
}

export interface IconifyCollectionGroup {
  category: string
  items: IconifyCollectionItem[]
}

const apiRoot = 'https://api.iconify.design'
const collectionsCache = new Map<string, Promise<IconifyCollectionGroup[]>>()
const collectionDataCache = new Map<string, Promise<IconifyCollectionData>>()

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`Iconify request failed (${response.status})`)
  }
  return response.json() as Promise<T>
}

/** Fetches the Iconify catalog, grouped by its category. */
export function fetchCollections(): Promise<IconifyCollectionGroup[]> {
  const cached = collectionsCache.get('all')
  if (cached) return cached

  const request = getJson<Record<string, {
    category?: string
    name: string
    samples: string[]
    total: number
    license?: IconifyCollectionItem['license']
    hidden?: boolean
  }>>(`${apiRoot}/collections`)
    .then(data => {
      const groups = new Map<string, IconifyCollectionItem[]>()
      for (const [prefix, item] of Object.entries(data)) {
        if (item.hidden) continue
        const category = item.category || 'Other'
        const group = groups.get(category) || []
        group.push({
          ...item,
          prefix,
          category,
        })
        groups.set(category, group)
      }
      const orderedGroups = [...groups.entries()].map(([category, items]) => ({
        category,
        items,
      }))
      return [
        ...orderedGroups.filter(group => !/archiv|unmaintained/i.test(group.category)),
        ...orderedGroups.filter(group => /archiv|unmaintained/i.test(group.category)),
      ]
    })
  collectionsCache.set('all', request)
  request.catch(() => collectionsCache.delete('all'))
  return request
}

/** Fetches one icon set's names and metadata. Requests are cached by prefix. */
export function fetchCollection(prefix: string): Promise<IconifyCollectionData> {
  const cached = collectionDataCache.get(prefix)
  if (cached) return cached

  const request = getJson<IconifyCollectionData>(
    `${apiRoot}/collection?prefix=${encodeURIComponent(prefix)}&chars=true&aliases=true`,
  )
  collectionDataCache.set(prefix, request)
  request.catch(() => collectionDataCache.delete(prefix))
  return request
}

/** Searches the global Iconify index. The signal lets callers cancel stale requests. */
export function searchIcons(query: string, signal?: AbortSignal): Promise<{ icons: string[] }> {
  return getJson<{ icons?: string[] }>(
    `${apiRoot}/search?query=${encodeURIComponent(query)}&limit=999`,
    signal,
  ).then(data => ({ icons: data.icons || [] }))
}

/** Returns icon names from a collection in stable API order. */
export function getCollectionIconNames(data: IconifyCollectionData, query = ''): string[] {
  const names: string[] = []
  if (data.uncategorized) names.push(...data.uncategorized)
  if (data.categories) {
    for (const category of Object.keys(data.categories)) {
      names.push(...data.categories[category])
    }
  }

  const normalizedQuery = query.toLowerCase()
  const filtered = names.filter(name => !normalizedQuery || name.toLowerCase().includes(normalizedQuery))
  if (filtered.length === 0 && normalizedQuery && data.hidden) {
    filtered.push(...data.hidden.filter(name => name.toLowerCase().includes(normalizedQuery)))
  }
  return [...new Set(filtered)]
}
