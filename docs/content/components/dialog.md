---
title: Dialog
description: Modal dialog window displayed above the page.
status: beta
source: https://github.com/typlog/ui/tree/main/src/components/dialog
reka: https://reka-ui.com/docs/components/dialog
radix: https://www.radix-ui.com/themes/docs/components/dialog
---

<Example name="dialog/Overview.vue" variant="hide" />


## API Reference

### DialogRoot & AlertDialogRoot

Contains all the parts of a dialog.

<PropsTable name="AlertDialogRoot" expand />

### DialogTrigger & AlertDialogTrigger

Wraps the control that will open the dialog. Usually used with `Button`:

```vue
<template>
<DialogRoot>
  <DialogTrigger as-child>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogPopup>...</DialogPopup>
</DialogRoot>
</template>
```

<PropsTable name="DialogTrigger" />

### DialogPopup

<PropsTable name="DialogPopup" />

### AlertDialogPopup

<PropsTable name="AlertDialogPopup" />

### DialogTitle & AlertDialogTitle

<PropsTable name="DialogTitle" />

### DialogDescription & AlertDialogDescription

<PropsTable name="DialogDescription" />

### DialogClose

<PropsTable name="DialogClose" />

### AlertDialogCancel

<PropsTable name="AlertDialogCancel" />

### AlertDialogAction

<PropsTable name="AlertDialogAction" />

## Examples

### Size

Use the `size` prop to control size of the dialog. It will affect the `padding`,
`border-radius` and `max-width` of the popup.

<Example name="dialog/Size.vue" variant="hide" />

### Alert Dialog

For alert-style dialogs, use the alert-specific components:

<div class="text-sm">

`AlertDialogRoot`, `AlertDialogTrigger`, `AlertDialogPopup`,
`AlertDialogTitle`, `AlertDialogDescription`,
`AlertDialogCancel`, `AlertDialogAction`.

</div>

<Example name="dialog/Alert.vue" variant="hide" />
