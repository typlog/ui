---
title: Getting started
description: A quick tutorial to begin your journey with Typlog UI.
---

## Installation

### 1. Install the library

Install the package from your command line.

<InstallTabs name="@typlog/ui" />

### 2. Import the CSS file

Import the global CSS file at the root of your application.

```css
@import "@typlog/ui";
```

### 3. Add the ThemeProvider

Add `ThemeProvider` to your `App.vue`.

```vue
<script setup lang="ts">
  import { ThemeProvider } from '@typlog/ui'
</script>

<template>
  <ThemeProvider>
    <!-- your application -->
  </ThemeProvider>
</template>
```

## Customizing your theme

```vue
<template>
  <ThemeProvider accent-color="crimson" gray-color="sand" radius="large" scaling="95%">
    <!-- your application -->
  </ThemeProvider>
</template>
```
