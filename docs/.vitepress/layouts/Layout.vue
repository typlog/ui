<script setup lang="ts">
import { ThemeProvider } from '#components'
import Navbar from './Navbar.vue'
import Doc from './Doc.vue'
</script>

<template>
  <ThemeProvider>
    <Navbar />
    <Doc />
  </ThemeProvider>
</template>
