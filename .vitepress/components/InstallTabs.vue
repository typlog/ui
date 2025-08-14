<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '#components'

defineProps<{name: string}>()
</script>

<template>
  <div class="not-prose vp-InstallTabs">
    <TabsRoot default-value="npm">
      <TabsList variant="outline">
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
      </TabsList>

      <TabsContent value="npm">
        <pre><code>npm add {{ name }}</code></pre>
      </TabsContent>
      <TabsContent value="pnpm">
        <pre><code>pnpm add {{ name }}</code></pre>
      </TabsContent>
      <TabsContent value="yarn">
        <pre><code>yarn add {{ name }}</code></pre>
      </TabsContent>
      <TabsContent value="bun">
        <pre><code>bun add {{ name }}</code></pre>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<style>
.vp-InstallTabs {
  border-radius: var(--radius-4);
  border: 1px solid var(--gray-a4);
}
.vp-InstallTabs .ui-TabsList {
  background-color: var(--color-panel-solid);
  border-radius: var(--radius-4) var(--radius-4) 0 0;
  padding-inline: var(--space-2);
}
.vp-InstallTabs pre {
  font-size: var(--font-size-2);
  padding: var(--space-3) var(--space-4);
  color: var(--gray-11);
}
</style>
