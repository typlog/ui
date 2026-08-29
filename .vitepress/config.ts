import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import type { ThemeConfig } from './custom/types.ts'
import { markdownExampleTagBlock } from './plugins/example.ts'
import { searchOptions } from './plugins/search.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig<ThemeConfig>({
  title: 'Typlog UI',
  description: 'Themed components for Reka UI.',
  srcDir: 'docs/content',
  outDir: 'site/public',
  cleanUrls: true,
  vite: {
    resolve: {
      dedupe: ['vue', '@iconify/vue', '@typlog/ui'],
    },
    plugins: [
      tailwindcss(),
      Icons({ scale: 1, compiler: 'vue3' }),
    ],
  },
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
  markdown: {
    headers: true,
    preConfig(md) {
      md.use(markdownExampleTagBlock)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    lastUpdated: {},
    search: {
      provider: 'local',
      options: searchOptions as unknown as DefaultTheme.LocalSearchOptions,
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    nav: [
      { text: 'Docs', link: '/overview/getting-started' },
    ],

    sidebar: [
      {
        text: 'Overview',
        icon: 'lucide:rocket',
        items: [
          { text: 'Introduction', link: '/overview/introduction' },
          { text: 'Getting started', link: '/overview/getting-started' },
          { text: 'Releases', link: '/overview/releases' },
          { text: 'Color', link: '/overview/color' },
          { text: 'Shadows', link: '/overview/shadows' },
          { text: 'Tailwindcss', link: '/overview/tailwindcss' },
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
              { text: 'Empty', link: '/components/empty' },
              { text: 'Skeleton', link: '/components/skeleton' },
              { text: 'Spinner', link: '/components/spinner' },
              { text: 'Separator', link: '/components/separator' },
              { text: 'Scroll Area', link: '/components/scroll-area' },
              { text: 'Sidebar', link: '/components/sidebar' },
            ],
          },
          {
            text: 'Form',
            icon: 'lucide:text-cursor-input',
            items: [
              { text: 'Form', link: '/components/form' },
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
              { text: 'Pin Input', link: '/components/pin-input' },
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
              { text: 'Tree', link: '/components/tree' },
            ],
          },
          {
            text: 'Overlays',
            icon: 'lucide:layers',
            items: [
              { text: 'Dialog', link: '/components/dialog' },
              { text: 'Dropdown Menu', link: '/components/dropdown' },
              { text: 'Navigation Menu', link: '/components/navigation' },
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
      {
        text: 'Charts',
        icon: 'lucide:chart-line',
        items: [
          { text: 'Overview', link: '/charts/overview' },
          { text: 'Line', link: '/charts/line' },
          { text: 'Area', link: '/charts/area' },
          { text: 'Bar', link: '/charts/bar' },
          { text: 'Pie', link: '/charts/pie' },
          { text: 'Donut', link: '/charts/donut' },
          { text: 'Tooltip', link: '/charts/tooltip' },
          { text: 'Legend', link: '/charts/legend' },
          { text: 'States', link: '/charts/states' },
          { text: 'API Reference', link: '/charts/api' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/typlog/ui' },
    ],
  },
})
