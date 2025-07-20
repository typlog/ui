import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { markdownExampleTagBlock } from './plugins/example'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Typlog UI',
  description: 'Themed components for Reka UI.',
  srcDir: 'docs/content',
  cleanUrls: true,
  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, '..'),
        '#components': resolve(__dirname, '../src/components'),
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
      { text: 'Components', link: '/components/button' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Getting started', link: '/overview/getting-started' },
          { text: 'Styling', link: '/overview/styling' },
          { text: 'Releases', link: '/overview/releases' },

        ],
      },
      {
        text: 'Components',
        items: [
          {
            text: 'General',
            items: [
              { text: 'Badge', link: '/components/badge' },
              { text: 'Button', link: '/components/button' },
              { text: 'Avatar', link: '/components/avatar' },
            ],
          },
          {
            text: 'Form',
            items: [
              { text: 'Switch', link: '/components/switch' },
              { text: 'Toggle', link: '/components/toggle' },
              { text: 'Checkbox', link: '/components/checkbox' },
              { text: 'Radio', link: '/components/radio' },
              { text: 'TextField', link: '/components/text-field' },
              { text: 'TextArea', link: '/components/text-area' },
              { text: 'Select', link: '/components/select' },
            ],
          },
          {
            text: 'Overlays',
            items: [
              { text: 'Dialog', link: '/components/dialog' },
              { text: 'Dropdown', link: '/components/dropdown' },
              { text: 'Popover', link: '/components/popover' },
            ],
          },
        ],
      },
      {
        text: 'Addons',
        items: [
          { text: 'Turnstile', link: '/addons/turnstile' },
          { text: 'Iconify', link: '/addons/iconify' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/typlog/ui' },
    ],
  },
})
