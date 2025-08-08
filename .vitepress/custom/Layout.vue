<script setup lang="ts">
import { useData } from 'vitepress'
import { ThemeProvider } from '#components'
import Doc from './Doc.vue'
import Intro from './Intro.vue'

const { frontmatter } = useData()
</script>

<template>
  <ThemeProvider class="min-h-screen">
    <Intro v-if="frontmatter.layout === 'intro'" />
    <Doc v-else />
  </ThemeProvider>
</template>
