---
layout: intro
title: Typlog UI
description: Typlog UI combines Reka UI’s accessibility with Radix Colors’ theming power, so you can focus on building great features — not reinventing components.
---

<script setup>
  import { Icon } from '@iconify/vue'
  import { Button } from '#components'
  import SigninForm from '../showcases/SigninForm.vue'
</script>

<div class="flex flex-col w-full gap-10 lg:flex-row lg:justify-between">

<div class="home-intro lg:w-[600px]">

# Typlog UI

> Your Accessible Design System

Typlog UI combines Reka UI’s accessibility with Radix Colors’ theming power, so you can focus on building great features — not reinventing components.

<div class="flex items-center gap-4 not-prose">
<Button size="3" as="a" href="/components/avatar" radius="full">Get started</Button>
<Button size="3" as="a" href="https://github.com/typlog/ui" color="gray" high-contrast radius="full">
<Icon icon="simple-icons:github" />
GitHub
</Button>
</div>

</div>

<TabsRoot class="border rounded min-w-[480px]" default-value="vue">
<TabsList>
  <TabsTrigger value="vue">App.vue</TabsTrigger>
  <TabsTrigger value="css">style.css</TabsTrigger>
</TabsList>
<TabsContent value="vue">

```vue
<script setup lang="ts">
  import { ThemeProvider, Button } from '@typlog/ui'
</script>

<template>
  <ThemeProvider>
    <Button>Hey 👋</Button>
  </ThemeProvider>
</template>
```

</TabsContent>

<TabsContent value="css">

```css
@import "tailwindcss";
@import "@typlog/ui/base.css";
@import "@typlog/ui/components.css";
```

</TabsContent>

</TabsRoot>
</div>

<div class="not-prose mt-10 border-t py-8">

<div class="w-96">
<SigninForm />
</div>

</div>
