import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ColorField } from '@typlog/ui'

describe('ColorField', () => {
  it('forwards native field attributes to the color input', () => {
    const wrapper = mount(ColorField, {
      attrs: {
        class: 'consumer-color-field',
        style: 'opacity: 0.5',
        name: 'accent',
        required: true,
        disabled: true,
        'aria-label': 'Accent color',
        'data-field': 'accent',
      },
    })

    const input = wrapper.get('input[type="color"]')
    expect(input.attributes('name')).toBe('accent')
    expect(input.attributes()).toMatchObject({
      required: '',
      disabled: '',
      'aria-label': 'Accent color',
      'data-field': 'accent',
    })

    expect(wrapper.attributes('name')).toBeUndefined()
    expect(wrapper.attributes('aria-label')).toBeUndefined()
    expect(wrapper.classes()).toContain('consumer-color-field')
    expect(wrapper.attributes('style')).toContain('opacity: 0.5')
    expect(input.classes()).not.toContain('consumer-color-field')
    expect(input.attributes('style')).toBeUndefined()
  })

  it('initializes defaultValue without emitting a model update', () => {
    const wrapper = mount(ColorField, {
      props: {
        defaultValue: '#3e63dd',
      },
    })
    expect(wrapper.get('input').element.value).toBe('#3e63dd')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('prefers a controlled model value over defaultValue', async () => {
    const wrapper = mount(ColorField, {
      props: {
        modelValue: '#e5484d',
        defaultValue: '#3e63dd',
      },
    })

    const input = wrapper.get('input')
    expect(input.element.value).toBe('#e5484d')

    await input.setValue('#30a46c')
    expect(wrapper.emitted('update:modelValue')).toEqual([['#30a46c']])
  })
})
