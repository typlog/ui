---
title: IconCollection and IconGrid
description: Browse Iconify collections and select icons from a virtualized grid.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/addons/iconset
---

Import the addon stylesheet when using addon components:

```css
@import "@typlog/ui/addons";
```

`IconCollection` is a complete icon picker. It starts with the Iconify collection catalog, then opens the selected collection in its built-in virtualized `IconGrid`. Use `v-model:collection` and `v-model:query` when the navigation state also needs to be controlled externally.

<Example name="iconify/Overview.vue" variant="full" />

## Examples

### Icon grid

Use `IconGrid` directly when the collection picker is not needed and the available collection is already known.

<Example name="iconify/Grid.vue" />

### Multiple collections

Pass multiple prefixes to let people switch between each collection or browse all of them together.

<Example name="iconify/Collections.vue" />

### Global search

Without `collections`, `IconGrid` searches the global Iconify index once a query is provided.

<Example name="iconify/GlobalSearch.vue" />

### Customizing parts

Use the `ui` prop to add classes to stable component parts. `IconCollection` accepts nested `ui.grid` classes for its built-in grid, while each root also accepts Vue's standard `class` attribute.

<Example name="iconify/CustomUI.vue" />

## API Reference

<PropsTable name="IconCollection" />

<PropsTable name="IconGrid" />
