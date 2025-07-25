<script setup lang="ts">
import {
  Button,
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '#components'
</script>

<template>
  <AlertDialogRoot>
    <Button color="red" :as="AlertDialogTrigger">Revoke access</Button>
    <AlertDialogPopup>
      <AlertDialogTitle>Revoke access</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure? This application will no longer be accessible and any existing sessions will be expired.
      </AlertDialogDescription>
      <div class="flex mt-8 justify-end gap-3">
        <Button variant="soft" color="gray" :as="AlertDialogCancel">Cancel</Button>
        <Button color="red" :as="AlertDialogAction">Revoke access</Button>
      </div>
    </AlertDialogPopup>
  </AlertDialogRoot>
</template>
