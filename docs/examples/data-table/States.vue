<script setup lang="ts">
import { DataTable } from '@typlog/ui'
import type { DataTableColumn } from '@typlog/ui'

type Report = {
  name: string
  owner: string
}

const columns: DataTableColumn<Report>[] = [
  { key: 'name', label: 'Report' },
  { key: 'owner', label: 'Owner' },
]
</script>

<template>
  <div class="grid gap-4">
    <DataTable
      caption="Loading reports"
      :columns="columns"
      :rows="[]"
      loading
      :searchable="false"
    />
    <DataTable
      caption="Saved reports"
      :columns="columns"
      :rows="[]"
      empty-text="No saved reports yet."
      :searchable="false"
    />
  </div>
</template>
