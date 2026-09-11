import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { Breadcrumb, BreadcrumbItem } from '@typlog/ui'

const Harness = defineComponent({
  components: { Breadcrumb, BreadcrumbItem },
  template: `
    <Breadcrumb label="Project path" size="1">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
      <BreadcrumbItem>Settings</BreadcrumbItem>
    </Breadcrumb>
  `,
})

describe('Breadcrumb', () => {
  it('renders native navigation and list semantics', () => {
    const wrapper = mount(Harness)

    expect(wrapper.get('nav').attributes('aria-label')).toBe('Project path')
    expect(wrapper.get('nav').classes()).toContain('r-size-1')
    expect(wrapper.get('ol').element.children).toHaveLength(3)
    expect(wrapper.get('a').attributes('href')).toBe('/')
    expect(wrapper.get('.ui-BreadcrumbPage').attributes('aria-current')).toBe('page')
  })

  it('keeps separators decorative', () => {
    const wrapper = mount(Harness)

    for (const separator of wrapper.findAll('.ui-BreadcrumbSeparator')) {
      expect(separator.attributes('role')).toBe('presentation')
      expect(separator.attributes('aria-hidden')).toBe('true')
    }
  })

  it('supports custom components without marking them as the current page', () => {
    const wrapper = mount(BreadcrumbItem, {
      props: { as: 'button' },
      attrs: { type: 'button' },
      slots: { default: 'Choose project' },
    })

    expect(wrapper.get('button').classes()).toContain('ui-BreadcrumbLink')
    expect(wrapper.get('button').attributes('aria-current')).toBeUndefined()
    expect(wrapper.get('button').attributes('type')).toBe('button')
  })
})
