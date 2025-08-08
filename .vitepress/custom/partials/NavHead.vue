<script setup lang="ts">
import { useData } from 'vitepress'
import MoonIcon from '~icons/radix-icons/moon'
import SunIcon from '~icons/radix-icons/sun'
import {
  IconButton,
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
} from '#components'
import { Icon } from '@iconify/vue'
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
      <div class="grow">
        <NavigationMenuRoot class="hidden md:block md:pl-6">
          <NavigationMenuList>
            <NavigationMenuItem v-for="(nav, index) in theme.nav" :key="index">
              <NavigationMenuTrigger
                v-if="nav.items"
                :href="nav.link"
              >
                {{ nav.text }}
              </NavigationMenuTrigger>
              <NavigationMenuLink v-else :href="nav.link">{{ nav.text }}</NavigationMenuLink>
              <NavigationMenuContent v-if="nav.items" class="isolate p-2 max-w-[560px]">
                <ul class="grid grid-cols-2">
                  <li v-for="item in nav.items" :key="item.link">
                    <a class="flex gap-2 p-2 rounded hover:bg-gray-a3" :href="item.link">
                      <Icon v-if="item.icon" :icon="item.icon" class="mt-1 shrink-0" />
                      <div class="flex flex-col">
                        <span class="text-sm font-medium">{{ item.text }}</span>
                        <span class="text-sm text-gray-11">{{ item.description }}</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuRoot>
      </div>
      <div class="flex items-center gap-x-2">
        <IconButton variant="ghost" color="gray" @click="changeColorMode">
          <MoonIcon v-if="mode === 'dark'" />
          <SunIcon v-else />
        </IconButton>
      </div>
    </div>
  </div>
</template>
