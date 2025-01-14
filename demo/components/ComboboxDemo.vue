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
} from '../../src'

const options = [
  {
    name: 'Fruit', children: [
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
    name: 'Vegetable', children: [
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

const query = ref('')

const onKeydown = async () => {
  await nextTick()
  console.log('****', query.value)
}
</script>

<template>
  <section class="my-6">
    <h1 class="text-lg font-semibold">Toggle</h1>
    <div class="mt-2 flex gap-4">
      <ComboboxRoot>
        <ComboboxInput placeholder="Placeholder..." />
        <ComboboxContent :side-offset="5">
          <template
            v-for="group in options"
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

      <ComboboxRoot class="w-[400px]" multiple>
        <ComboboxInput placeholder="Placeholder..." v-model="query" @keydown.enter="onKeydown" />
        <ComboboxContent :side-offset="5">
          <template
            v-for="group in options"
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
            <span>Not found: {{ query }}</span>
          </ComboboxEmpty>
        </ComboboxContent>
      </ComboboxRoot>
    </div>
  </section>
</template>
