<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Badge, Button, Card } from '#components'
import HomeHero from './HomeHero.vue'

const principles = [
  {
    icon: 'lucide:accessibility',
    title: 'Accessible by default',
    description: 'Built on Reka UI primitives with keyboard behavior and semantics already considered.',
  },
  {
    icon: 'lucide:palette',
    title: 'A coherent color system',
    description: 'Radix Colors give every component a dependable light and dark mode foundation.',
  },
  {
    icon: 'lucide:code-2',
    title: 'Designed for Vue',
    description: 'Small, composable Vue components that stay close to the way you already build interfaces.',
  },
]

const collections = [
  {
    icon: 'lucide:mouse-pointer-2',
    title: 'Elements',
    description: 'Avatar, Badge, Icon, Card, and other everyday building blocks.',
    link: '/components/avatar',
  },
  {
    icon: 'lucide:text-cursor-input',
    title: 'Form',
    description: 'Inputs, Select, Checkbox, Radio, Switch, and Toggle controls.',
    link: '/components/text-field',
  },
  {
    icon: 'lucide:sliders-horizontal',
    title: 'Controls',
    description: 'Tabs, Pagination, Accordion, and Collapsible interactions.',
    link: '/components/tabs',
  },
  {
    icon: 'lucide:layers-3',
    title: 'Overlays',
    description: 'Dialog, Dropdown, Popover, Tooltip, and Toast patterns.',
    link: '/components/dialog',
  },
]
</script>

<template>
  <div class="not-prose">
    <HomeHero />

    <main>
      <section class="border-b border-gray-a3">
        <div class="mx-auto grid max-w-screen-2xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <p class="font-mono text-xs font-medium uppercase tracking-wide text-gray-10">The foundation</p>
            <h2 class="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-gray-12 sm:text-4xl">
              Fewer decisions between you and a polished interface.
            </h2>
            <p class="mt-5 max-w-md text-base leading-7 text-gray-11">
              Typlog UI brings accessible behavior, useful defaults, and a calm visual language together in one Vue component library.
            </p>
          </div>

          <div class="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            <article v-for="principle in principles" :key="principle.title" class="border-t border-gray-a5 pt-4">
              <span class="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-a3 text-accent-11">
                <Icon aria-hidden="true" class="h-4 w-4" :icon="principle.icon" />
              </span>
              <h3 class="text-base font-semibold leading-6 text-gray-12">{{ principle.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-gray-11">{{ principle.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="collections" class="border-b border-gray-a3">
        <div class="mx-auto grid max-w-screen-2xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <p class="font-mono text-xs font-medium uppercase tracking-wide text-gray-10">Browse the system</p>
            <h2 class="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight text-gray-12 sm:text-4xl">
              Start with the pieces your product needs now.
            </h2>
            <p class="mt-5 max-w-md text-base leading-7 text-gray-11">
              Explore the library by intent instead of hunting through a long component list.
            </p>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <Card
              v-for="collection in collections"
              :key="collection.title"
              :as="'a'"
              :href="collection.link"
              size="3"
              class="group transition-colors hover:border-accent-8"
            >
              <span class="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-a3 text-gray-12 transition-colors group-hover:bg-accent-a3 group-hover:text-accent-11">
                <Icon aria-hidden="true" class="h-5 w-5" :icon="collection.icon" />
              </span>
              <h3 class="text-base font-semibold leading-6 text-gray-12">{{ collection.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-gray-11">{{ collection.description }}</p>
              <span class="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gray-11 transition-colors group-hover:text-accent-11">
                Explore
                <Icon aria-hidden="true" class="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" icon="lucide:arrow-right" />
              </span>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <div class="mx-auto max-w-screen-2xl px-5 py-16 sm:px-6 sm:py-20">
          <Card variant="soft" size="5" class="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div class="max-w-2xl">
              <Badge color="indigo" variant="soft" size="2">Get started</Badge>
              <h2 class="mt-4 text-3xl font-semibold leading-tight tracking-tight text-gray-12 sm:text-4xl">
                Build the next screen with a stronger starting point.
              </h2>
              <p class="mt-4 text-base leading-7 text-gray-11">
                Install Typlog UI, pick a component, and keep your attention on the product instead of the plumbing.
              </p>
            </div>
            <div class="flex shrink-0 flex-wrap gap-3">
              <Button as="a" href="/overview/getting-started" size="3">Read the guide</Button>
              <Button
                as="a"
                href="https://github.com/typlog/ui"
                color="gray"
                high-contrast
                size="3"
              >
                <Icon aria-hidden="true" icon="simple-icons:github" />
                GitHub
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  </div>
</template>
