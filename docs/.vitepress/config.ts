import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { markdownExampleTagBlock } from './plugins/example'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Typlog UI",
  description: "Themed components for Reka UI.",
  srcDir: 'content',
  cleanUrls: true,
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '#components': resolve(__dirname, '../../src/components'),
      },
    },
  },
  markdown: {
    preConfig(md) {
      md.use(markdownExampleTagBlock)
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
