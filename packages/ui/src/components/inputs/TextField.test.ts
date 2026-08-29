import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TextField from './TextField.vue'

describe('TextField', () => {
  it('places the cursor at the side that was clicked', async () => {
    const wrapper = mount(TextField, {
      props: { modelValue: 'hello' },
      slots: { left: 'L', right: 'R' },
    })
    const input = wrapper.get('input').element
    const setSelectionRange = vi.spyOn(input, 'setSelectionRange')

    await wrapper.get('[data-side=left]').trigger('pointerdown')
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    await wrapper.get('[data-side=right]').trigger('pointerdown')
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

    expect(setSelectionRange).toHaveBeenNthCalledWith(1, 0, 0)
    expect(setSelectionRange).toHaveBeenNthCalledWith(2, 5, 5)
    wrapper.unmount()
  })

  it.each(['number', 'date'] as const)('focuses %s inputs without selection errors', async (type) => {
    const wrapper = mount(TextField, {
      props: { type, modelValue: type === 'number' ? '12' : '2026-08-29' },
      slots: { right: 'R' },
      attachTo: document.body,
    })
    const input = wrapper.get('input').element
    const setSelectionRange = vi.spyOn(input, 'setSelectionRange')

    await wrapper.get('[data-side=right]').trigger('pointerdown')

    expect(document.activeElement).toBe(input)
    expect(setSelectionRange).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('matches Vue number model behavior for numeric and empty values', async () => {
    const wrapper = mount(TextField, {
      props: { type: 'number', modelValue: '', modelModifiers: { number: true } },
    })
    const input = wrapper.get('input')

    await input.setValue('42')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.[emitted.length - 1]).toEqual([42])

    await input.setValue('')
    const updated = wrapper.emitted('update:modelValue')
    expect(updated?.[updated.length - 1]).toEqual([''])
    wrapper.unmount()
  })

  it('keeps partial invalid number input instead of emitting NaN', async () => {
    const wrapper = mount(TextField, {
      props: { type: 'text', modelValue: '', modelModifiers: { number: true } },
    })
    const input = wrapper.get('input')
    input.element.value = 'abc'
    await input.trigger('input')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.[emitted.length - 1]).toEqual(['abc'])
    wrapper.unmount()
  })
})
