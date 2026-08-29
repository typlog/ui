---
title: Sidebar
description: A responsive, collapsible navigation panel composed from flexible layout parts.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/sidebar
---

<Example name="sidebar/Overview.vue" variant="full" />

`SidebarProvider` arranges an optional left `Sidebar`, central inset, and optional right `Sidebar`. It owns the responsive breakpoint and lets triggers target either edge. Each `Sidebar` keeps its own mobile `open` and desktop `collapsed` states, rendering inline at 1024px and above and as an accessible modal slideover on narrower viewports.

Use at most one `Sidebar` per `side` in a provider. Left and right state is independent on desktop. On mobile, opening one panel requests that the other close so modal sidebars do not stack.

`SidebarGroup` and the `SidebarMenu*` components are navigation structure inside a sidebar; they do not manage layout, routing, active state, or expansion. `SidebarMenu` is the configuration boundary for a menu tree: its `size` and `color` are inherited by menu and submenu buttons. For other content, compose ordinary semantic elements directly inside `SidebarBody`.

## API Reference

### SidebarProvider

<PropsTable name="SidebarProvider" />

### Sidebar

<PropsTable name="Sidebar" />

### SidebarTrigger

<PropsTable name="SidebarTrigger" />

### SidebarRail

<PropsTable name="SidebarRail" />

### Layout parts

<PropsTable name="SidebarHeader" />

<PropsTable name="SidebarBody" />

<PropsTable name="SidebarFooter" />

`SidebarHeader` and `SidebarFooter` provide layout and spacing only. Add a border utility or `Separator` when a visual divider is needed.

The default `Sidebar` slot exposes `collapsed` as the current visual state. It follows desktop icon-collapse state and remains `false` in the complete mobile panel, so arbitrary header or body content can use `v-if="!collapsed"` without application-level breakpoint checks.

<PropsTable name="SidebarInset" />

`SidebarInset` scrolls vertically when `SidebarProvider` has a constrained height, while each sidebar keeps its header and footer fixed and scrolls only `SidebarBody`. Set the provider height at the layout boundary—for example, `h-dvh overflow-hidden` for a full-height application shell.

### Menu structure

<PropsTable name="SidebarGroup" />

<PropsTable name="SidebarGroupLabel" />

<PropsTable name="SidebarMenu" />

<PropsTable name="SidebarMenuItem" />

<PropsTable name="SidebarMenuButton" />

<PropsTable name="SidebarMenuSub" />

<PropsTable name="SidebarMenuSubItem" />

<PropsTable name="SidebarMenuSubButton" />

## Examples

### Menu size

Set `size` once on `SidebarMenu` to coordinate button height, spacing, typography, icons, and nested submenu dimensions. The default `2` uses a 2.25rem button baseline; `1` tightens the entire scale and `3` adds room across the same set of measurements.

<Example name="sidebar/MenuSize.vue" variant="full" />

### Menu color

Set `color` on a menu tree to override the provider accent for active, active-hover, and keyboard-focus states. Normal text and disabled states continue to use semantic gray tokens.

<Example name="sidebar/MenuColor.vue" variant="full" />

### Collapse modes

`offcanvas` collapses the default sidebar layout width. Floating and inset sidebars keep `--sidebar-width`, translate the layout wrapper beyond its edge, and release its layout space with an offset. `icon` reduces the panel to `collapsedWidth`; the default wrapper matches that width, while floating and inset wrappers retain their padding around it. `none` keeps the sidebar expanded.

<Example name="sidebar/Collapsible.vue" variant="full" />

### Right side

<Example name="sidebar/Side.vue" variant="full" />

### Two sides

Place `SidebarInset` between two sidebars inside `SidebarProvider` and set each trigger's `target` to the edge it controls. Source order is normalized to left, inset, right.

<Example name="sidebar/TwoSides.vue" variant="full" />

### Controlled state

Use `v-model:open` for a sidebar's mobile slideover and `v-model:collapsed` for its desktop panel. The two state dimensions remain independent when the viewport changes.

<Example name="sidebar/Controlled.vue" variant="full" />

### Mobile slideover

Resize the browser below 1024px to exercise focus trapping, outside-click dismissal, and Escape-key dismissal. `mobileTitle` and `mobileDescription` provide the accessible dialog name and description.

<Example name="sidebar/Mobile.vue" variant="full" />

### Inset layout

<Example name="sidebar/Inset.vue" />

### Floating layout

<Example name="sidebar/Floating.vue" />

### Rail

The rail is a keyboard-accessible desktop control placed on the panel edge. An external `SidebarTrigger` is still needed to restore an offcanvas sidebar after it is fully hidden.

<Example name="sidebar/Rail.vue" variant="full" />

### Navigation composition

Sidebar intentionally does not accept navigation item data or depend on Vue Router. Compose links and buttons with `SidebarGroup`, `SidebarMenu`, and their item components. Set `active` explicitly and configure size or accent color at the `SidebarMenu` boundary rather than on individual buttons.

Use `icon`, `text`, and `trailingIcon` for common Iconify content, or replace those parts with the `icon`, `text`, and `trailing` slots. The default slot is shorthand for `text`. Use `as="a"` or `:as="RouterLink"` for structured links. `asChild` remains available as a raw single-child escape hatch and does not add the structured content wrappers.

A `SidebarMenuButton` tooltip is enabled only on desktop when its sidebar uses icon collapse and is currently collapsed; the tooltip opens toward the content area. When `tooltip` is omitted, a `text` prop also supplies the tooltip label. Set `:tooltip="false"` to opt out. In the collapsed state, structured text is visually clipped rather than removed from the DOM, so the button keeps its accessible name; trailing content is hidden and only the leading icon remains visible.

<Example name="sidebar/Navigation.vue" variant="full" />

### Submenu composition

`SidebarMenuSub` provides only nested list semantics and indentation. Its button supports the same `icon`, `text`, `trailingIcon`, and named content slots as `SidebarMenuButton`. Compose `CollapsibleRoot`, an as-child `CollapsibleTrigger`, and `CollapsibleContent` when a submenu needs expandable state; place the structured `SidebarMenuButton` directly inside the trigger and put `CollapsibleIndicator` in its `trailing` slot. A general `trailingIcon` remains static, while the explicit indicator follows the collapsible state. The entire submenu is hidden visually in desktop icon-collapsed mode.

<Example name="sidebar/Submenu.vue" variant="full" />
