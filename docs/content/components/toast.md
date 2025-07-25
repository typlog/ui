---
title: Toast
description:
status: alpha
source: https://github.com/typlog/ui/tree/main/src/components/toggtoastle
reka: https://reka-ui.com/docs/components/toast
---

<script setup>
  import { ref } from 'vue'
  import { ToastProvider, Button, toast } from '#components'

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

### Position

You can customize the position of toast messages using the `position` prop on `ToastProvider`.
By default, toasts appear in the bottom-right corner.

<ExampleCode name="Position" variant="full">

<div class="flex flex-wrap items-center gap-4">
<Button @click="changePosition('top-left')" variant="surface">Top left</Button>
<Button @click="changePosition('top-right')" variant="surface">Top right</Button>
<Button @click="changePosition('bottom-left')" variant="surface">Bottom left</Button>
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
