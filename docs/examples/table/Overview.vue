<script setup lang="ts">
import { Table } from '@typlog/ui'
</script>

<template>
  <Table variant="surface">
    <thead>
      <tr>
        <th scope="col">Member</th>
        <th scope="col">Role</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Ada Lovelace</th>
        <td>Admin</td>
        <td>Active</td>
      </tr>
      <tr>
        <th scope="row">Grace Hopper</th>
        <td>Editor</td>
        <td>Active</td>
      </tr>
    </tbody>
  </Table>
</template>
