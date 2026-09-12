import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { DataTable } from '@typlog/ui'
import type { DataTableColumn, DataTableRequest } from '@typlog/ui'

type Member = {
  id: number
  name: string
  role: string
}

const columns: DataTableColumn<Member>[] = [
  { key: 'name', label: 'Member', sortable: true },
  { key: 'role', label: 'Role' },
]

const members: Member[] = [
  { id: 1, name: 'Grace Hopper', role: 'Editor' },
  { id: 2, name: 'Ada Lovelace', role: 'Admin' },
  { id: 3, name: 'Katherine Johnson', role: 'Analyst' },
]

describe('DataTable', () => {
  it('renders native table semantics and custom cells', () => {
    const wrapper = mount(DataTable<Member>, {
      props: { caption: 'Members', columns, rows: members, rowKey: 'id' },
      slots: {
        'cell-role': ({ value }: { value: unknown }) => `Role: ${value}`,
      },
    })

    expect(wrapper.get('caption').text()).toBe('Members')
    expect(wrapper.findAll('thead th')).toHaveLength(2)
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
    expect(wrapper.get('tbody').text()).toContain('Role: Editor')
  })

  it('filters rows across searchable columns', async () => {
    const wrapper = mount(DataTable<Member>, {
      props: { columns, rows: members, rowKey: 'id' },
    })

    await wrapper.get('input[type="search"]').setValue('ada')

    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.get('tbody').text()).toContain('Ada Lovelace')
    expect(wrapper.get('.ui-DataTableSummary').text()).toBe('1–1 of 1 row')
  })

  it('cycles sortable columns through ascending, descending, and unsorted states', async () => {
    const wrapper = mount(DataTable<Member>, {
      props: { columns, rows: members, rowKey: 'id' },
    })
    const sortButton = wrapper.get('.ui-DataTableSortButton')

    await sortButton.trigger('click')
    expect(wrapper.get('thead th').attributes('aria-sort')).toBe('ascending')
    expect(wrapper.findAll('tbody tr')[0].text()).toContain('Ada Lovelace')

    await sortButton.trigger('click')
    expect(wrapper.get('thead th').attributes('aria-sort')).toBe('descending')
    expect(wrapper.findAll('tbody tr')[0].text()).toContain('Katherine Johnson')

    await sortButton.trigger('click')
    expect(wrapper.get('thead th').attributes('aria-sort')).toBeUndefined()
    expect(wrapper.findAll('tbody tr')[0].text()).toContain('Grace Hopper')
    expect(lastEvent(wrapper.emitted('update:sort'))).toEqual([null])
  })

  it('paginates rows and clamps the current page when rows change', async () => {
    const wrapper = mount(DataTable<Member>, {
      props: { columns, rows: members, rowKey: 'id', pageSize: 2 },
    })

    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
    await wrapper.get('.ui-PaginationNext').trigger('click')
    expect(wrapper.get('tbody').text()).toContain('Katherine Johnson')

    await wrapper.setProps({ rows: members.slice(0, 1) })
    await nextTick()
    expect(wrapper.get('.ui-DataTableSummary').text()).toBe('1–1 of 1 row')
  })

  it('renders loading and empty state slots', async () => {
    const wrapper = mount(DataTable<Member>, {
      props: { columns, rows: [], loading: true },
      slots: {
        loading: 'Fetching members…',
        empty: 'No members match.',
      },
    })

    expect(wrapper.get('.ui-DataTableState').text()).toBe('Fetching members…')
    await wrapper.setProps({ loading: false })
    expect(wrapper.get('.ui-DataTableState').text()).toBe('No members match.')
  })

  it('emits query models and requests data in manual mode', async () => {
    const wrapper = mount(DataTable<Member>, {
      props: {
        columns,
        rows: members.slice(0, 2),
        rowKey: 'id',
        pageSize: 2,
        total: 12,
        manual: true,
      },
    })

    await nextTick()
    expect(wrapper.emitted('request')).toHaveLength(1)
    expect(lastRequest(wrapper.emitted('request'))).toEqual({
      page: 1,
      pageSize: 2,
      search: '',
      sort: undefined,
    })

    await wrapper.get('input[type="search"]').setValue('admin')
    await nextTick()
    expect(lastEvent(wrapper.emitted('update:search'))).toEqual(['admin'])
    expect(lastRequest(wrapper.emitted('request'))).toMatchObject({ search: 'admin' })
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)

    await wrapper.get('.ui-DataTableSortButton').trigger('click')
    await nextTick()
    expect(lastEvent(wrapper.emitted('update:sort'))).toEqual([{
      key: 'name',
      direction: 'ascending',
    }])
    expect(lastRequest(wrapper.emitted('request'))).toMatchObject({
      sort: { key: 'name', direction: 'ascending' },
    })

    await wrapper.get('.ui-PaginationNext').trigger('click')
    await nextTick()
    expect(lastEvent(wrapper.emitted('update:page'))).toEqual([2])
    expect(lastRequest(wrapper.emitted('request'))).toMatchObject({ page: 2 })
  })
})

function lastRequest(events: unknown[][] | undefined) {
  return lastEvent(events)?.[0] as DataTableRequest | undefined
}

function lastEvent(events: unknown[][] | undefined) {
  if (!events?.length) return undefined
  return events[events.length - 1]
}
