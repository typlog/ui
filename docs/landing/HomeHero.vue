<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Badge, Button } from '#components'
import HomeShowcase from './HomeShowcase.vue'
</script>

<template>
  <section class="Hero not-prose overflow-hidden border-b border-gray-a3">
    <div class="HeroGradient pointer-events-none absolute inset-0 -z-10"></div>
    <div class="mx-auto grid max-w-screen-2xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:items-center lg:gap-16">
      <div class="max-w-3xl">
        <Badge variant="soft" size="2">Vue component library</Badge>
        <h1 class="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-12 sm:text-6xl lg:text-7xl">
          Build interfaces with a calmer foundation.
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-7 text-gray-11 sm:text-lg sm:leading-8">
          Typlog UI combines <strong class="font-semibold text-gray-12">Reka UI</strong>’s accessibility with <strong class="font-semibold text-gray-12">Radix Colors</strong>’ theming power, so you can focus on building great features — not reinventing components.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <Button size="3" as="a" href="/overview/getting-started">Get started</Button>
          <Button
            size="3"
            as="a"
            href="https://github.com/typlog/ui"
            color="gray"
            high-contrast
          >
            <Icon aria-hidden="true" icon="simple-icons:github" />
            View on GitHub
          </Button>
        </div>
        <p class="mt-5 text-sm text-gray-10">Open source · Vue-first · Built on Reka UI</p>
      </div>

      <div class="min-w-0 lg:justify-self-end">
        <HomeShowcase />
      </div>
    </div>
  </section>
</template>

<style>
.Hero {
  position: relative;
  isolation: isolate;
  margin-top: -64px;
  padding-top: 64px;
}

.HeroGradient {
  background-repeat: no-repeat;
  background-image: radial-gradient(circle 680px at 78% 18%, var(--blue-3), transparent), radial-gradient(circle 620px at 24% 10%, var(--purple-2), transparent), radial-gradient(circle 700px at 74% 100%, var(--sky-2), transparent);
}
</style>
