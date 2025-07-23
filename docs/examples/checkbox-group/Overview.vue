<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxGroup, Checkbox } from '#components'

const permissions = ref(['tenant:read'])
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <span class="font-medium">Permissions</span>
      <span>{{ permissions }}</span>
    </div>
    <CheckboxGroup v-model="permissions">
      <label class="flex items-center gap-1 mb-1">
        <Checkbox value="tenant:read" />
        <span>Tenant Read Permission</span>
      </label>
      <label class="flex items-center gap-1 mb-1">
        <Checkbox value="tenant:write" />
        <span>Tenant Write Permission</span>
      </label>
      <label class="flex items-center gap-1 mb-1">
        <Checkbox value="tenant:admin" />
        <span>Tenant Admin Permission</span>
      </label>
    </CheckboxGroup>
  </div>
</template>
