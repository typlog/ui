---
layout: intro
title: Typlog UI
description: Typlog UI combines Reka UI’s accessibility with Radix Colors’ theming power, so you can focus on building great features — not reinventing components.
---

<script setup>
  import { Icon } from '@iconify/vue'
  import { Button } from '#components'
  import HomeShowcase from '../showcases/HomeShowcase.vue'
</script>

<div class="flex flex-col w-full gap-10 lg:gap-28 lg:flex-row lg:justify-between">

<div class="home-intro lg:w-[600px]">

<Badge variant="solid">WIP</Badge>

# Typlog UI

> Your Accessible Design System

Typlog UI combines **Reka UI**’s accessibility with **Radix Colors**’
theming power, so you can focus on building great features — not
reinventing components.

<div class="flex items-center gap-4 not-prose">
<Button size="3" as="a" href="/overview/getting-started" radius="full">Get started</Button>
<Button size="3" as="a" href="https://github.com/typlog/ui" color="gray" high-contrast radius="full">
<Icon icon="simple-icons:github" />
GitHub
</Button>
</div>

</div>

<div class="flex-grow">

```vue
<script setup lang="ts">
  import { ThemeProvider, Button } from '@typlog/ui'
</script>

<template>
  <ThemeProvider>
    <Button>Hey 👋</Button>
  </ThemeProvider>
</template>

<style>
@import "tailwindcss";
@import "typlog/ui";
</style>
```

</div>
</div>

<HomeShowcase />
