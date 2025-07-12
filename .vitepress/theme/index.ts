import type { Theme } from 'vitepress'
import * as components from '#components'
import Example from '../components/Example.vue'
import PropsTable from '../components/PropsTable.vue'
import Layout from './Layout.vue'

import "./style.css"

export default {
  Layout,
  async enhanceApp({ app }) {
    app.component('Example', Example)
    app.component('PropsTable', PropsTable)
    Object.keys(components).forEach((name) => {
      app.component(name, components[name as 'Button'])
    })
  }
} satisfies Theme
