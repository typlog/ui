<script setup lang="ts">
import {
  Button,
  Checkbox,
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroupRoot,
  RadioGroupItem,
} from '../src'
</script>

<template>
  <section>
    <h1>Buttons</h1>
    <Button>Button</Button>
  </section>
  <section>
    <h1>Checkbox</h1>
    <Checkbox />
  </section>
  <section>
    <PopoverRoot>
      <PopoverTrigger as-child>
        <Button>Show Popover</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <p>This is popover content</p>
      </PopoverContent>
    </PopoverRoot>
  </section>
  <section>
    <div>
      <Radio />
    </div>
    <RadioGroupRoot>
      <RadioGroupItem value="a">A</RadioGroupItem>
      <RadioGroupItem value="b">B</RadioGroupItem>
      <RadioGroupItem value="c">C</RadioGroupItem>
    </RadioGroupRoot>
  </section>
</template>
