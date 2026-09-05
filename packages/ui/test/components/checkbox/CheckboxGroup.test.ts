/* eslint-disable vue/one-component-per-file -- test harnesses stay beside their assertions */
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { Checkbox, CheckboxGroup } from '@typlog/ui'

const Harness = defineComponent({
  components: { Checkbox, CheckboxGroup },
  setup() {
    const scopes = ref(['outside', 'read'])
    return { scopes }
  },
  template: `
    <CheckboxGroup v-model="scopes" :all-values="['read', 'write']">
      <template #select-all="{ checkboxProps }">
        <Checkbox data-select-all v-bind="checkboxProps" />
      </template>
      <Checkbox value="read" />
      <Checkbox value="write" />
    </CheckboxGroup>
  `,
})

describe('CheckboxGroup', () => {
  it('exposes an indeterminate select-all checkbox and selects every group value', async () => {
    const wrapper = mount(Harness)
    const selectAll = wrapper.get('[data-select-all]')

    expect(selectAll.attributes('aria-checked')).toBe('mixed')

    await selectAll.trigger('click')

    expect(wrapper.vm.scopes).toEqual(['outside', 'read', 'write'])
    expect(selectAll.attributes('aria-checked')).toBe('true')
  })

  it('clears only values owned by the group', async () => {
    const wrapper = mount(Harness)
    const selectAll = wrapper.get('[data-select-all]')

    await selectAll.trigger('click')
    await selectAll.trigger('click')

    expect(wrapper.vm.scopes).toEqual(['outside'])
    expect(selectAll.attributes('aria-checked')).toBe('false')
  })

  it('supports select all with an uncontrolled default value', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        allValues: ['read', 'write'],
        defaultValue: ['read'],
      },
      slots: {
        'select-all': ({ checkboxProps }) => h(Checkbox, {
          ...checkboxProps,
          'data-select-all': '',
        }),
        default: () => [
          h(Checkbox, { value: 'read' }),
          h(Checkbox, { value: 'write' }),
        ],
      },
    })

    const selectAll = wrapper.get('[data-select-all]')
    expect(selectAll.attributes('aria-checked')).toBe('mixed')

    await selectAll.trigger('click')

    expect(selectAll.attributes('aria-checked')).toBe('true')
    const updates = wrapper.emitted('update:modelValue')
    expect(updates?.[updates.length - 1]).toEqual([
      ['read', 'write'],
    ])
  })

  it('uses separate outer and content elements for table groups', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        modelValue: ['read'],
        allValues: ['read', 'write'],
        as: 'table',
        contentAs: 'tbody',
      },
      slots: {
        'select-all': ({ checkboxProps }) => h('thead', [
          h('tr', [h('th', [h(Checkbox, checkboxProps)])]),
        ]),
        default: () => [
          h('tr', [h('td', [h(Checkbox, { value: 'read' })])]),
          h('tr', [h('td', [h(Checkbox, { value: 'write' })])]),
        ],
      },
    })

    expect(wrapper.element.tagName).toBe('TABLE')
    expect(wrapper.find(':scope > thead').exists()).toBe(true)
    expect(wrapper.find(':scope > tbody.ui-CheckboxGroupContent').exists()).toBe(true)
    expect(wrapper.find('thead [role=checkbox]').attributes('aria-checked')).toBe('mixed')
    expect(wrapper.findAll('tbody [role=checkbox]')).toHaveLength(2)
  })

  it('wraps native form inputs in valid table rows', async () => {
    const wrapper = mount(defineComponent({
      components: { Checkbox, CheckboxGroup },
      setup() {
        const scopes = ref(['read', 'write'])
        return { scopes }
      },
      template: `
        <form>
          <CheckboxGroup
            v-model="scopes"
            name="scopes"
            as="table"
            content-as="tbody"
          >
            <Checkbox value="read" as="tr" />
            <Checkbox value="write" as="tr" />
          </CheckboxGroup>
        </form>
      `,
    }))

    expect(wrapper.find('tbody > input').exists()).toBe(false)
    expect(wrapper.find('table > input').exists()).toBe(false)
    expect(wrapper.find('table > caption.ui-CheckboxGroupFormControl').exists()).toBe(true)
    expect(wrapper.findAll('tbody > tr')).toHaveLength(2)
    expect(wrapper.get('tbody > tr:last-child').attributes('role')).toBe('checkbox')

    const formInputs = wrapper.findAll('.ui-CheckboxGroupFormControl input')
    expect(formInputs.map(input => input.attributes('name'))).toEqual([
      'scopes[0]',
      'scopes[1]',
    ])
    expect(formInputs.map(input => (input.element as HTMLInputElement).value)).toEqual(['read', 'write'])

    await wrapper.find('tbody [role=checkbox]').trigger('click')

    expect(wrapper.findAll('.ui-CheckboxGroupFormControl input')).toHaveLength(1)
    expect(wrapper.get('.ui-CheckboxGroupFormControl input').attributes('name')).toBe('scopes[0]')
    expect((wrapper.get('.ui-CheckboxGroupFormControl input').element as HTMLInputElement).value).toBe('write')
  })
})
