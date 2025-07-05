import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import * as components from '../../../src/components'

import Layout from './Layout.vue'
import "./style.css"

export default {
  Layout,
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    Object.keys(components).forEach((name) => {
      app.component(name, components[name as 'Button'])
    })
  }
} satisfies Theme
