---
title: Form
description: Accessible form and field composition for labels, descriptions, errors, and native controls.
status: alpha
source: https://github.com/typlog/ui/tree/main/packages/ui/src/components/form
reka: https://reka-ui.com/docs/overview/accessibility
---

<Example name="form/Overview.vue" variant="full" />

Form provides a small, validator-neutral composition layer for existing Typlog
controls. It connects labels, descriptions, and errors to a control, while
preserving native form submission and validation behavior.

It does not manage nested values, field arrays, or schema state. Validation can
come from the browser, a field callback, a server response, or an external
schema library such as Zod.

## Examples

### Validation

#### Native validation

Native constraints such as `required` and `type` continue to work. Invalid
events update the field state, associate the message with the control, and focus
the first invalid field when submission is blocked.

<Example name="form/NativeValidation.vue" />

#### Server errors

Pass an error map to `FormRoot`, keyed by each `FieldRoot` name. New input clears
the matching visible error; a later server response can provide a new error map.
Form-level errors remain application-owned.

<Example name="form/ServerErrors.vue" />

#### Zod

Run schema validation in application code, normalize issues into the controlled
error map, and use the parsed output on success. Zod is used only by this example
and is not a runtime dependency of `@typlog/ui`.

<Example name="form/Zod.vue" />

### Controls

Use `FieldControl` with native elements or compose it through `as-child` with
TextField, TextArea, Select, Combobox, Checkbox, Radio Group, Switch, and Pin
Input. Compound controls keep their existing submission behavior.

<Example name="form/Controls.vue" />

## API Reference

### Form

#### FormRoot

The native form container. It coordinates field validation, controlled errors,
submission, reset, and focus movement after an invalid submission.

It accepts native `<form>` attributes and events. Use `errors` to provide a
controlled error map keyed by field name; native attributes are omitted here.

<PropsTable name="FormRoot" />

### Field

#### FieldRoot

Provides the field name, generated IDs, validation state, and shared context for
the remaining field parts. Use `validate` for a validator-neutral synchronous or
asynchronous field callback.

<PropsTable name="FieldRoot" />

#### FieldLabel

Labels the field control using the generated or explicit control ID.

<PropsTable name="FieldLabel" />

#### FieldControl

Applies the field's ID, name, required and disabled state, and ARIA attributes to
a native element or an existing component through `as-child`.

<PropsTable name="FieldControl" />

#### FieldDescription

Provides persistent supporting text for the control. It remains visible when an
error is present because descriptions and errors serve different purposes.

<PropsTable name="FieldDescription" />

#### FieldError

Renders the current native, field-validator, or controlled error messages. The
part is omitted when the field has no visible errors.

<PropsTable name="FieldError" />

## Behavior

### Error lifecycle

Errors become visible after native invalid events, field validation, or a
controlled error update. New input immediately clears the field's visible local,
native, and controlled error state. Blur or the next submission validates the
field again.

`FieldDescription` remains visible alongside `FieldError`. Both IDs are included
in `aria-describedby` while they are rendered.

### Reset

Native `form.reset()` restores native control defaults and clears field touched,
dirty, validity, and local error state.

### Accessibility

Generated IDs associate labels, descriptions, and visible errors with the field
control. Pass an explicit `id` to `FieldControl` when an application needs a
stable ID. Invalid controls receive `aria-invalid="true"`, and keyboard focus
moves to the first invalid control after a blocked submission.
