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
    outline: [2, 3],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],

    sidebar: [
      {
        text: 'Components',
        link: '/components/avatar',
        items: [
          {
            text: 'General',
            items: [
              { text: 'Avatar', link: '/components/avatar' },
              { text: 'Badge', link: '/components/badge' },
              { text: 'Button', link: '/components/button' },
              { text: 'Dialog', link: '/components/dialog' },
            ]
          },
          {
            text: 'Form',
          },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/typlog/ui' }
    ]
  }
})
