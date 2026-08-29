import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import Icons from 'unplugin-icons/vite'

const packageJson = JSON.parse(
  readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf8'),
) as Record<string, unknown>

function packageManifestPlugin(): Plugin {
  return {
    name: 'package-manifest',
    generateBundle() {
      const manifest = { ...packageJson }
      delete manifest.scripts
      delete manifest.devDependencies

      manifest.module = './index.js'
      manifest.types = './index.d.ts'
      manifest.exports = {
        '.': {
          types: './index.d.ts',
          style: './index.css',
          import: './index.js',
        },
        './addons': {
          types: './addons.d.ts',
          style: './addons.css',
          import: './addons.js',
        },
        './charts': {
          types: './charts.d.ts',
          style: './charts.css',
          import: './charts.js',
        },
      }

      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: `${JSON.stringify(manifest, null, 2)}\n`,
      })
    },
  }
}

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
    packageManifestPlugin(),
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
        index: resolve(import.meta.dirname, 'src/index.ts'),
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
