import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwind from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwind(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
    alias: {
      '#components': resolve(__dirname, 'src/components'),
    },
  },
  build: {
    minify: false,
    cssCodeSplit: true,
    lib: {
      formats: ['es'],
      entry: {
        components: resolve(__dirname, 'src/components/index.ts'),
        addons: resolve(__dirname, 'src/addons/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'vue',
        '@iconify/vue',
        'reka-ui',
        '#components',
      ],
    },
  },
})
