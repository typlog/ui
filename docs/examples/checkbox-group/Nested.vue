<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxGroup, Checkbox } from '@typlog/ui'

const tenantScopes = ['tenant:read', 'tenant:write', 'tenant:admin']
const userScopes = ['user:read', 'user:write', 'user:tenants']
const scopes = ref(['tenant:read'])
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <span class="font-medium">Token Scopes</span>
      <span>{{ scopes }}</span>
    </div>
    <CheckboxGroup
      v-model="scopes"
      :all-values="tenantScopes"
      orientation="vertical"
      class="mb-4"
    >
      <template #select-all="{ checkboxProps }">
        <label class="flex items-center gap-1 mb-1">
          <Checkbox v-bind="checkboxProps" />
          <span>Tenant Permissions</span>
        </label>
      </template>
      <label class="pl-4 flex items-center gap-1">
        <Checkbox value="tenant:read" />
        <span>Tenant Read Permission</span>
      </label>
      <label class="pl-4 flex items-center gap-1">
        <Checkbox value="tenant:write" />
        <span>Tenant Write Permission</span>
      </label>
      <label class="pl-4 flex items-center gap-1">
        <Checkbox value="tenant:admin" />
        <span>Tenant Admin Permission</span>
      </label>
    </CheckboxGroup>
    <CheckboxGroup
      v-model="scopes"
      :all-values="userScopes"
      orientation="vertical"
    >
      <template #select-all="{ checkboxProps }">
        <label class="flex items-center gap-1 mb-1">
          <Checkbox v-bind="checkboxProps" />
          <span>User Profile</span>
        </label>
      </template>
      <label class="pl-4 flex items-center gap-1">
        <Checkbox value="user:read" />
        <span>Read user profile</span>
      </label>
      <label class="pl-4 flex items-center gap-1">
        <Checkbox value="user:write" />
        <span>Update user profile</span>
      </label>
      <label class="pl-4 flex items-center gap-1">
        <Checkbox value="user:tenants" />
        <span>Fetch user's tenants</span>
      </label>
    </CheckboxGroup>
  </div>
</template>
