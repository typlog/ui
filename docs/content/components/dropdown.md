---
title: Dropdown Menu
description: A button-triggered menu that presents a list of actions or functions to the user.
status: alpha
source: https://github.com/typlog/ui/tree/main/src/components/dropdown
reka: https://reka-ui.com/docs/components/dropdown-menu
radix: https://www.radix-ui.com/themes/docs/components/dropdown-menu
---

<Example name="dropdown/Overview.vue" variant="hide" />

## API Reference

### DropdownMenuRoot

Contains all the parts of a dropdown menu.

<PropsTable name="DropdownMenuRoot" />

### DropdownMenuTrigger

Wraps the control that will open the dropdown menu. Usually used with `Button`:

```vue
<template>
<DropdownMenuRoot>
  <DropdownMenuTrigger as-child>
    <Button>Show dropdown menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>...</DropdownMenuContent>
</DropdownMenuRoot>
</template>
```

<PropsTable name="DropdownMenuTrigger" />

### DropdownMenuContent

The component that pops out when the dropdown menu is open.

<PropsTable name="DropdownMenuContent" />

### DropdownMenuItem

The component that contains the dropdown menu items.

<PropsTable name="DropdownMenuItem" />

## Examples

### Variant

<Example name="dropdown/Variant.vue" />
