import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs/promises'
import { resolve } from 'node:path'


const runBuild = (name, filepath) => {
  return build({
    plugins: [vue()],
    configFile: false,
    build: {
      minify: false,
      emptyOutDir: false,
      lib: {
        entry: filepath,
        formats: ['es'],
        fileName: () => 'noop',
        cssFileName: `components/${name}`,
      },
      rollupOptions: {
        external: [
          'vue',
          '@iconify/vue',
          '@typlog/ui',
          'reka-ui',
        ],
      },
    },
  })
}

const buildAll = async () => {
  await runBuild('base', resolve('src/styles/index.ts'))
  const names = await fs.readdir('./src/components')
  const results = names.map(async (name) => {
    if (!name.includes('.')) {
      const filepath = resolve(`src/components/${name}/index.ts`)
      try {
        await fs.access(filepath)
        await runBuild(name, filepath)
      } catch (e) {
      }
    }
  })
  await Promise.all(results)
  await fs.unlink('dist/noop')
}

buildAll()
