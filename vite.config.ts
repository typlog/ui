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
  },
  build: {
    lib: {
      formats: ['es'],
      entry: [resolve(__dirname, 'src/index.ts')],
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'vue',
        '@iconify/vue',
        'reka-ui',
      ],
    },
  },
})
