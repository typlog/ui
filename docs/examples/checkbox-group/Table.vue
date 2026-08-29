<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, CheckboxGroup, Table } from '@typlog/ui'

const permissions = ['read', 'write', 'publish']
const selected = ref(['read'])
</script>

<template>
  <CheckboxGroup
    v-model="selected"
    :all-values="permissions"
    :as="Table"
    content-as="tbody"
    orientation="vertical"
    variant="surface"
  >
    <template #select-all="{ checkboxProps }">
      <thead>
        <tr>
          <th class="w-8">
            <Checkbox v-bind="checkboxProps" aria-label="Select all permissions" />
          </th>
          <th>Permission</th>
        </tr>
      </thead>
    </template>

    <tr v-for="permission in permissions" :key="permission">
      <td>
        <Checkbox
          :value="permission"
          :aria-label="`Select ${permission} permission`"
        />
      </td>
      <td class="capitalize">
        {{ permission }}
      </td>
    </tr>
  </CheckboxGroup>
</template>
