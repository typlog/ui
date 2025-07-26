<script setup lang="ts">
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  } from '#components'
</script>

<template>
  <div class="flex items-center gap-4">
    <SelectRoot size="1">
      <SelectTrigger placeholder="Select..." />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="grape" disabled>Grape</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>

    <SelectRoot size="2">
      <SelectTrigger placeholder="Select..." />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="grape" disabled>Grape</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>

    <SelectRoot size="3">
      <SelectTrigger placeholder="Select..." />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="orange">Orange</SelectItem>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="grape" disabled>Grape</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  </div>
</template>
