---
title: Callout
description: Highlight persistent information, status, warnings, and errors within a page.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/callout
radix: https://www.radix-ui.com/themes/docs/components/callout
---

<Example name="callout/Overview.vue" />

`Callout` provides visual presentation without assigning a live-region role.
Use `role="status"` for a message that should be announced politely and
`role="alert"` only when an urgent update requires immediate attention. The
`icon` prop accepts an Iconify name and is decorative; include the complete
message in the default slot. Use the `icon` and `title` slots when their props
are not flexible enough. Following Radix Themes, the supported visual variants
are `soft`, `surface`, and `outline`; `solid` is intentionally not available.

## API Reference

### Callout

<PropsTable name="Callout" />

## Examples

### Variants

<Example name="callout/Variants.vue" />
