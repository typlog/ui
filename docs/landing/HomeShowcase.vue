<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Card,
  IconButton,
  Tooltip,
} from '#components'
import BadgeOverview from '../examples/badge/Overview.vue'
import AvatarRing from '../examples/avatar/Ring.vue'
import SwitchColor from '../examples/switch/Color.vue'
import ToggleVariant from '../examples/toggle/Variant.vue'
import SelectOverview from '../examples/select/Overview.vue'
import ComboboxOverview from '../examples/combobox/Overview.vue'
import PaginationOverview from '../examples/pagination/Overview.vue'
</script>

<template>
  <div class="grid grid-cols-12 gap-2 auto-rows-[6px]">
    <Card class="col-span-5 row-span-4 flex items-center justify-center">
      <BadgeOverview />
    </Card>
    <Card class="col-span-4 row-span-6 flex items-center justify-center">
      <AvatarRing />
    </Card>
    <Card class="col-span-3 row-span-6 flex items-center justify-center">
      <ToggleVariant />
    </Card>
    <Card class="col-span-5 row-span-5 flex items-center justify-center">
      <SwitchColor />
    </Card>
    <Card class="col-span-3 row-span-5 flex items-center justify-center">
      <SelectOverview />
    </Card>
    <Card class="col-span-4 row-span-5 flex items-center justify-center">
      <ComboboxOverview />
    </Card>
    <Card class="col-span-3 row-span-8 text-center pt-12">
      <Tooltip content="Add to library" open>
        <IconButton radius="full">
          <Icon icon="lucide:plus" />
        </IconButton>
      </Tooltip>
    </Card>
    <Card class="col-span-9 row-span-6 flex items-center justify-center">
      <PaginationOverview />
    </Card>
  </div>
</template>
