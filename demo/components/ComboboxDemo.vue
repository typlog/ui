<script setup lang="ts">
import { ref, nextTick } from 'vue'
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
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

const languages: Record<string, string> = {
  en: 'English',
  fr: 'French',
  ja: 'Japanese',
  zh: 'Chinese',
}

const query = ref('')
const selected = ref<string[]>(['en'])

const onKeydown = async () => {
  await nextTick()
  console.log('****', query.value)
}
</script>

<template>
  <section class="my-6">
    <h1 class="text-lg font-semibold">Combobox</h1>
    <div class="mt-2 flex gap-4">
      <ComboboxRoot>
        <ComboboxInput placeholder="Placeholder..." />
        <ComboboxContent :side-offset="5">
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
            <span>Nothing</span>
          </ComboboxEmpty>
        </ComboboxContent>
      </ComboboxRoot>

      <ComboboxRoot class="w-[400px]" multiple v-model="selected">
        <ComboboxInput placeholder="Placeholder..." v-model="query" @keydown.enter="onKeydown">
          <template #item="{ value }">
            <span>{{ languages[value as string] }}</span>
          </template>
        </ComboboxInput>
        <ComboboxContent :side-offset="5">
          <ComboboxItem
            v-for="(value, key) in languages"
            :key="key"
            :value="key"
          >
            {{ value }}
          </ComboboxItem>
          <ComboboxEmpty>
            <span>Not found: {{ query }}</span>
          </ComboboxEmpty>
        </ComboboxContent>
      </ComboboxRoot>
    </div>
  </section>
</template>
