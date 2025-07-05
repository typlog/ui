<script setup lang="ts">
import { Button } from '#components'
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Button color="gray" variant="classic">
        Edit profile
      </Button>
      <Button color="gray" variant="solid">
        Edit profile
      </Button>
      <Button color="gray" variant="soft">
        Edit profile
      </Button>
      <Button color="gray" variant="surface">
        Edit profile
      </Button>
      <Button color="gray" variant="outline">
        Edit profile
      </Button>
    </div>
    <div class="flex items-center gap-2">
      <Button color="gray" variant="classic" high-contrast>
        Edit profile
      </Button>
      <Button color="gray" variant="solid" high-contrast>
        Edit profile
      </Button>
      <Button color="gray" variant="soft" high-contrast>
        Edit profile
      </Button>
      <Button color="gray" variant="surface" high-contrast>
        Edit profile
      </Button>
      <Button color="gray" variant="outline" high-contrast>
        Edit profile
      </Button>
    </div>
  </div>
</template>
