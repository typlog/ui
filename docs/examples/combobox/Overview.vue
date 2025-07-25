<script setup lang="ts">
import {
  ComboboxRoot,
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxInput,
  ComboboxLabel,
  ComboboxEmpty,
} from '#components'

const foodItems = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Banana' },
      { name: 'Orange' },
      { name: 'Honeydew' },
      { name: 'Grapes' },
      { name: 'Watermelon' },
      { name: 'Cantaloupe' },
      { name: 'Pear' },
    ],
  },
  {
    name: 'Vegetable',
    children: [
      { name: 'Cabbage' },
      { name: 'Broccoli' },
      { name: 'Carrots' },
      { name: 'Lettuce' },
      { name: 'Spinach' },
      { name: 'Bok Choy' },
      { name: 'Cauliflower' },
      { name: 'Potatoes' },
    ],
  },
]
</script>

<template>
  <ComboboxRoot>
    <ComboboxInput placeholder="Select food..." />
    <ComboboxContent>
      <template
        v-for="group in foodItems"
        :key="group.name"
      >
        <ComboboxGroup v-if="group.children.length">
          <ComboboxLabel>
            {{ group.name }}
          </ComboboxLabel>
          <ComboboxItem
            v-for="option in group.children"
            :key="option.name"
            :value="option.name"
          >
            {{ option.name }}
          </ComboboxItem>
        </ComboboxGroup>
      </template>
      <ComboboxEmpty>
        <span>No food found</span>
      </ComboboxEmpty>
    </ComboboxContent>
  </ComboboxRoot>
</template>
