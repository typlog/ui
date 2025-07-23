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
      <TabsList size="1">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList size="2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList size="1" variant="soft">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList size="2" variant="soft">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList size="1" variant="surface">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList size="2" variant="surface">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </TabsRoot>
  </div>
</template>
