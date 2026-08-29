<script setup lang="ts">
import { ref } from 'vue'
import {
  Checkbox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  FieldControl,
  FieldLabel,
  FieldRoot,
  FormRoot,
  PinInputInput,
  PinInputRoot,
  RadioGroupItem,
  RadioGroupRoot,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
  TextArea,
  TextField,
} from '@typlog/ui'

const checkbox = ref(false)
const radio = ref('one')
const select = ref('one')
const combo = ref('one')
const toggle = ref(false)
const pin = ref<string[]>([])
</script>

<template>
  <FormRoot class="grid max-w-xl gap-4 sm:grid-cols-2">
    <FieldRoot name="text">
      <FieldLabel>TextField</FieldLabel>
      <FieldControl as-child><TextField /></FieldControl>
    </FieldRoot>
    <FieldRoot name="notes">
      <FieldLabel>TextArea</FieldLabel>
      <FieldControl as-child><TextArea /></FieldControl>
    </FieldRoot>
    <FieldRoot name="select">
      <FieldLabel>Select</FieldLabel>
      <SelectRoot v-model="select" name="select">
        <FieldControl as-child><SelectTrigger placeholder="Choose" /></FieldControl>
        <SelectContent><SelectItem value="one">One</SelectItem><SelectItem value="two">Two</SelectItem></SelectContent>
      </SelectRoot>
    </FieldRoot>
    <FieldRoot name="combo">
      <FieldLabel>Combobox</FieldLabel>
      <ComboboxRoot v-model="combo" name="combo">
        <FieldControl as-child><ComboboxInput placeholder="Choose" /></FieldControl>
        <ComboboxContent><ComboboxItem value="one">One</ComboboxItem><ComboboxItem value="two">Two</ComboboxItem></ComboboxContent>
      </ComboboxRoot>
    </FieldRoot>
    <FieldRoot name="checkbox">
      <FieldLabel>Checkbox</FieldLabel>
      <FieldControl as-child><Checkbox v-model="checkbox" name="checkbox" /></FieldControl>
    </FieldRoot>
    <FieldRoot name="radio">
      <FieldLabel>Radio Group</FieldLabel>
      <FieldControl as-child>
        <RadioGroupRoot v-model="radio" name="radio" class="flex flex-col gap-2">
          <RadioGroupItem value="one">One</RadioGroupItem>
          <RadioGroupItem value="two">Two</RadioGroupItem>
        </RadioGroupRoot>
      </FieldControl>
    </FieldRoot>
    <FieldRoot name="switch">
      <FieldLabel>Switch</FieldLabel>
      <FieldControl as-child><Switch v-model="toggle" name="switch" /></FieldControl>
    </FieldRoot>
    <FieldRoot name="pin">
      <FieldLabel>Pin Input</FieldLabel>
      <FieldControl as-child>
        <PinInputRoot v-model="pin" name="pin"><PinInputInput v-for="index in 4" :key="index" :index="index - 1" /></PinInputRoot>
      </FieldControl>
    </FieldRoot>
  </FormRoot>
</template>
