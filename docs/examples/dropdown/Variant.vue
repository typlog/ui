<script setup lang="ts">
import {
  Button,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '#components'
import CaretDownIcon from '~icons/radix-icons/caret-down'
</script>

<template>
  <div class="flex items-center gap-4">
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button variant="solid">
          Solid
          <CaretDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent variant="solid">
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
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button variant="soft">
          Soft
          <CaretDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent variant="soft">
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
  </div>
</template>
