<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '#components'
</script>

<template>
  <AccordionRoot>
    <AccordionItem>
      <AccordionTrigger>
        What is @typlog/ui?
      </AccordionTrigger>
      <AccordionContent>
        <p><code>@typlog/ui</code> extends <code>reka-ui</code> with pre-styled components and uses Radix Colors for consistent theming.</p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem>
      <AccordionTrigger>
        What is Reka UI?
      </AccordionTrigger>
      <AccordionContent>
        <p>Reka UI is inspired by the principles and goals of Radix UI, sharing a commitment to accessibility, customization, and developer-friendly design.</p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem>
      <AccordionTrigger>
        What is Radix UI?
      </AccordionTrigger>
      <AccordionContent>
        <p>Unstyled, accessible, open source React primitives for high-quality web apps and design systems.</p>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
