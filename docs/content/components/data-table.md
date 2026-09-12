---
title: Data Table
description: Search, sort, paginate, and customize structured dashboard data.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/data-table
---

`DataTable` is a dashboard composition built on `Table`. It accepts plain
column definitions and rows, then provides filtering, sortable columns,
pagination, loading and empty states, and custom cell rendering without a table
engine dependency. It processes rows client-side by default and supports remote
data through manual mode.

<Example name="data-table/Overview.vue" variant="full" />

Use a `cell-{key}` slot to customize a column. Each cell slot receives the
original `row`, its `column`, and the resolved `value`. The `toolbar` slot is
rendered beside the built-in search field. For server-side state or advanced
features such as grouping and virtualization, compose the lower-level `Table`
component with the table engine used by the application.

## Column definitions

| Property | Type | Description |
| --- | --- | --- |
| `key` | `string` | Stable column identifier and fallback row property. |
| `label` | `string` | Visible column heading. |
| `accessor` | `(row) => unknown` | Resolves computed or nested values. |
| `sortable` | `boolean` | Enables the three-state sort button. |
| `searchable` | `boolean` | Includes the value in text filtering unless set to `false`. |
| `align` | `start \| center \| end` | Aligns the heading and cells. |
| `width` | `string` | Sets the column width. |

## Loading data with fetch

Set `manual` when filtering, sorting, and pagination happen on the server. In
manual mode, `rows` represents the current page and `total` is the total number
of matching rows. `DataTable` emits `request` once after mounting and whenever
the search, page, page size, or sort state changes.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DataTable } from '@typlog/ui'
import type { DataTableColumn, DataTableRequest } from '@typlog/ui'

type Member = {
  id: number
  name: string
  role: string
}

type MemberPage = {
  rows: Member[]
  total: number
}

const columns: DataTableColumn<Member>[] = [
  { key: 'name', label: 'Member', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
]
const rows = ref<Member[]>([])
const total = ref(0)
const loading = ref(false)

async function loadMembers(request: DataTableRequest) {
  const params = new URLSearchParams({
    page: String(request.page),
    pageSize: String(request.pageSize),
    search: request.search,
  })
  if (request.sort) {
    params.set('sort', request.sort.key)
    params.set('direction', request.sort.direction)
  }

  loading.value = true
  try {
    const response = await fetch(`/api/members?${params}`)
    if (!response.ok) throw new Error('Could not load members')

    const result: MemberPage = await response.json()
    rows.value = result.rows
    total.value = result.total
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <DataTable
    manual
    :columns="columns"
    :rows="rows"
    :total="total"
    :loading="loading"
    row-key="id"
    @request="loadMembers"
  />
</template>
```

The search field emits on every input change. Debounce `loadMembers` or cancel
stale requests when the endpoint should not receive a request per keystroke.

## Events

| Event | Payload | When it fires |
| --- | --- | --- |
| `update:search` | `string` | The built-in search field changes or is cleared. |
| `update:page` | `number` | Pagination changes or the current page is reset. |
| `update:sort` | `DataTableSort \| null` | A sortable heading changes or clears the sort. |
| `request` | `DataTableRequest` | Manual mode mounts or its query state changes. |

Use `v-model:search`, `v-model:page`, and `v-model:sort` when the parent also
needs to control those values. They are optional when `@request` is sufficient.

## States

<Example name="data-table/States.vue" />

## API Reference

<PropsTable name="DataTable" />
