<script setup lang="ts">
import { ref } from 'vue'
import { CheckboxGroup, Checkbox } from '#components'

const scopes = ref(['tenant:read'])
</script>

<template>
  <div class="text-sm">
    <div class="flex items-center gap-2 mb-2">
      <span class="font-medium">Token Scopes</span>
      <span>{{ scopes }}</span>
    </div>
    <CheckboxGroup v-model="scopes">
      <label class="flex items-center gap-1">
        <Checkbox parent />
        <span>Tenant Permissions</span>
      </label>
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
    <CheckboxGroup v-model="scopes">
      <label class="flex items-center gap-1">
        <Checkbox parent />
        <span>User Profile</span>
      </label>
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
