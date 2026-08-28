import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({ scale: 1, compiler: 'vue3' }),
    vue(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
      bundleTypes: true,
    }),
  ],
  resolve: {
    dedupe: [
      'vue',
      '@vue/runtime-core',
    ],
  },
  build: {
    minify: false,
    cssCodeSplit: true,
    lib: {
      formats: ['es'],
      entry: {
        base: resolve(import.meta.dirname, 'src/styles/index.css'),
        tailwind: resolve(import.meta.dirname, 'tailwind/index.css'),
        components: resolve(import.meta.dirname, 'src/components/index.ts'),
        addons: resolve(import.meta.dirname, 'src/addons/index.ts'),
        charts: resolve(import.meta.dirname, 'src/charts/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'vue',
        '@iconify/vue',
        'reka-ui',
        /^@typlog\/ui(?:\/.*)?$/,
        '@unovis/ts',
        '@unovis/vue',
      ],
    },
  },
})
