<script setup lang="ts">
import {
  Icon,
  Button,
  Checkbox,
  Switch,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroupRoot,
  RadioGroupItem,
  Toggle,
  ToggleGroupRoot,
  ToggleGroupItem,
} from '../src'
</script>

<template>
  <div class="py-4">
    <Toggle variant="solid" disabled>
      <Icon icon="radix-icons:font-italic" />
    </Toggle>
  </div>
  <div class="py-4">
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
  </div>
  <section>
    <h1>Buttons</h1>
    <Button>Button</Button>
  </section>
  <section>
    <h1>Checkbox</h1>
    <Checkbox />
  </section>
  <section>
    <h1>Switch</h1>
    <Switch />
  </section>
  <section>
    <h1>Select</h1>
    <SelectRoot>
      <SelectTrigger placeholder="Select ..." />
      <SelectContent>
        <SelectItem value="a">America</SelectItem>
        <SelectItem value="b">Banana</SelectItem>
        <SelectItem value="c">China</SelectItem>
        <SelectItem value="d">Deno</SelectItem>
      </SelectContent>
    </SelectRoot>
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
