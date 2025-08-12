<script setup lang="ts">
import { Content } from 'vitepress'
import Navbar from './partials/Navbar.vue'
import NavHead from './partials/NavHead.vue'
</script>

<template>
  <Navbar>
    <NavHead />
  </Navbar>
  <main class="max-w-content flex mx-auto pt-28 pb-10 px-6 lg:px-8 lg:pt-18">
    <Content class="prose dark:prose-invert lg:prose-lg max-w-none w-full" />
  </main>
</template>
