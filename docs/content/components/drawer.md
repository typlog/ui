---
title: Drawer
description: A swipeable panel that appears from the edge of the page.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/drawer
reka: https://reka-ui.com/docs/components/drawer
---

<Example name="drawer/Overview.vue" variant="hide" />

## API Reference

### DrawerRoot

Contains the drawer parts and supports controlled state, swipe direction, and snap points.

<PropsTable name="DrawerRoot" expand />

### DrawerPopup

The styled, portalled drawer content. Use `:show-handle="false"` to hide the default drag handle.

<PropsTable name="DrawerPopup" />

### DrawerTrigger, DrawerClose & DrawerSwipeArea

These are unstyled Reka UI primitives re-exported for composing drawer interactions.
Their props are forwarded without modification; see the linked Reka UI reference.

### DrawerHandle

The styled drag affordance rendered by `DrawerPopup` when `showHandle` is enabled.

<PropsTable name="DrawerHandle" />

### DrawerTitle & DrawerDescription

Accessible labelling parts for the drawer.

<PropsTable name="DrawerTitle" />

<PropsTable name="DrawerDescription" />

### DrawerCloseButton

A styled close button with a tooltip.

<PropsTable name="DrawerCloseButton" />

## Examples

### Directions

Set `swipe-direction` to `up`, `down`, `left`, or `right`.

<Example name="drawer/Directions.vue" variant="hide" />

### Snap points

Use `snap-points` with `v-model:snap-point` to provide draggable intermediate positions.

<Example name="drawer/SnapPoints.vue" variant="hide" />
