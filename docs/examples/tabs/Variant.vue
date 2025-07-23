<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '#components'
</script>

<template>
  <div class="flex flex-col gap-4">
    <TabsRoot default-value="account">
      <TabsList variant="surface">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <div class="p-4">
        <TabsContent value="account">
          <p>Make changes to your account.</p>
        </TabsContent>
        <TabsContent value="documents">
          <p>Access and update your documents.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>Edit your profile or update contact information.</p>
        </TabsContent>
      </div>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList variant="soft">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <div class="p-4">
        <TabsContent value="account">
          <p>Make changes to your account.</p>
        </TabsContent>
        <TabsContent value="documents">
          <p>Access and update your documents.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>Edit your profile or update contact information.</p>
        </TabsContent>
      </div>
    </TabsRoot>

    <TabsRoot default-value="account">
      <TabsList variant="outline">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <div class="p-4">
        <TabsContent value="account">
          <p>Make changes to your account.</p>
        </TabsContent>
        <TabsContent value="documents">
          <p>Access and update your documents.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p>Edit your profile or update contact information.</p>
        </TabsContent>
      </div>
    </TabsRoot>
  </div>
</template>
