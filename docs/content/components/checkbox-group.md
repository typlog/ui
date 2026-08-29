---
title: Checkbox Group
description: Groups multiple checkboxes and emits a list of selected values.
status: beta
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/checkbox
reka: https://reka-ui.com/docs/components/checkbox-group
radix: https://www.radix-ui.com/themes/docs/components/checkbox-group
---

<Example name="checkbox-group/Overview.vue" variant="hide" />

`CheckboxGroup` coordinates multiple [`Checkbox`](/components/checkbox) components
and exposes their selected `value` props as an array. Bind the array with
`v-model`, and wrap each checkbox in a `label` so its visible text is part of the
accessible control.

## API Reference

### CheckboxGroup

`CheckboxGroup` wraps the Reka UI `CheckboxGroupRoot`. Use `orientation` to
match the visual layout when enabling arrow-key navigation, and use `name` when
the group participates in a native form.

<PropsTable name="CheckboxGroup" />

Each child [`Checkbox`](/components/checkbox) must provide a unique `value`.
Visual props such as `size`, `variant`, `color`, and `highContrast` belong to the
child checkbox rather than the group.

`as` controls the outer component element. `contentAs` controls the element that
wraps the default slot and receives the group behavior.

## Examples

### Nested groups and select all

Keep each related set of values in its own `CheckboxGroup`. Pass the complete
set to `allValues`, then bind `checkboxProps` from the `select-all` slot to a
parent checkbox. The parent is checked when every value is selected and
indeterminate when only some values are selected.

Clearing the parent removes only values listed in `allValues`, so multiple
groups can safely share the same `v-model` array.

<Example name="checkbox-group/Nested.vue" />

### Table

Set the outer component to Typlog UI's `Table` and the default-slot container
to `tbody`. The `select-all` slot can then render a sibling `thead` without
placing its checkbox inside the selection context, while retaining the Table
component's scrolling and visual styles.

<Example name="checkbox-group/Table.vue" />
