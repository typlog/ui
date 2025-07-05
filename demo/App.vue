<script setup lang="ts">
import { ThemeProvider } from '#components'
import RadioDemo from './components/RadioDemo.vue'
import PaginationDemo from './components/PaginationDemo.vue'
import SpinnerDemo from './components/SpinnerDemo.vue'
import ToggleDemo from './components/ToggleDemo.vue'
import ToggleGroupDemo from './components/ToggleGroupDemo.vue'
import SelectDemo from './components/SelectDemo.vue'
import ComboboxDemo from './components/ComboboxDemo.vue'
import TabsDemo from './components/TabsDemo.vue'
import ColorFieldDemo from './components/ColorFieldDemo.vue'
import CollapsibleDemo from './components/CollapsibleDemo.vue'
import AccordionDemo from './components/AccordionDemo.vue'
</script>

<template>
  <ThemeProvider>
    <RadioDemo />
    <SpinnerDemo />
    <AccordionDemo />
    <CollapsibleDemo />
    <ToggleDemo />
    <ToggleGroupDemo />
    <SelectDemo />
    <ComboboxDemo />
    <TabsDemo />
    <ColorFieldDemo />
    <PaginationDemo />
  </ThemeProvider>
</template>
