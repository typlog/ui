<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
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
