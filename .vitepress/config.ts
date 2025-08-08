import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import type { ThemeConfig } from './custom/types'
import { markdownExampleTagBlock } from './plugins/example'

// https://vitepress.dev/reference/site-config
export default defineConfig<ThemeConfig>({
  title: 'Typlog UI',
  description: 'Themed components for Reka UI.',
  srcDir: 'docs/content',
  cleanUrls: true,
  vite: {
    plugins: [
      tailwindcss(),
      Icons({ scale: 1, compiler: 'vue3' }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, '..'),
        '#components': resolve(__dirname, '../src/components'),
        '#addons': resolve(__dirname, '../src/addons'),
      },
    },
  },
  markdown: {
    headers: true,
    preConfig(md) {
      md.use(markdownExampleTagBlock)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    nav: [
      { text: 'UI', link: '/overview/getting-started' },
    ],

    sidebar: [
      {
        text: 'Overview',
        icon: 'lucide:rocket',
        items: [
          { text: 'Getting started', link: '/overview/getting-started' },
          { text: 'Releases', link: '/overview/releases' },
          { text: 'Color', link: '/overview/color' },
          { text: 'Shadows', link: '/overview/shadows' },
        ],
      },
      {
        text: 'Components',
        icon: 'lucide:component',
        items: [
          {
            text: 'General',
            icon: 'lucide:square-mouse-pointer',
            items: [
              { text: 'Avatar', link: '/components/avatar' },
              { text: 'Badge', link: '/components/badge' },
              { text: 'Button', link: '/components/button' },
              { text: 'Icon Button', link: '/components/icon-button' },
              { text: 'Card', link: '/components/card' },
              { text: 'Separator', link: '/components/separator' },
            ],
          },
          {
            text: 'Form',
            icon: 'lucide:text-cursor-input',
            items: [
              { text: 'Switch', link: '/components/switch' },
              { text: 'Toggle', link: '/components/toggle' },
              { text: 'Toggle Group', link: '/components/toggle-group' },
              { text: 'Checkbox', link: '/components/checkbox' },
              { text: 'Checkbox Group', link: '/components/checkbox-group' },
              { text: 'Radio', link: '/components/radio' },
              { text: 'Radio Group', link: '/components/radio-group' },
              { text: 'Radio Tabs', link: '/components/radio-tabs' },
              { text: 'Radio Cards', link: '/components/radio-cards' },
              { text: 'Text Field', link: '/components/text-field' },
              { text: 'Text Area', link: '/components/text-area' },
              { text: 'Color Field', link: '/components/color-field' },
              { text: 'Select', link: '/components/select' },
              { text: 'Combobox', link: '/components/combobox' },
              { text: 'Editable', link: '/components/editable' },
            ],
          },
          {
            text: 'Controls',
            icon: 'lucide:sliders-horizontal',
            items: [
              { text: 'Tabs', link: '/components/tabs' },
              { text: 'Accordion', link: '/components/accordion' },
              { text: 'Collapsible', link: '/components/collapsible' },
              { text: 'Pagination', link: '/components/pagination' },
            ],
          },
          {
            text: 'Overlays',
            icon: 'lucide:layers',
            items: [
              { text: 'Dialog', link: '/components/dialog' },
              { text: 'Dropdown Menu', link: '/components/dropdown' },
              { text: 'Popover', link: '/components/popover' },
              { text: 'Tooltip', link: '/components/tooltip' },
              { text: 'Toast', link: '/components/toast' },
            ],
          },
        ],
      },
      {
        text: 'Addons',
        icon: 'lucide:blocks',
        items: [
          { text: 'SocialButton', link: '/addons/social-button' },
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
