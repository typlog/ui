---
title: Breadcrumb
description: Show the current page's location within a navigational hierarchy.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/breadcrumb
---

<Example name="breadcrumb/Overview.vue" />

`Breadcrumb` renders a named navigation landmark and leaves routing to the
application. `BreadcrumbItem` renders a link when `href`, `as`, or `as-child`
is provided. Without one of those link targets, it renders the current page.
Use `as` or `as-child` to compose a router link.

## API Reference

### Breadcrumb

<PropsTable name="Breadcrumb" />

### BreadcrumbItem

<PropsTable name="BreadcrumbItem" />
