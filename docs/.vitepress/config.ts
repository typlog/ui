import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Typlog UI",
  description: "Themed components for Reka UI.",
  srcDir: 'content',
  cleanUrls: true,
  vite: {
    resolve: {
      alias: {
        '#components': resolve(__dirname, '../../src/components'),
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Badge', link: '/components/badge' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Dialog', link: '/components/dialog' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/typlog/ui' }
    ]
  }
})
