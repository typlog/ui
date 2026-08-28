# Contributing to Typlog UI

Thanks for helping improve `@typlog/ui`. This repository is a themed Vue 3 component library, so a contribution is complete only when implementation, public exports, styling, examples, and API documentation agree.

AI coding agents should also follow [AGENTS.md](./AGENTS.md), which contains the repository's component architecture and implementation rules.

## Development setup

Use Node.js 22 and pnpm. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm start
```

The docs development server uses source package exports, so edits to components and examples are visible without first publishing the package.

## Before implementing a component

Define the intended public API before writing CSS:

- Decide whether it belongs in core `packages/ui/src/components` or optional `packages/ui/src/addons`.
- Find the closest Reka UI primitive and the nearest Typlog UI component pattern.
- Reuse existing scales (`size`, `variant`, `color`, `radius`, and `highContrast`) when they match the design.
- List supported states: default, hover, active, focus-visible, disabled, invalid, open/closed, checked/unchecked, and loading as applicable.
- Decide whether state is controlled, uncontrolled, or both, following the underlying Reka primitive.
- Identify compound-component context and Portal/theme requirements before splitting files.

Prefer a small API that composes well. Avoid props that duplicate native or Reka UI behavior.

## Implementing a component

### Public types and behavior

- Put exported prop interfaces/types in a normal `<script lang="ts">` block so API metadata can discover them.
- Extend the relevant Reka UI prop type when wrapping a primitive.
- Forward props, emits, slots, and exposed element methods unless the wrapper intentionally changes them.
- Remove styling-only props before forwarding them to a DOM element or Reka primitive.
- Add short JSDoc descriptions and `@default` values to public props when the meaning or default is not obvious.
- Preserve semantic elements, ARIA, keyboard behavior, focus movement, and form behavior supplied by Reka UI.

### Styling and theming

- Use `ui-ComponentPart` class names for stable component selectors.
- Use `buildPropsClass` for standard `r-size-*`, `r-variant-*`, and boolean modifier classes.
- Use existing tokens in `packages/ui/src/styles` for color, spacing, typography, radius, shadow, scaling, and animation.
- Use `data-accent-color` and `data-radius` for per-component overrides.
- Support light and dark themes; never fix text or surface colors to a light-only value.
- Include visible keyboard focus and an intentional disabled cursor/appearance.
- Use Reka UI data attributes for interaction state instead of duplicating state in local CSS classes.
- Wrap portalled content with `ThemeWrapper`.

### Exports

Every public component needs both levels of export:

```ts
// packages/ui/src/components/example/index.ts
export {
  default as Example,
  type ExampleProps,
} from './Example.vue'
```

```ts
// packages/ui/src/components/index.ts
export * from './example'
```

Re-export unchanged Reka primitives and their types from the family barrel when they are required to compose the Typlog component, as existing compound components do.

## Documentation requirements

A new public component normally includes:

1. `docs/examples/<component>/Overview.vue` with the smallest realistic usage.
2. Additional focused examples for important sizes, variants, states, or composition.
3. `docs/content/components/<component>.md` with frontmatter, overview example, API tables, and examples.
4. A sidebar entry in `.vitepress/config.ts`.
5. Generated `.vitepress/meta/<ExportName>.json` from `pnpm build:meta`.

Examples import core components from `@typlog/ui` and addons from `@typlog/ui/addons`. Examples use the same imports at runtime and in displayed source.

Use this page shape:

```md
---
title: Example
description: A concise, user-facing description.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/example
reka: https://reka-ui.com/docs/components/example
---

<Example name="example/Overview.vue" variant="hide" />

## API Reference

<PropsTable name="Example" />

## Examples
```

Only add reference links that exist for the component. Use `alpha` for a new or still-evolving API and change status deliberately as the API matures.

## Validation

For a new component or public API change, run:

```sh
pnpm lint
pnpm typecheck
pnpm build:meta
pnpm build
pnpm build:docs
```

Also inspect the component in the docs server:

- light and dark themes;
- every documented size and variant;
- keyboard-only navigation and visible focus;
- disabled and interactive states;
- controlled and uncontrolled state where supported;
- portalled content and local color/radius overrides;
- narrow layouts and long or empty content where relevant.

There is no automated test runner in this repository yet. Do not substitute a successful build for interaction and accessibility checks.

## Commits and pull requests

Keep commits focused and use the repository's existing Conventional Commit-style prefixes, such as `feat(component):`, `fix(component):`, `docs:`, and `chore:`.

In a pull request, describe:

- the user-facing behavior and API;
- the Reka UI primitive or existing component pattern used;
- compatibility considerations;
- commands run and manual states checked;
- screenshots or a short recording for visual or interactive changes.

Do not include `packages/ui/dist/` or `site/public/`. Do include changed generated metadata when the public API changed.
