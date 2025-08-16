<script setup lang="ts">
import { Content } from 'vitepress'
import Navbar from './partials/Navbar.vue'
import NavHead from './partials/NavHead.vue'
</script>

<template>
  <Navbar>
    <NavHead />
  </Navbar>
  <Content class="landing-content" />
</template>
