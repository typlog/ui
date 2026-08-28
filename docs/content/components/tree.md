---
title: Tree
description: Keyboard-friendly hierarchical navigation and selection.
status: alpha
source: https://github.com/typlog/ui/tree/main/src/components/tree
reka: https://reka-ui.com/docs/components/tree
---

<Example name="tree/Overview.vue" variant="hide" />

`TreeRoot` delegates hierarchy, selection, expansion, and keyboard navigation to Reka UI. It does not manage application routes or a filesystem; provide your own item data and render each flattened item with `TreeItem`. The default slot receives `{ item, virtualItem? }`; bind `item.bind` to preserve its generated `aria-setsize`, `aria-posinset`, `value`, and `level` metadata. `virtualItem` is available only when virtual rendering is enabled.

The default presentation is a compact, bordered file-tree panel: item names use a monospace face, nested levels receive subtle guide lines, and hover/selection backgrounds are limited to the inline target area. Use the `trailing` slot for muted, non-interactive context such as file comments. The indicator is purely visual; clicking anywhere in the target, including the chevron, follows Reka's native row selection and expansion behavior.

## API Reference

### TreeRoot

<PropsTable name="TreeRoot" />

### TreeItem

<PropsTable name="TreeItem" />

### TreeItemIndicator

<PropsTable name="TreeItemIndicator" />

## Examples

### File tree

`Tree` can present file-like data, but file and folder behavior remains the responsibility of the application.
The file-tree example keeps `children: []` for the empty `archive` folder, so it remains a disclosure branch; return `undefined` from `getChildren` when an item should be a leaf.

<Example name="tree/FileTree.vue" />

### Size

<Example name="tree/Size.vue" />

### Color

<Example name="tree/Color.vue" />

### Selection

The root supports controlled single selection with `v-model`.

<Example name="tree/Selection.vue" />

### Multiple selection

Set `multiple` to allow more than one selected item.

<Example name="tree/Multiple.vue" />

### Disabled items

Disable individual items or the complete tree with the `disabled` prop.

<Example name="tree/Disabled.vue" />

### Virtualized tree

Set `virtual` to `true` or pass virtualizer options to `TreeRoot` to render only visible flattened items. The root itself must be the scrolling container with an explicit height; an outer wrapper is not sufficient. `estimateSize` defaults to `28`, and `overscan` defaults to `12`.

<Example name="tree/Virtualized.vue" />
