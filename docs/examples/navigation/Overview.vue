<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from '@typlog/ui'
</script>

<template>
  <NavigationMenuRoot>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div class="grid w-80 gap-1 p-3">
            <NavigationMenuLink href="#analytics">
              <strong>Analytics</strong><br>
              Measure traffic and understand your audience.
            </NavigationMenuLink>
            <NavigationMenuLink href="#publishing">
              <strong>Publishing</strong><br>
              Draft, review, and publish content together.
            </NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
