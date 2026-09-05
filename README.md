# @typlog/ui

Accessible, themeable Vue 3 components built on [Reka UI](https://reka-ui.com/)
and [Radix Colors](https://www.radix-ui.com/colors).

## Installation

```sh
pnpm add @typlog/ui
```

Import the global stylesheet at the root of your application:

```css
@import "@typlog/ui";
```

Then wrap your application with `ThemeProvider`:

```vue
<script setup lang="ts">
import { ThemeProvider } from '@typlog/ui'
</script>

<template>
  <ThemeProvider>
    <!-- your application -->
  </ThemeProvider>
</template>
```

See the [getting started guide](./docs/content/overview/getting-started.md) and
[component documentation](./docs/content/components/) for usage and examples.

## Package entries

- `@typlog/ui` contains the core components and global styles.
- `@typlog/ui/addons` contains optional integrations. Import
  `@typlog/ui/addons` in CSS when using them.
- `@typlog/ui/charts` contains chart components. Import `@typlog/ui/charts` in
  CSS when using them.

All JavaScript examples use the public consumer entry points:

```ts
import { Button, ThemeProvider } from '@typlog/ui'
import { Turnstile } from '@typlog/ui/addons'
import { ChartRoot } from '@typlog/ui/charts'
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, component
conventions, validation, and release guidance.

## License

[MIT](./LICENSE)

## Credits

- [Radix UI](https://radix-ui.com/)
- [Reka UI](https://reka-ui.com/)
