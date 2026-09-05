import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const metadataDirectory = join(repositoryRoot, '.vitepress/meta')

function snapshotMetadata() {
  return new Map(
    readdirSync(metadataDirectory)
      .filter(file => file.endsWith('.json'))
      .sort()
      .map(file => [file, readFileSync(join(metadataDirectory, file), 'utf8')]),
  )
}

const before = snapshotMetadata()
execFileSync('pnpm', ['build:meta'], {
  cwd: repositoryRoot,
  stdio: 'inherit',
})
const after = snapshotMetadata()
const changed = new Set([...before.keys(), ...after.keys()])

for (const file of [...changed]) {
  if (before.get(file) === after.get(file)) changed.delete(file)
}

if (changed.size) {
  throw new Error(`Generated component metadata is stale: ${[...changed].sort().join(', ')}`)
}
