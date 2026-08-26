# Component development guide

This guide explains how a Typlog UI component moves from a Vue file to the published package and documentation site. Use it together with the repository-level [AGENTS.md](../../AGENTS.md) and [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Architecture

The component library has four layers:

1. **Behavior and accessibility:** Reka UI primitives provide semantic structure, ARIA, focus management, keyboard handling, controlled/uncontrolled state, and state data attributes.
2. **Typlog component API:** Vue wrappers add consistent props, composition, defaults, slots, and exports.
3. **Theme and visual system:** `.ui-root`, CSS variables, Radix colors, `data-*` overrides, and `r-*` modifier classes define appearance.
4. **Documentation and metadata:** Vue examples exercise source directly; VitePress pages display examples and generated prop tables.

The build starts at `src/components/index.ts` and `src/addons/index.ts`. Vite produces ESM, declarations, and CSS in `dist/`; `scripts/post-build.mjs` copies the publish manifest from `src/package.json`, applies the root version, creates `index.css`, and rewrites the addon's internal `#components` alias.

## Choose the right component shape

### Styled primitive

Use this for a single semantic element such as a button, badge, or separator. Render a Reka `Primitive` or a single Reka component, add Typlog props and classes, and keep the wrapper thin.

Good references: `src/components/button/Button.vue`, `src/components/badge/Badge.vue`, and `src/components/switch/Switch.vue`.

### Compound component

Use multiple exported parts when consumers need to control layout or composition. Put shared visual configuration on the root and provide it to children with a typed Reka `createContext` context.

Good references: `src/components/select/`, `src/components/combobox/`, `src/components/accordion/`, and `src/components/collapsible/`.

Do not hide essential Reka parts if consumers need them for accessible composition. Re-export unchanged primitives from the family barrel when a Typlog wrapper adds no value.

### Portalled overlay

Dialogs, popovers, dropdowns, select content, tooltips, and similar overlays render outside the provider DOM subtree. Place `ThemeWrapper` inside the Portal around the content so theme data and `.ui-root` variables are present.

Good references: `src/components/dialog/DialogPopup.vue`, `src/components/popover/PopoverPopup.vue`, and `src/components/select/SelectContent.vue`.

### Addon

Use `src/addons` for integrations or opinionated components that are not part of the core design-system contract. Addons publish from `@typlog/ui/addons` and may import core APIs through `#components`.

## Public API pattern

The normal `<script>` block owns exportable types; `<script setup>` owns runtime implementation. This separation is important because the metadata generator reads component types and JSDoc.

```vue
<script lang="ts">
import type { ToggleRootEmits, ToggleRootProps } from 'reka-ui'
import type { ColorType, RadiusType } from '../types'

export interface ExampleProps extends ToggleRootProps {
  /** Overrides the accent color inherited from ThemeProvider. */
  color?: ColorType
  /**
   * Controls the visual treatment.
   * @default "soft"
   */
  variant?: 'soft' | 'surface'
  /**
   * Controls the component size.
   * @default "2"
   */
  size?: '1' | '2' | '3'
  radius?: RadiusType
  highContrast?: boolean
}
</script>

<script setup lang="ts">
import { ToggleRoot } from 'reka-ui'
import { buildPropsClass, useForwardPropsEmitsWithout } from '../util'

const props = withDefaults(defineProps<ExampleProps>(), {
  variant: 'soft',
  size: '2',
  highContrast: false,
})
const emits = defineEmits<ToggleRootEmits>()

const forwarded = useForwardPropsEmitsWithout(
  props,
  emits,
  ['color', 'variant', 'size', 'radius', 'highContrast'],
)
const resetClass = buildPropsClass(props, ['variant', 'size', 'highContrast'])
</script>

<template>
  <ToggleRoot
    v-bind="forwarded"
    class="ui-Example"
    :class="resetClass"
    :data-accent-color="props.color"
    :data-radius="props.radius"
  >
    <slot></slot>
  </ToggleRoot>
</template>

<style>
@layer components {
  .ui-Example {
    /* structural styles and token-driven defaults */
  }
}

.ui-Example:where(.r-size-2) {
  /* size tokens */
}

.ui-Example:where([data-state='on']) {
  /* Reka state */
}

.ui-Example:where(:focus-visible) {
  outline: 2px solid var(--focus-8);
  outline-offset: 2px;
}
</style>
```

Adapt the Reka types and primitive to the component. If there are no emits, use `useForwardProps`; if the consumer needs a forwarded element/ref API, use `useForwardExpose`. If attributes must be bound to an inner element, set `inheritAttrs: false` and bind `$attrs` deliberately.

## Prop and state forwarding

Typlog visual props must not leak onto DOM elements or Reka primitives as unknown attributes. Use:

- `useForwardPropsWithout(props, excluded)` for props only;
- `useForwardPropsEmitsWithout(props, emits, excluded)` for props and emits;
- Reka's `useForwardProps` when every prop belongs to the primitive;
- Reka's `useForwardExpose` when the wrapper should expose the primitive element/API.

Forward supported slots rather than converting them to string props. Preserve the underlying component's `v-model` and `update:*` event names.

For a compound component, make context values refs so runtime prop updates flow to children. Give contexts a repository-scoped name such as `ui:SelectRoot`.

## Styling system

### Stable selectors

- Root and part classes: `ui-Component` and `ui-ComponentPart`.
- Enumerated modifiers: `r-size-2`, `r-variant-soft`.
- Boolean modifiers: `r-high-contrast`.
- Theme overrides: `data-accent-color` and `data-radius`.
- Behavior/state: Reka's `data-state`, `data-disabled`, `data-highlighted`, `data-orientation`, and related attributes.

Use `:where()` around state and modifier selectors when low specificity is useful for consumer overrides. Put structural component defaults in `@layer components` where appropriate, following nearby components.

### Tokens

Prefer the existing variables:

- color: `--gray-*`, `--accent-*`, `--focus-*`, and semantic `--color-*`;
- space and size: `--space-*` and `--scaling`;
- radius: `--radius-*` and `--radius-thumb`;
- type: `--font-size-*`, `--line-height-*`, `--letter-spacing-*`, and `--font-weight-*`;
- shadow and animation: variables/keyframes in `src/styles/shadow.css` and `src/styles/animation.css`.

If a new reusable token is necessary, define it at the narrowest shared theme layer and document why an existing token is insufficient. Check light/dark definitions and high-contrast behavior together.

### Accessibility states

At minimum, interactive components need intentional focus-visible and disabled behavior. Also verify any applicable checked, selected, highlighted, open, invalid, required, orientation, and reduced-motion behavior. Favor CSS driven by Reka's attributes so visuals cannot drift from semantic state.

## Exports and package boundaries

Create a family barrel:

```ts
export {
  default as Example,
  type ExampleProps,
} from './Example.vue'
```

Then add `export * from './example'` to `src/components/index.ts`. Addons instead flow through their family barrel and `src/addons/index.ts`.

Keep runtime imports aligned with package boundaries:

- inside core components, prefer relative imports for nearby component files and shared utilities;
- inside addons, use `#components` for core public APIs because the build rewrites that alias for the published addon bundle;
- in docs examples, use `#components` or `#addons` so examples run against source and display as package imports.

When adding a runtime package, update `src/package.json` through npm. Root-only build and documentation tools belong in the root `devDependencies`.

## Documentation pipeline

For `Example`, add:

```text
docs/examples/example/Overview.vue
docs/content/components/example.md
```

The Markdown `<Example name="example/Overview.vue" />` tag is expanded by `.vitepress/plugins/example.ts`: it imports the live Vue example and embeds its source, replacing `#components` and `#addons` with public package imports for readers.

`<PropsTable name="Example" />` reads `.vitepress/meta/Example.json`. Generate that file only after the component is exported:

```sh
npm run build:meta
```

Never hand-edit the JSON. If metadata is missing or wrong, fix the exported Vue type/JSDoc or barrel export and regenerate it.

Finally add the page to the appropriate group in `.vitepress/config.ts` and build the docs to catch missing examples, metadata, or imports.

## Definition of done

- [ ] The component uses the appropriate native/Reka semantics.
- [ ] Props, emits, slots, defaults, and forwarding behavior are typed.
- [ ] Visual-only props do not leak to the DOM.
- [ ] Public exports work from the intended package entry.
- [ ] Existing theme tokens and naming conventions are used.
- [ ] Light, dark, focus-visible, disabled, and relevant Reka states are covered.
- [ ] Portalled content retains theme context.
- [ ] Overview and focused examples demonstrate the public API.
- [ ] The VitePress page and sidebar entry are present.
- [ ] Component metadata is regenerated and committed.
- [ ] Lint, typecheck, package build, and docs build pass.
- [ ] Manual keyboard and interaction checks are recorded in the pull request.
