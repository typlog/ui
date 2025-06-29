<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '#components'
</script>

<template>
  <div class="mt-2 flex gap-4">
    <TabsRoot defaultValue="apple">
      <TabsList size="1">
        <TabsTrigger value="apple">Apple</TabsTrigger>
        <TabsTrigger value="banana">Banana</TabsTrigger>
      </TabsList>
      <TabsContent value="apple">
        <p>This is an apple</p>
      </TabsContent>
      <TabsContent value="banana">
        <p>This is an banana</p>
      </TabsContent>
    </TabsRoot>

    <TabsRoot defaultValue="apple">
      <TabsList size="2">
        <TabsTrigger value="apple">Apple</TabsTrigger>
        <TabsTrigger value="banana">Banana</TabsTrigger>
      </TabsList>
      <TabsContent value="apple">
        <p>This is an apple</p>
      </TabsContent>
      <TabsContent value="banana">
        <p>This is an banana</p>
      </TabsContent>
    </TabsRoot>

    <TabsRoot defaultValue="apple">
      <TabsList color="gray" high-contrast>
        <TabsTrigger value="apple">Apple</TabsTrigger>
        <TabsTrigger value="banana">Banana</TabsTrigger>
      </TabsList>
      <TabsContent value="apple">
        <p>This is an apple</p>
      </TabsContent>
      <TabsContent value="banana">
        <p>This is an banana</p>
      </TabsContent>
    </TabsRoot>
  </div>
</template>
