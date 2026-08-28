<script setup lang="ts">
import { Direction, GroupedBar, Orientation } from '@unovis/ts'
import { VisAxis, VisGroupedBar, VisXYContainer } from '@unovis/vue'
import {
  ChartRoot,
  ChartTooltip,
  type ChartConfig,
} from '@typlog/ui/charts'

interface Point {
  channel: string
  conversions: number
}

const data: Point[] = [
  { channel: 'Direct', conversions: 182 },
  { channel: 'Search', conversions: 246 },
  { channel: 'Social', conversions: 138 },
  { channel: 'Email', conversions: 204 },
]
const config = {
  channel: { label: 'Channel', role: 'x' },
  conversions: { label: 'Conversions', color: 'var(--blue-9)' },
} satisfies ChartConfig
const x = (_item: Point, index: number) => index
const y = (item: Point) => item.conversions
const yTickFormat = (value: number) => data[value]?.channel ?? ''
</script>

<template>
  <ChartRoot v-slot="{ mounted }" :config="config">
    <VisXYContainer
      v-if="mounted"
      :data="data"
      :height="260"
      :y-direction="Direction.South"
    >
      <VisGroupedBar
        :x="x"
        :y="y"
        :rounded-corners="6"
        :bar-padding="0.15"
        :orientation="Orientation.Horizontal"
      />
      <VisAxis
        type="x"
        :tick-line="false"
        :domain-line="false"
        :grid-line="true"
      />
      <VisAxis
        type="y"
        :tick-format="yTickFormat"
        :tick-values="data.map((_item, index) => index)"
        :tick-line="false"
        :domain-line="false"
        :grid-line="false"
      />
      <ChartTooltip :targets="[GroupedBar]" />
    </VisXYContainer>
  </ChartRoot>
</template>
