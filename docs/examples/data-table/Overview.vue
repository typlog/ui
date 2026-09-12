<script setup lang="ts">
import { Badge, Button, DataTable } from '@typlog/ui'
import type { DataTableColumn } from '@typlog/ui'

type Member = {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Invited'
}

const columns: DataTableColumn<Member>[] = [
  { key: 'name', label: 'Member', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
]

const members: Member[] = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Katherine Johnson', email: 'katherine@example.com', role: 'Analyst', status: 'Active' },
  { id: 4, name: 'Margaret Hamilton', email: 'margaret@example.com', role: 'Engineer', status: 'Invited' },
  { id: 5, name: 'Dorothy Vaughan', email: 'dorothy@example.com', role: 'Manager', status: 'Active' },
  { id: 6, name: 'Mary Jackson', email: 'mary@example.com', role: 'Engineer', status: 'Invited' },
]
</script>

<template>
  <DataTable
    caption="Workspace members"
    :columns="columns"
    :rows="members"
    row-key="id"
    :page-size="5"
  >
    <template #toolbar>
      <Button size="2">Invite member</Button>
    </template>
    <template #cell-status="{ value }">
      <Badge :color="value === 'Active' ? 'green' : 'amber'">
        {{ value }}
      </Badge>
    </template>
  </DataTable>
</template>
