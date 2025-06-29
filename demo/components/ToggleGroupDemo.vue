<script setup lang="ts">
import {
  Icon,
  ToggleGroupRoot,
  ToggleGroupItem,
} from '#components'
</script>

<template>
  <section class="my-6">
    <h1 class="text-lg font-semibold">Toggle Group</h1>
    <div class="mt-2 flex gap-4">
      <ToggleGroupRoot variant="solid">
        <ToggleGroupItem
          value="left"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-left" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-center" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-right" />
        </ToggleGroupItem>
      </ToggleGroupRoot>
      <ToggleGroupRoot variant="soft">
        <ToggleGroupItem
          value="left"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-left" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-center" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-right" />
        </ToggleGroupItem>
      </ToggleGroupRoot>
      <ToggleGroupRoot variant="ghost">
        <ToggleGroupItem
          value="left"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-left" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-center" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-right" />
        </ToggleGroupItem>
      </ToggleGroupRoot>
    </div>
    <div class="mt-2 flex gap-4">
      <ToggleGroupRoot size="1">
        <ToggleGroupItem
          value="left"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-left" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-center" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-right" />
        </ToggleGroupItem>
      </ToggleGroupRoot>
      <ToggleGroupRoot size="2">
        <ToggleGroupItem
          value="left"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-left" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-center" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-right" />
        </ToggleGroupItem>
      </ToggleGroupRoot>
      <ToggleGroupRoot size="3">
        <ToggleGroupItem
          value="left"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-left" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="center"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-center" />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="right"
          aria-label="Toggle italic"
        >
          <Icon icon="radix-icons:text-align-right" />
        </ToggleGroupItem>
      </ToggleGroupRoot>
    </div>
  </section>
</template>
