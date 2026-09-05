import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const packageDist = join(repositoryRoot, 'packages/ui/dist')
const fixtureRoot = mkdtempSync(join(tmpdir(), 'typlog-ui-package-'))
const installedPackage = join(fixtureRoot, 'node_modules/@typlog/ui')
const consumerDependencies = [
  '@iconify/vue',
  '@tanstack/vue-virtual',
  '@unovis/ts',
  '@unovis/vue',
  '@vueuse/core',
  'ohash',
  'reka-ui',
  'vue',
]

function run(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: fixtureRoot,
    stdio: 'inherit',
    ...options,
  })
}

try {
  if (!existsSync(join(packageDist, 'package.json'))) {
    throw new Error('Package output is missing. Run `pnpm build:ui` before `pnpm verify:package`.')
  }

  const packOutput = execFileSync(
    'npm',
    ['pack', '--json', '--pack-destination', fixtureRoot],
    {
      cwd: packageDist,
      encoding: 'utf8',
      env: {
        ...process.env,
        npm_config_cache: join(fixtureRoot, '.npm-cache'),
      },
    },
  )
  const packResult = JSON.parse(packOutput)
  const tarballName = packResult[0]?.filename
  if (!tarballName) throw new Error('npm pack did not return an archive filename.')

  mkdirSync(installedPackage, { recursive: true })
  run('tar', [
    '-xzf',
    join(fixtureRoot, tarballName),
    '-C',
    installedPackage,
    '--strip-components=1',
  ])

  for (const dependency of consumerDependencies) {
    const source = [
      join(repositoryRoot, 'packages/ui/node_modules', dependency),
      join(repositoryRoot, 'node_modules', dependency),
    ].find(existsSync)
    const destination = join(fixtureRoot, 'node_modules', dependency)
    if (!source) throw new Error(`Workspace dependency is missing: ${dependency}`)
    mkdirSync(dirname(destination), { recursive: true })
    symlinkSync(source, destination, 'junction')
  }

  writeFileSync(join(fixtureRoot, 'package.json'), JSON.stringify({
    private: true,
    type: 'module',
  }))
  writeFileSync(join(fixtureRoot, 'index.html'), '<script type="module" src="/src.ts"></script>\n')
  writeFileSync(join(fixtureRoot, 'src.ts'), `
import { Button, ThemeProvider } from '@typlog/ui'
import { Turnstile } from '@typlog/ui/addons'
import { ChartRoot } from '@typlog/ui/charts'
import './style.css'

export { Button, ThemeProvider, Turnstile, ChartRoot }

document.body.dataset.packageExports = [Button, ThemeProvider, Turnstile, ChartRoot]
  .map(component => String(Boolean(component)))
  .join(',')
`)
  writeFileSync(join(fixtureRoot, 'style.css'), `
@import "@typlog/ui";
@import "@typlog/ui/addons";
@import "@typlog/ui/charts";
`)
  writeFileSync(join(fixtureRoot, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      lib: ['ES2020', 'DOM'],
      module: 'ESNext',
      moduleResolution: 'Bundler',
      skipLibCheck: true,
      strict: true,
      target: 'ES2020',
    },
    include: ['src.ts'],
  }, null, 2))
  writeFileSync(join(fixtureRoot, 'vite.config.mjs'), `
export default {
  build: {
    cssMinify: false,
  },
}
`)

  const typeScript = join(repositoryRoot, 'node_modules/typescript/bin/tsc')
  run(process.execPath, [typeScript, '--noEmit', '-p', 'tsconfig.json'])

  const vite = join(repositoryRoot, 'node_modules/vite/bin/vite.js')
  run(process.execPath, [vite, 'build', '--config', 'vite.config.mjs', '--outDir', 'build'])

  const builtHtml = readFileSync(join(fixtureRoot, 'build/index.html'), 'utf8')
  if (!builtHtml.includes('.css')) {
    throw new Error('Consumer build did not emit the package styles.')
  }
  const cssFile = readdirSync(join(fixtureRoot, 'build/assets')).find(file => file.endsWith('.css'))
  if (!cssFile) throw new Error('Consumer build is missing its CSS asset.')
  const builtCss = readFileSync(join(fixtureRoot, 'build/assets', cssFile), 'utf8')
  for (const selector of ['.ui-Button', '.ui-Turnstile', '.ui-ChartRoot']) {
    if (!builtCss.includes(selector)) throw new Error(`Consumer CSS is missing ${selector}.`)
  }
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true })
}
