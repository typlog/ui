<script setup lang="ts">
import {
  Button,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '#components'
import ChevronDownIcon from '~icons/radix-icons/chevron-down'
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger>
      <Button variant="soft">
        Options
        <ChevronDownIcon />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem shortcut="⌘ E">Edit</DropdownMenuItem>
      <DropdownMenuItem shortcut="⌘ D">Duplicate</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem shortcut="⌘ N">Archive</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Share</DropdownMenuItem>
      <DropdownMenuItem>Add to favorites</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem shortcut="⌘ ⌫" color="red">
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
