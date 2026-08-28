---
title: Releases
description: Typlog UI releases and their changelogs.
---

## 0.15.0

Released on August 28, 2026.

### Added

- Added chart components and a dedicated `@typlog/ui/charts` entry point for building area, bar, donut, line, and pie charts with legends, tooltips, crosshairs, and gradients.
- Added accessible Tree components with single and multiple selection, disabled items, keyboard navigation, and virtualized rendering support.
- Added Empty, Skeleton, and Spinner components for empty, loading, and progress states.

### Improved

- Redesigned the Iconify addon around composable collection and grid components, including collection browsing and global search examples.
- Added a typed `ui` customization prop to Combobox Input, Dialog Popup, and Pagination.
- Improved chart tooltip behavior and chart color handling.

### Tooling

- Reorganized the repository as a pnpm workspace and separated the UI package, documentation, and site build boundaries.
- Updated dependency, TypeScript, metadata-generation, CI, and release configuration.

## 0.14.0

Released on August 27, 2026.

### Added

- Added Pin Input components for accessible OTP and verification-code entry.
- Added a responsive Sidebar component family with flexible layouts, collapse modes, mobile slideovers, and structured navigation menus.

### Improved

- Refreshed the documentation experience with a new landing page, navigation, search, live examples, and API references.
- Improved component composition and contributor tooling.

### Tooling

- Upgraded the build, lint, icon, Markdown, and type declaration toolchain, including Vite 8 and ESLint 10.
