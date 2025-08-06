import './style.css'
import type { Theme } from 'vitepress'
import * as components from '#components'
import Example from '../components/Example.vue'
import PropsTable from '../components/PropsTable.vue'
import InstallTabs from '../components/InstallTabs.vue'
import Layout from '../custom/Layout.vue'

export default {
  Layout,
  async enhanceApp({ app }) {
    app.component('Example', Example)
    app.component('ExampleCode', Example)
    app.component('InstallTabs', InstallTabs)
    app.component('PropsTable', PropsTable)
    Object.keys(components).forEach((name) => {
      app.component(name, components[name as 'Button'])
    })
  },
} satisfies Theme
