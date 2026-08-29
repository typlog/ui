---
title: PinInput
description: Captures a short sequence of characters with one input per position.
status: beta
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/pin-input
reka: https://reka-ui.com/docs/components/pin-input
---

<Example name="pin-input/Overview.vue" variant="full" />

`PinInputRoot` provides the input state and behavior, while each `PinInputInput` represents one position. The number of inputs is determined by the number of `PinInputInput` components you render.

## API Reference

### PinInputRoot

<PropsTable name="PinInputRoot" />

### PinInputInput

<PropsTable name="PinInputInput" />

## Examples

### Size

<Example name="pin-input/Size.vue" />

### Variant

<Example name="pin-input/Variant.vue" />

### One-time password

Set `otp` and `type="number"` for verification codes. Reka UI handles one-time-code autocomplete, sequential focus, and complete-code events.

<Example name="pin-input/Otp.vue" />

### Mask

<Example name="pin-input/Mask.vue" />

### States

<Example name="pin-input/State.vue" />

### Color

<Example name="pin-input/Color.vue" />

### Radius

<Example name="pin-input/Radius.vue" />

### Grouped inputs

<Example name="pin-input/Grouped.vue" />

### Form

`name` and `required` are forwarded to the form field represented by the root.

<Example name="pin-input/Form.vue" />
