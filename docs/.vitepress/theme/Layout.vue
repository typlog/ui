<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { ThemeProvider } from '../../../src/components'

const { Layout } = DefaultTheme
</script>

<template>
  <ThemeProvider as-child>
    <Layout></Layout>
  </ThemeProvider>
</template>
