<script setup lang="ts">
import {
  AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#components'
</script>

<template>
  <div class="mt-2 max-w-80">
    <AccordionRoot type="single" collapsible>
      <AccordionItem value="1">
        <AccordionTrigger indicator="plus-minus">Trigger 1</AccordionTrigger>
        <AccordionContent>
          <div>Content 1</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Trigger 2</AccordionTrigger>
        <AccordionContent>
          <div>Content 2</div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="3">
        <AccordionTrigger>Trigger 3</AccordionTrigger>
        <AccordionContent>
          <div>Content 3</div>
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  </div>
</template>
