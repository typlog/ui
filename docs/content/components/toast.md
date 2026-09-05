---
title: Toast
description: A brief notification that gives feedback about an action or event.
status: beta
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/toast
reka: https://reka-ui.com/docs/components/toast
---

<script setup>
  import { ref } from 'vue'
  import { ToastProvider, Button, toast } from '@typlog/ui'

  const size = ref('1')
  const position = ref('bottom-right')

  const changePosition = (value) => {
    position.value = value
    toast(`Position changed to: ${value}`)
  }

  const changeSize = (value) => {
    size.value = value
    toast(`Size changed to: ${value}`)
  }
</script>

<ToastProvider :size="size" :position="position" />

<Example name="toast/Overview.vue" variant="full" />

## Provider

To use the `toast` module, you need to set up the `ToastProvider` first. Simply
place it within the `ThemeProvider` – its position doesn't matter, and it will
function as expected.

```vue
<script setup>
  import { ThemeProvider, ToastProvider } from '@typlog/ui'
</script>
<template>
  <ThemeProvider>
    <ToastProvider />
  </ThemeProvider>
</template>
```

<PropsTable name="ToastProvider" />

### Isolated applications and SSR

The exported `toast` function and a provider without a `manager` prop use a
shared default queue. This preserves the convenient setup for a single
client-side application.

For server-side rendering or pages containing multiple Vue applications,
create one manager for each app or request. Pass it to the provider and use
the manager's `toast` function so messages cannot leak between queues:

```vue
<script setup>
  import { createToastManager, ToastProvider } from '@typlog/ui'

  const toastManager = createToastManager()
  const toast = toastManager.toast
</script>

<template>
  <ToastProvider :manager="toastManager" />
  <button @click="toast.success('Saved')">Save</button>
</template>
```

In an SSR application, create the manager inside the per-request app factory,
not at module scope.

### Responsive layout

Toast messages use a full-width layout with a `var(--space-4)` gutter on both
sides when the viewport is narrower than `640px` by default. The top or bottom
position is preserved, while the desktop left, center, or right alignment is
replaced by the shared mobile layout. When `swipeDirection` is omitted, top
toasts swipe up and bottom toasts swipe down on narrow viewports; an explicit
direction always takes precedence.

Set `breakpoint` to change the viewport width at which this behavior starts:

```vue
<ToastProvider :breakpoint="768" />
```

<Example name="toast/Responsive.vue" variant="full" />

### Position

You can customize the position of toast messages using the `position` prop on `ToastProvider`.
By default, toasts appear in the bottom-right corner.

<ExampleCode name="Position" variant="full">

<div class="flex flex-wrap items-center gap-4">
<Button @click="changePosition('top-left')" variant="surface">Top left</Button>
<Button @click="changePosition('top-center')" variant="surface">Top center</Button>
<Button @click="changePosition('top-right')" variant="surface">Top right</Button>
<Button @click="changePosition('bottom-left')" variant="surface">Bottom left</Button>
<Button @click="changePosition('bottom-center')" variant="surface">Bottom center</Button>
<Button @click="changePosition('bottom-right')" variant="surface">Bottom right</Button>
</div>

<template #source>

<div class="language-vue">
<pre class="shiki"><code>&lt;ToastProvider
  <span style="color: var(--red-10)">position="{{ position }}"</span>
/&gt;
</code></pre>
</div>

</template>

</ExampleCode>


### Size

You can customize the size of toast messages using one of the three available `size` options.

<ExampleCode name="Size" variant="full">

<div class="flex flex-wrap items-center gap-4">
<Button @click="changeSize('1')" variant="surface">Size 1</Button>
<Button @click="changeSize('2')" variant="surface">Size 2</Button>
<Button @click="changeSize('3')" variant="surface">Size 3</Button>
</div>

<template #source>

<div class="language-vue">
<pre class="shiki"><code>&lt;ToastProvider
  <span style="color: var(--red-10)">size="{{ size }}"</span>
/&gt;
</code></pre>
</div>

</template>

</ExampleCode>

## Examples

### Methods

<div class="flex flex-wrap items-center gap-4 not-prose">
<Button @click="toast.info('A info message')">
  <code>toast.info</code>
</Button>
<Button @click="toast.success('A success message')" color="green">
  <code>toast.success</code>
</Button>
<Button @click="toast.warning('A warning message')" color="orange">
  <code>toast.warning</code>
</Button>
<Button @click="toast.error('A error message')" color="red">
  <code>toast.error</code>
</Button>
</div>

### Promise

<Example name="toast/Promise.vue" />

### Description

<Example name="toast/Description.vue" variant="full" />
