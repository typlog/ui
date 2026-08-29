import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({ scale: 1, compiler: 'vue3' }),
    vue(),
  ],
  test: {
    environment: 'happy-dom',
    include: ['packages/ui/test/**/*.test.ts'],
  },
})
