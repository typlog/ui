<script setup lang="ts">
import {
  ComboboxRoot,
  ComboboxContent,
  ComboboxItem,
  ComboboxInput,
  ComboboxEmpty,
} from '#components'

const fruits = [
  { name: 'Apple' },
  { name: 'Banana' },
  { name: 'Orange' },
  { name: 'Honeydew' },
  { name: 'Grapes' },
  { name: 'Watermelon' },
  { name: 'Cantaloupe' },
  { name: 'Pear' },
]
</script>

<template>
  <div class="flex flex-items gap-4">
    <ComboboxRoot size="1">
      <ComboboxInput placeholder="Select fruit..." />
      <ComboboxContent>
        <ComboboxItem
          v-for="option in fruits"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </ComboboxItem>
        <ComboboxEmpty>
          <span>No fruit found</span>
        </ComboboxEmpty>
      </ComboboxContent>
    </ComboboxRoot>

    <ComboboxRoot size="2">
      <ComboboxInput placeholder="Select fruit..." />
      <ComboboxContent>
        <ComboboxItem
          v-for="option in fruits"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </ComboboxItem>
        <ComboboxEmpty>
          <span>No fruit found</span>
        </ComboboxEmpty>
      </ComboboxContent>
    </ComboboxRoot>

    <ComboboxRoot size="3">
      <ComboboxInput placeholder="Select fruit..." />
      <ComboboxContent>
        <ComboboxItem
          v-for="option in fruits"
          :key="option.name"
          :value="option.name"
        >
          {{ option.name }}
        </ComboboxItem>
        <ComboboxEmpty>
          <span>No fruit found</span>
        </ComboboxEmpty>
      </ComboboxContent>
    </ComboboxRoot>
  </div>
</template>
