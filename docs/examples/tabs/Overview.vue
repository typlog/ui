<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '#components'
</script>

<template>
  <TabsRoot default-value="account">
    <TabsList>
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
</template>
