<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '#components'
</script>

<template>
  <div class="Hero pt-32 lg:pt-16">
    <div class="absolute top-0 left-0 w-full h-full -z-1">
      <div class="HeroGradient absolute top-0 left-0 w-full h-full"></div>
    </div>
    <div class="max-w-content mx-auto py-16 px-4 lg:px-12 flex flex-col w-full gap-10 lg:gap-28 lg:flex-row lg:justify-between">
      <div class="home-intro lg:w-[600px]">
        <Badge variant="solid">WIP</Badge>
        <h1 class="text-4xl font-black leading-16">Typlog UI</h1>
        <h2 class="text-3xl font-bold text-gray-12 leading-12 mb-4">Your Accessible Design System</h2>
        <p class="text-lg leading-7">Typlog UI combines <strong>Reka UI</strong>’s accessibility with <strong>Radix Colors</strong>’
        theming power, so you can focus on building great features — not
        reinventing components.</p>
        <div class="flex items-center gap-4 mt-8">
          <Button size="3" as="a" href="/overview/getting-started" radius="full">Get started</Button>
          <Button size="3" as="a" href="https://github.com/typlog/ui" color="gray" high-contrast radius="full">
            <Icon icon="simple-icons:github" />
            GitHub
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.Hero {
  position: relative;
  top: -64px;
  border-bottom: var(--gray-3);
}
.HeroGradient {
  left: 50%;
  transform: translateX(-50%);
  background-repeat: no-repeat;
  background-image: radial-gradient(circle 800px at 700px 200px, var(--purple-2), transparent), radial-gradient(circle 600px at calc(100% - 300px) 300px, var(--blue-3), transparent), radial-gradient(circle 800px at right center, var(--sky-3), transparent), radial-gradient(circle 800px at right bottom, var(--sky-1), transparent), radial-gradient(circle 800px at calc(50% - 600px) calc(100% - 100px), var(--pink-3), var(--pink-1), transparent);
}
</style>
