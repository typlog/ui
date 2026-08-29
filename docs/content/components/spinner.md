---
title: Spinner
description: Compact progress indicator for asynchronous work.
status: beta
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/spinner
---

<Example name="spinner/Overview.vue" />

## API Reference

<PropsTable name="Spinner" />

By default, `Spinner` is decorative and hidden from assistive technology. Passing `aria-label` or `aria-labelledby` gives it a `status` role automatically; pass an explicit `role` to override that default. When a spinner appears inside a Button that already has an accessible name, use `aria-hidden="true"` on the spinner.

## Examples

### Size

<Example name="spinner/Size.vue" />

### Color

<Example name="spinner/Color.vue" />
