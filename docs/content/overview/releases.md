---
title: Releases
description: Typlog UI releases and their changelogs.
---

## 0.16.1

Released on September 6, 2026.

- Fixes z-index for Drawer and Sidebar.

## 0.16.0

Released on August 29, 2026.

- Added accessible Form and Field composition components with native validation, controlled server errors, synchronous or asynchronous field validation, reset behavior, and integration examples for existing controls and Zod.
- Added swipeable Drawer components with four directions, snap points, accessible title and description parts, a drag handle, and a styled close button.
- Added responsive Toast layouts with configurable mobile breakpoints, directional swipe behavior, and improved stacking measurements.
- Enhanced Checkbox Group with select-all and indeterminate states, shared-model value scoping, configurable outer and content elements, and styled Table composition.
- Updated Sidebar to use Drawer on mobile and improved its breakpoint handling, controlled state, focus behavior, sizing, and responsive examples.
- Refined Drawer, Dialog, and Popover animations, including edge-bleed handling and directional motion.
- Improved Tree attribute forwarding, Checkbox and Switch sizing, Toast stack height handling, and theme/root stacking boundaries.
- Promoted documented component maturity statuses and added explicit `alpha`, `beta`, and `stable` criteria to the contribution guide.

### Breaking changes

- Consolidated the package around the main `@typlog/ui` entry. The previous `@typlog/ui/components`, `@typlog/ui/base.css`, `@typlog/ui/components.css`, and `@typlog/ui/tailwind.css` subpaths are no longer published; import components and the complete stylesheet from `@typlog/ui`, with addons and charts continuing to use their dedicated entries.
- The main stylesheet now includes Tailwind CSS-compatible theme values by default, and component rules participate in the `components` cascade layer. Review application layer ordering and custom overrides when upgrading.

## 0.15.0

Released on August 28, 2026.

- Added chart components and a dedicated `@typlog/ui/charts` entry point for building area, bar, donut, line, and pie charts with legends, tooltips, crosshairs, and gradients.
- Added accessible Tree components with single and multiple selection, disabled items, keyboard navigation, and virtualized rendering support.
- Added Empty, Skeleton, and Spinner components for empty, loading, and progress states.
- Redesigned the Iconify addon around composable collection and grid components, including collection browsing and global search examples.
- Added a typed `ui` customization prop to Combobox Input, Dialog Popup, and Pagination.
- Improved chart tooltip behavior and chart color handling.

## 0.14.0

Released on August 27, 2026.

- Added Pin Input components for accessible OTP and verification-code entry.
- Added a responsive Sidebar component family with flexible layouts, collapse modes, mobile slideovers, and structured navigation menus.
- Refreshed the documentation experience with a new landing page, navigation, search, live examples, and API references.
- Improved component composition and contributor tooling.
