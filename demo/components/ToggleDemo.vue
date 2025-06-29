<script setup lang="ts">
import {
  Icon,
  Toggle,
} from '#components'
</script>

<template>
  <section class="my-6">
    <h1 class="text-lg font-semibold">Toggle</h1>
    <div class="mt-2 flex gap-4">
      <Toggle variant="solid">
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle variant="soft">
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle variant="ghost">
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="solid"
        disabled
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="soft"
        disabled
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="ghost"
        disabled
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
    </div>
    <h2 class="font-medium mt-4">Colors</h2>
    <div class="mt-2 flex gap-4">
      <Toggle
        variant="solid"
        color="blue"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="solid"
        color="green"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="solid"
        color="yellow"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="solid"
        color="red"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="soft"
        color="blue"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="soft"
        color="green"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="soft"
        color="yellow"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="soft"
        color="red"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="ghost"
        color="blue"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="ghost"
        color="green"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="ghost"
        color="yellow"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
      <Toggle
        variant="ghost"
        color="red"
      >
        <Icon icon="radix-icons:font-italic" />
      </Toggle>
    </div>
  </section>
</template>
