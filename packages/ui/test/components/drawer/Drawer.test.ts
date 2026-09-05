/* eslint-disable vue/one-component-per-file -- test harnesses stay beside their assertions */
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import {
  DrawerDescription,
  DrawerPopup,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
  ThemeProvider,
} from '@typlog/ui'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Drawer', () => {
  it('forwards root state and exposes it through the default slot', async () => {
    const open = ref(false)
    const wrapper = mount(defineComponent({
      components: { DrawerRoot, DrawerTrigger },
      setup: () => ({ open }),
      template: `
        <DrawerRoot v-model:open="open" v-slot="{ open: slotOpen }">
          <output data-open>{{ slotOpen }}</output>
          <DrawerTrigger>Open</DrawerTrigger>
        </DrawerRoot>
      `,
    }))

    expect(wrapper.get('[data-open]').text()).toBe('false')

    await wrapper.get('button').trigger('click')

    expect(open.value).toBe(true)
    expect(wrapper.get('[data-open]').text()).toBe('true')
  })

  it('renders popup content through a themed portal and applies visual props', async () => {
    const wrapper = mount(defineComponent({
      components: { DrawerDescription, DrawerPopup, DrawerRoot, DrawerTitle, ThemeProvider },
      template: `
        <ThemeProvider>
          <DrawerRoot :open="true">
            <DrawerPopup
              force-mount
              size="3"
              :show-handle="false"
              class="consumer-class"
              :ui="{ viewport: 'custom-viewport', overlay: 'custom-overlay', content: 'custom-content' }"
            >
              <DrawerTitle>Drawer title</DrawerTitle>
              <DrawerDescription>Drawer description</DrawerDescription>
            </DrawerPopup>
          </DrawerRoot>
        </ThemeProvider>
      `,
    }), { attachTo: document.body })

    await nextTick()

    const popup = document.body.querySelector('.ui-DrawerPopup')
    expect(popup).not.toBeNull()
    expect(popup?.classList).toContain('r-size-3')
    expect(popup?.classList).toContain('custom-content')
    expect(popup?.classList).toContain('consumer-class')
    expect(document.body.querySelector('.ui-DrawerViewport')?.classList).toContain('custom-viewport')
    expect(document.body.querySelector('.ui-DrawerOverlay')?.classList).toContain('custom-overlay')
    expect(document.body.querySelector('.ui-DrawerHandle')).toBeNull()
    expect(document.body.querySelector('.ui-theme')).not.toBeNull()
    expect(popup?.textContent).toContain('Drawer title')

    wrapper.unmount()
  })
})
