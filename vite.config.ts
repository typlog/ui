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
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'vue',
        '@iconify/vue',
        '@vueuse/core',
        'radix-vue',
      ],
    },
  },
})
