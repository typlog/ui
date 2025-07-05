# Dialog

<DialogRoot>
  <DialogTrigger as-child>
    <Button>Open Dailog</Button>
  </DialogTrigger>
  <DialogContent close-icon>
    <DialogTitle>This is title</DialogTitle>
    <div>Hello, this is a dialog</div>
  </DialogContent>
</DialogRoot>

-----

<AlertDialogRoot>
  <AlertDialogTrigger as-child>
    <Button>Open Dailog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent close-icon>
    <AlertDialogDescription>This is title</AlertDialogDescription>
    <div>Hello, this is a dialog</div>
    <div class="flex items-center gap-4">
      <AlertDialogCancel as-child>
        <Button color="gray" variant="soft">Cancel</Button>
      </AlertDialogCancel>
    </div>
  </AlertDialogContent>
</AlertDialogRoot>
