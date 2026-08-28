# AGENTS.md

This file is the operating guide for AI coding agents working in this repository. It applies to the whole repository unless a deeper `AGENTS.md` overrides it.

## Project at a glance

`@typlog/ui` is a Vue 3 component library built on [Reka UI](https://reka-ui.com/) primitives and Radix color tokens. The library adds Typlog's theme, sizing, variants, and higher-level compositions while preserving Reka UI's accessibility and interaction behavior.

- Package manager: pnpm (the repository commits `pnpm-lock.yaml`).
- CI runtime: Node.js 22.
- Source language: Vue SFCs and strict TypeScript.
- Documentation: VitePress, with live examples under `docs/examples`.
- Styling: plain CSS, semantic custom properties, Radix colors, and stable class/data-attribute contracts.
- Tests: there is currently no automated test suite. Use the validation commands below and manually exercise interactive behavior in the docs site.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before changing public APIs. For component-specific architecture and a worked skeleton, read [.agents/docs/COMPONENTS.md](./.agents/docs/COMPONENTS.md).

## Repository map

| Path | Purpose |
| --- | --- |
| `packages/ui/src/components/` | Core components published from `@typlog/ui`. |
| `packages/ui/src/components/index.ts` | Main public component/type export surface. |
| `packages/ui/src/components/types.ts` | Shared public types such as `ColorType` and `RadiusType`. |
| `packages/ui/src/components/util.ts` | Prop forwarding and variant-class helpers. |
| `packages/ui/src/addons/` | Optional or integration-specific components published from `@typlog/ui/addons`. |
| `packages/ui/src/styles/` | Base tokens, theme variables, color mappings, and shared component CSS. |
| `packages/ui/tailwind/` | Tailwind-compatible token exports. |
| `docs/examples/` | Runnable examples used by component documentation. |
| `docs/content/` | VitePress Markdown content. |
| `.vitepress/config.ts` | Documentation navigation and Vite config. |
| `.vitepress/meta/` | Generated component API metadata; do not edit it manually. |
| `scripts/generate-component-meta.ts` | Generates API metadata from exported component types and JSDoc. |
| `packages/ui/post-build.mjs` | Finalizes the package manifest and CSS entry in `dist/`. |
| `packages/ui/package.json` | Manifest template for the published package and its runtime dependencies. |
| `package.json` | Workspace, development dependencies, scripts, and release version. |

## Commands

Run commands from the repository root.

```sh
pnpm install --frozen-lockfile                 # reproducible install
pnpm start          # VitePress development server
pnpm lint           # ESLint for source, docs, and VitePress code
pnpm typecheck      # vue-tsc without emitting files
pnpm build:meta     # regenerate .vitepress/meta from public exports
pnpm build          # build the publishable library into packages/ui/dist/
pnpm build:docs     # build the documentation into site/public/
```

Use `pnpm add` rather than another package manager. Add package runtime dependencies to the `packages/ui` workspace (for example, `pnpm add <package> --filter @typlog/ui`) and tooling dependencies to the root as dev dependencies. Do not rely on a transitive dependency.

## Component contract

When creating or changing a component, preserve these repository conventions:

1. Put core UI in `packages/ui/src/components/<family>/` and optional/vendor integrations in `packages/ui/src/addons/<family>/`.
2. Use PascalCase Vue filenames and public component names. Use kebab-case directory and documentation names.
3. Declare exported prop interfaces/types in a normal `<script lang="ts">` block. `vue-component-meta` reads these declarations and their JSDoc.
4. Prefer a Reka UI primitive for semantics, keyboard interaction, focus management, and ARIA. Extend its prop type and forward its emits instead of recreating behavior.
5. Strip Typlog-only visual props before forwarding to Reka. Reuse `useForwardPropsWithout`, `useForwardPropsEmitsWithout`, `useForwardProps`, and `useForwardExpose` as appropriate.
6. Prefix component classes with `ui-`. Visual prop classes use `r-<prop>-<value>` (for example `r-size-2`) and booleans use `r-<prop>` (for example `r-high-contrast`). `buildPropsClass` creates these classes.
7. Use `data-accent-color` and `data-radius` for local theme overrides. Consume existing CSS variables instead of introducing literal theme colors, spacing, radii, or shadows.
8. Style Reka state through its data attributes, such as `data-state`, `data-disabled`, `data-highlighted`, and `data-orientation`. Keep focus-visible and disabled behavior explicit.
9. Content rendered through a Portal leaves the provider DOM tree. Wrap portal content in `ThemeWrapper` so `.ui-root` and theme data attributes are restored.
10. Export the component and its public types from the family `index.ts`, then export that family from `packages/ui/src/components/index.ts` or `packages/ui/src/addons/index.ts`.
11. Add a live example, a component page, generated API metadata, and a sidebar entry for a new public component.

Do not casually rename or remove exported symbols, props, emitted events, CSS classes, or documented behavior. They are part of the consumer-facing contract even when TypeScript cannot enforce them.

## Recommended workflow for a new component

1. Find the closest existing component by behavior and composition, not just appearance.
2. Check the current Reka UI primitive and its prop/emit types in the installed dependency before designing the wrapper API.
3. Define the public API and defaults. Reuse `ColorType`, `RadiusType`, existing size scales, and established variant names where they fit.
4. Implement semantic behavior first, then styling and theme overrides.
5. Add barrel exports and confirm the component is reachable from the intended package entry.
6. Add `docs/examples/<component>/Overview.vue` and focused examples for meaningful variants or states.
7. Add `docs/content/components/<component>.md`, use `<PropsTable name="ComponentName" />`, and register the page in `.vitepress/config.ts`.
8. Run `pnpm build:meta` and commit the generated metadata for the public component.
9. Run the validation matrix below and inspect the live docs in light and dark themes, with keyboard navigation.

## Validation matrix

| Change | Minimum validation |
| --- | --- |
| Documentation only | `pnpm lint`, `pnpm build:docs` |
| Component implementation or types | `pnpm lint`, `pnpm typecheck`, `pnpm build` |
| Public props/exports or new component | Above, plus `pnpm build:meta` and `pnpm build:docs` |
| Theme/token/CSS change | Above, plus visual checks in light/dark themes and at affected sizes/variants |
| Overlay or interactive behavior | Above, plus keyboard, focus, disabled, controlled/uncontrolled, and portal checks |

Generated outputs `packages/ui/dist/` and `site/public/` are ignored and should not be committed. Generated `.vitepress/meta/*.json` files are tracked and should be committed when their source API changes.

## Agent guardrails

- Inspect `git status` before editing and preserve unrelated user changes.
- Keep changes scoped. Do not reformat or refactor unrelated components while adding one.
- Treat source exports, runtime dependencies, docs, and generated metadata as one atomic public change.
- Do not hand-edit lockfiles, generated metadata, `packages/ui/dist/`, or `site/public/`.
- Do not invent a test command or claim tests passed; no test runner is configured today.
- If implementation and current documentation disagree, verify behavior in source and call out the discrepancy rather than silently codifying it.
- Prefer established local patterns over introducing a new abstraction for a single component.
