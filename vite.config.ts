import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      cleanVueFileName: true,
    }),
  ],
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
        '@vueuse/core',
        'reka-ui',
      ],
    },
  },
})
