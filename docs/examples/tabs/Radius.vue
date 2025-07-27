<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
} from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <TabsRoot default-value="account">
      <TabsList radius="none" variant="classic">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList radius="small" variant="classic">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList radius="medium" variant="classic">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList radius="large" variant="classic">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList radius="full" variant="classic">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>
  </div>
</template>
