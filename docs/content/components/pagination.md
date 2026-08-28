---
title: Pagination
status: beta
description: Paginated view with page navigation controls.
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/pagination
reka: https://reka-ui.com/docs/components/pagination
---

<Example name="pagination/Overview.vue" />

## API Reference

### Pagination

Use the `ui` prop to add classes to the pagination root, list, page items,
ellipsis, and each navigation control (`first`, `previous`, `next`, and `last`).
Classes are additive to the component's default classes.

<PropsTable name="Pagination" />

## Examples

### Size

<Example name="pagination/Size.vue" />

### Variant

<Example name="pagination/Variant.vue" />

### Color

<Example name="pagination/Color.vue" />

### Navigation

Controls for showing “Previous”, “Next”, “First”, and “Last” page buttons.

<Example name="pagination/Navigation.vue" />

### Without Edges

Without `show-edges` attribute, there will be no pagination ellipsis.

<Example name="pagination/WithoutEdges.vue" />
