/* eslint-disable vue/one-component-per-file -- test harnesses stay beside their assertions */
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { TreeItem, TreeRoot } from '@typlog/ui'

vi.mock('@iconify/vue', () => ({
  Icon: { template: '<svg aria-hidden="true" />' },
}))

interface Node {
  id: string
  name: string
  children?: Node[]
}

const items: Node[] = [
  { id: 'inbox', name: 'Inbox' },
  { id: 'archive', name: 'Archive' },
]

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Tree', () => {
  it('renders the normal branch and updates single selection', async () => {
    const selected = ref<Node>()
    const wrapper = mount(defineComponent({
      components: { TreeItem, TreeRoot },
      setup: () => ({ items, selected }),
      template: `
        <TreeRoot
          v-model="selected"
          :items="items"
          :get-key="item => item.id"
          selection-behavior="replace"
          size="3"
          color="blue"
          high-contrast
        >
          <template #default="{ item, virtualItem }">
            <TreeItem v-bind="item.bind" :text="item.value.name" :data-virtual="Boolean(virtualItem)" />
          </template>
        </TreeRoot>
      `,
    }))

    const root = wrapper.get('.ui-TreeRoot')
    expect(root.classes()).toContain('r-size-3')
    expect(root.attributes('data-accent-color')).toBe('blue')
    expect(wrapper.findAll('.ui-TreeItem')).toHaveLength(2)
    expect(wrapper.get('.ui-TreeItem').classes()).toContain('r-high-contrast')
    expect(wrapper.get('.ui-TreeItem').attributes('data-virtual')).toBe('false')

    await wrapper.findAll('.ui-TreeItem')[1].trigger('click')

    expect(selected.value).toEqual(items[1])
    expect(wrapper.findAll('.ui-TreeItem')[1].attributes('data-selected')).toBe('')
  })

  it('uses the virtual branch and exposes virtual positioning metadata', async () => {
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(112)
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(320)
    const virtualItems = Array.from({ length: 20 }, (_, index) => ({
      id: `item-${index}`,
      name: `Item ${index}`,
    }))
    const wrapper = mount(defineComponent({
      components: { TreeItem, TreeRoot },
      setup: () => ({ virtualItems }),
      template: `
        <TreeRoot
          :items="virtualItems"
          :get-key="item => item.id"
          :virtual="{ estimateSize: 28, overscan: 2, textContent: item => item.name }"
          style="height: 112px; overflow: auto"
        >
          <template #default="{ item, virtualItem }">
            <TreeItem v-bind="item.bind" :text="item.value.name" :data-virtual-index="virtualItem?.index" />
          </template>
        </TreeRoot>
      `,
    }), { attachTo: document.body })

    await nextTick()

    const rendered = wrapper.findAll('.ui-TreeItem')
    expect(rendered.length).toBeGreaterThan(0)
    expect(rendered[0].attributes('data-virtual-index')).toBeDefined()
    expect(rendered[0].attributes('data-index')).toBeDefined()
    expect(rendered[0].attributes('style')).toContain('translateY(')

    wrapper.unmount()
  })
})
