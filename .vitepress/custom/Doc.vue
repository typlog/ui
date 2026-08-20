<script lang="ts">
import type { SidebarItem, NavSidebarItem } from './types'

const findFirstLink = (item: SidebarItem) => {
  if (item.link) {
    return item.link
  } else if (item.items?.length) {
    return findFirstLink(item.items[0])
  } else {
    return null
  }
}

const isActiveLink = (item: SidebarItem, link: string) => {
  if (item.link === link) {
    return true
  }

  if (!item.items) {
    return false
  }

  for (const child of item.items) {
    if (isActiveLink(child, link)) {
      return true
    }
  }

  return false
}
</script>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useData, useRoute, Content } from 'vitepress'
import { Icon } from '@iconify/vue'
import { ScrollArea, Separator } from '#components'
import Navbar from './partials/Navbar.vue'
import NavHead from './partials/NavHead.vue'
import NavMenu from './partials/NavMenu.vue'
import NavSidebar from './partials/NavSidebar.vue'
import DocSidebar from './partials/Sidebar.vue'
import DocOutline from './partials/Outline.vue'
import DocMetaInfo from './partials/MetaInfo.vue'

const { path } = toRefs(useRoute())
const { theme, page } = useData()

const sidebar = computed(() => {
  const items = theme.value.sidebar as SidebarItem[]
  return items.map(item => {
    const link = findFirstLink(item)
    const active = isActiveLink(item, path.value)
    return { ...item, link, active } as NavSidebarItem
  }).filter(item => Boolean(item.link && item.text))
})

const activeSidebar = computed(() => {
  const found = sidebar.value.filter(item => item.active)[0]
  return found?.items || []
})

interface PageLink {
  text: string
  link: string
}

const pageLinks = computed<PageLink[]>(() => {
  const links: PageLink[] = []

  const visit = (items: SidebarItem[]) => {
    for (const item of items) {
      if (item.link && item.text) {
        links.push({ text: item.text, link: item.link })
      }
      if (item.items) {
        visit(item.items)
      }
    }
  }

  visit(theme.value.sidebar as SidebarItem[])
  return links
})

const pageNavigation = computed(() => {
  const index = pageLinks.value.findIndex(item => item.link === path.value)
  return {
    previous: index > 0 ? pageLinks.value[index - 1] : undefined,
    next: index >= 0 ? pageLinks.value[index + 1] : undefined,
  }
})

const lastUpdated = computed(() => {
  if (!page.value.lastUpdated) {
    return null
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(page.value.lastUpdated)
})

const editPageUrl = computed(() => {
  return `https://github.com/typlog/ui/edit/main/docs/content/${page.value.relativePath}`
})

</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <Navbar>
    <NavHead />
    <NavMenu
      :sections="sidebar"
      :sidebar="activeSidebar"
      :title="page.title"
    />
    <NavSidebar :items="sidebar" />
  </Navbar>
  <main id="main-content" tabindex="-1" class="max-w-content flex mx-auto pt-28 pb-10 lg:pt-0 lg:px-8">
    <div id="sidebar" class="z-20 hidden shrink-0 lg:block w-[18rem]">
      <div class="w-full sticky top-28">
        <ScrollArea class="pr-3 max-h-[calc(100vh-112px)]" scrollbars="vertical">
          <div class="pt-8 text-sm leading-6">
            <DocSidebar :sidebar="activeSidebar" />
          </div>
        </ScrollArea>
      </div>
    </div>
    <div id="content-container" class="grow min-w-0 overflow-hidden px-6 lg:pl-12">
      <div class="box-border pt-8">
        <article class="h-entry relative grow min-w-0 shrink">
          <h1 class="p-name text-4xl font-semibold">{{ page.title }}</h1>
          <div class="mt-2 text-lg text-gray-11">{{ page.description }}</div>
          <DocMetaInfo />
          <Content class="e-content prose dark:prose-invert lg:prose-lg max-w-none" />

          <Separator class="mt-10" />
          <div v-if="page.lastUpdated" class="not-prose pt-5 text-sm text-gray-10">
            <span>
              Last updated {{ lastUpdated }}
            </span>
          </div>

          <div
            v-if="pageNavigation.previous || pageNavigation.next"
            class="not-prose flex items-center justify-between gap-4 my-4"
            aria-label="Page navigation"
          >
            <a
              v-if="pageNavigation.previous"
              :href="pageNavigation.previous.link"
              class="group inline-flex min-w-0 items-center gap-1.5 rounded-md py-2 pr-3 text-sm font-medium text-gray-11 transition-colors hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
            >
              <Icon
                aria-hidden="true"
                class="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5"
                icon="lucide:chevron-left"
              />
              <span class="truncate">{{ pageNavigation.previous.text }}</span>
            </a>
            <span v-else aria-hidden="true"></span>
            <a
              v-if="pageNavigation.next"
              :href="pageNavigation.next.link"
              class="group ml-auto inline-flex min-w-0 items-center gap-1.5 rounded-md py-2 pl-3 text-right text-sm font-medium text-gray-11 transition-colors hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
            >
              <span class="truncate">{{ pageNavigation.next.text }}</span>
              <Icon
                aria-hidden="true"
                class="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                icon="lucide:chevron-right"
              />
            </a>
          </div>
        </article>
      </div>
    </div>
    <div class="hidden xl:block">
      <aside id="aside" class="pl-6 pt-8 w-64 sticky top-28 overflow-y-auto">
        <div class="space-y-5">
          <DocOutline />
          <div
            v-if="page.relativePath"
            class="border-t border-gray-a3 pt-4"
          >
            <a
              class="inline-flex items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-gray-11 transition-colors hover:text-gray-12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
              :href="editPageUrl"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon aria-hidden="true" class="h-3.5 w-3.5" icon="lucide:pencil" />
              Edit this page
            </a>
          </div>
        </div>
      </aside>
    </div>
  </main>
  <footer class="border-t border-gray-a3 bg-[var(--color-background)]">
    <div class="mx-auto flex max-w-screen-2xl flex-col justify-between gap-10 px-4 py-10 sm:px-6 lg:flex-row">
      <div class="space-y-4">
        <a
          class="inline-flex text-sm font-semibold sm:text-base"
          href="/"
        >
          Typlog UI
        </a>
        <p class="max-w-sm text-sm leading-6 text-gray-11">
          Themed components for Reka UI, built with Vue and Radix Colors.
        </p>
        <p class="text-xs text-gray-10">
          Open source component library.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-10 sm:gap-16">
        <section class="space-y-3">
          <h2 class="text-sm font-medium text-gray-10">Documentation</h2>
          <ul class="space-y-2">
            <li>
              <a
                class="inline-flex text-sm font-medium text-gray-12 transition-colors hover:text-accent-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
                href="/overview/getting-started"
              >
                Getting started
              </a>
            </li>
            <li>
              <a
                class="inline-flex text-sm font-medium text-gray-12 transition-colors hover:text-accent-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
                href="/components/avatar"
              >
                Components
              </a>
            </li>
          </ul>
        </section>

        <section class="space-y-3">
          <h2 class="text-sm font-medium text-gray-10">Project</h2>
          <ul class="space-y-2">
            <li>
              <a
                class="inline-flex items-center gap-1 text-sm font-medium text-gray-12 transition-colors hover:text-accent-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
                href="https://github.com/typlog/ui"
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
                <Icon aria-hidden="true" class="h-3.5 w-3.5" icon="lucide:arrow-up-right" />
              </a>
            </li>
            <li>
              <a
                class="inline-flex items-center gap-1 text-sm font-medium text-gray-12 transition-colors hover:text-accent-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-8)]"
                href="https://reka-ui.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Reka UI
                <Icon aria-hidden="true" class="h-3.5 w-3.5" icon="lucide:arrow-up-right" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </footer>
</template>

<style>
.skip-link {
  position: absolute;
  left: var(--space-4);
  top: -4rem;
  z-index: 50;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-2);
  color: var(--gray-12);
  background-color: var(--color-background);
  box-shadow: var(--shadow-3);
  transition: top 120ms ease;
}
.skip-link:focus {
  top: var(--space-2);
}
.reka-icon {
  mask: var(--reka-icon) no-repeat;
  mask-size: 100% 100%;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  font-style: normal;
  background-color: var(--jade-8);
}
</style>
