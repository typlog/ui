<script setup lang="ts">
import { useData } from 'vitepress'
import MoonIcon from '~icons/radix-icons/moon'
import SunIcon from '~icons/radix-icons/sun'
import { IconButton } from '#components'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const changeColorMode = () => {
  if (mode.value === 'dark') {
    mode.value = 'light'
  } else {
    mode.value = 'dark'
  }
}

const { theme } = useData()
</script>

<template>
  <div class="nav-head flex items-center lg:px-12 h-16 min-w-0 mx-4 lg:mx-0">
    <div class="h-full relative flex-1 flex items-center gap-x-4 min-w-0">
      <div class="shrink-0">
        <a href="/">Typlog UI</a>
      </div>
      <nav class="hidden md:flex md:pl-6 items-center grow justify-between">
        <div v-for="(nav, index) in theme.nav" :key="index">
          <span>{{ nav.text }}</span>
        </div>
      </nav>
      <div class="flex items-center gap-x-2">
        <IconButton variant="ghost" color="gray" @click="changeColorMode">
          <MoonIcon v-if="mode === 'dark'" />
          <SunIcon v-else />
        </IconButton>
      </div>
    </div>
  </div>
</template>
