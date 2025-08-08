<script setup lang="ts">
import { Content } from 'vitepress'
import Navbar from './partials/Navbar.vue'
import NavHead from './partials/NavHead.vue'
import NavMenu from './partials/NavMenu.vue'
</script>

<template>
  <Navbar>
    <NavHead />
    <NavMenu />
  </Navbar>
  <main class="max-w-content flex mx-auto pt-28 pb-10 lg:pt-0 lg:px-8">
    <Content class="prose dark:prose-invert lg:prose-lg max-w-none" />
  </main>
</template>
