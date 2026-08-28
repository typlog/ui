import type { ComponentMeta, MetaCheckerOptions, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import ts from 'typescript'
import { createChecker } from 'vue-component-meta'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const sourceDir = resolve(__dirname, '../packages/ui/src')
const normalizedSourceDir = `${sourceDir.replaceAll('\\', '/')}/`
const componentExports = new Map<string, Map<string, string>>()

const md = new MarkdownIt({ html: true })
md.use(transformJSDocLinks)


const checkerOptions: MetaCheckerOptions = {
}

const tsconfigChecker = createChecker(
  resolve(__dirname, '../packages/ui/tsconfig.json'),
  checkerOptions,
)

generateEntryMeta(resolve(sourceDir, 'components/index.ts'))
generateEntryMeta(resolve(sourceDir, 'addons/index.ts'))
generateEntryMeta(resolve(sourceDir, 'charts/index.ts'))

function generateEntryMeta (filePath: string) {
  for (const [name, componentFile] of collectComponentExports(filePath)) {
    const outfile = resolve(__dirname, `../.vitepress/meta/${name}.json`)
    const componentMeta = tsconfigChecker.getComponentMeta(componentFile)
    const meta = formatMeta(componentMeta)
    writeFileSync(outfile, JSON.stringify(meta, null, 2))
  }
}

function collectComponentExports (filePath: string): Map<string, string> {
  const cached = componentExports.get(filePath)
  if (cached)
    return cached

  const exports = new Map<string, string>()
  componentExports.set(filePath, exports)

  const source = ts.createSourceFile(
    filePath,
    readFileSync(filePath, 'utf-8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

  for (const statement of source.statements) {
    if (!ts.isExportDeclaration(statement) || !statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier))
      continue

    const moduleFile = resolveModuleFile(filePath, statement.moduleSpecifier.text)
    if (!moduleFile)
      continue

    if (moduleFile.endsWith('.vue')) {
      if (!statement.exportClause || !ts.isNamedExports(statement.exportClause))
        continue
      for (const specifier of statement.exportClause.elements) {
        if (!specifier.isTypeOnly && specifier.propertyName?.text === 'default')
          addComponentExport(exports, specifier.name.text, moduleFile)
      }
      continue
    }

    const nestedExports = collectComponentExports(moduleFile)
    if (!statement.exportClause) {
      for (const [name, componentFile] of nestedExports)
        addComponentExport(exports, name, componentFile)
    } else if (ts.isNamedExports(statement.exportClause)) {
      for (const specifier of statement.exportClause.elements) {
        if (specifier.isTypeOnly)
          continue
        const importedName = specifier.propertyName?.text ?? specifier.name.text
        const componentFile = nestedExports.get(importedName)
        if (componentFile)
          addComponentExport(exports, specifier.name.text, componentFile)
      }
    }
  }

  return exports
}

function resolveModuleFile (importer: string, moduleName: string): string | undefined {
  if (!moduleName.startsWith('.'))
    return

  const target = resolve(dirname(importer), moduleName)
  const candidates = [target, `${target}.ts`, `${target}.vue`, resolve(target, 'index.ts')]
  return candidates.find(candidate => existsSync(candidate) && statSync(candidate).isFile())
}

function addComponentExport (exports: Map<string, string>, name: string, componentFile: string) {
  const existing = exports.get(name)
  if (existing && existing !== componentFile)
    throw new Error(`Component export ${name} resolves to both ${existing} and ${componentFile}`)
  exports.set(name, componentFile)
}

function parseTypeFromSchema(schema: PropertyMetaSchema): string {
  if (typeof schema === 'object' && (schema.kind === 'enum' || schema.kind === 'array')) {
    const isFlatEnum = schema.schema?.every(val => typeof val === 'string')
    const enumValue = schema?.schema?.filter(i => i !== 'undefined') ?? []

    if (isFlatEnum && /^[A-Z]/.test(schema.type))
      return enumValue.join(' | ')
    else if (typeof schema.schema?.[0] === 'object' && schema.schema?.[0].kind === 'enum')
      return schema.schema.map((s: PropertyMetaSchema) => parseTypeFromSchema(s)).join(' | ')
    else
      return schema.type
  }
  else if (typeof schema === 'object' && (schema.kind === 'object' || schema.kind === 'event')) {
    return schema.type
  }
  else if (typeof schema === 'string') {
    return schema
  }
  else {
    return ''
  }
}

// Utilities
function formatMeta(meta: ComponentMeta) {
  const props = meta.props
  // Exclude global props
    .filter(prop => !prop.global)
    .map((prop) => {
      let defaultValue = prop.default === 'undefined' ? undefined : prop.default
      let type = prop.type
      let description = prop.description
      const { name, required } = prop

      prop.tags.forEach(item => {
        if ((item.name === 'default' || item.name === 'defaultValue') && defaultValue === undefined) {
          defaultValue = item.text
        }
      })

      if (!isNativeType(type)) {
        type = parseTypeFromSchema(prop.schema) || type
      }

      type = type.replace(/\s*\|\s*undefined/g, '')

      if (name === 'size') {
        type = type.split(' | ').sort().join(' | ')
      } else if (name === 'color') {
        type = '"indigo" | "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky"'
      } else if (name === 'radius') {
        type = '"none" | "small" | "medium" | "large" | "full"'
      }

      if (name === 'asChild') {
        description = description.replace(/Read our.+$/, '')
      }

      const inherit = findInheritanceSource(prop)
      return ({
        name,
        description: md.render(description).trim(),
        type,
        required,
        inherit,
        default: defaultValue ?? undefined,
      })
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const events = meta.events
    .map((event) => {
      const { name, type } = event
      return ({
        name,
        type: type.replace(/\s*\|\s*undefined/g, ''),
      })
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const defaultSlot = meta.slots?.[0]
  const slots: { name: string, description: string, type: string }[] = []

  if (defaultSlot && defaultSlot.type !== '{}') {
    const schema = defaultSlot.schema
    if (typeof schema === 'object' && schema.schema) {
      Object.values(schema.schema).forEach((childMeta: PropertyMeta) => {
        slots.push({
          name: childMeta.name,
          description: md.render(childMeta.description),
          type: parseTypeFromSchema(childMeta.schema),
        })
      })
    } else if (typeof schema === 'string') {
      // Current vue-component-meta versions expose inline slot schemas as a
      // string rather than the object schema used by older versions.
      const body = schema.trim().replace(/^\{\s*|\s*\}$/g, '')
      body.split(';').forEach((entry) => {
        const match = entry.trim().match(/^([\w$]+)\s*:\s*(.+)$/)
        if (match) {
          slots.push({
            name: match[1],
            description: '',
            type: match[2].trim(),
          })
        }
      })
    }
  }

  // exposed method
  const methods = meta.exposed
    .filter(expose => typeof expose.schema === 'object' && expose.schema.kind === 'event')
    .map(expose => ({
      name: expose.name,
      description: md.render(expose.description),
      type: expose.type,
    }))

  return {
    props,
    events,
    slots,
    methods,
  }
}

function findInheritanceSource(prop: PropertyMeta): string | null {
  const files = prop.getDeclarations().map(declaration => declaration.file.replaceAll('\\', '/'))
  if (files.some(file => file.startsWith(normalizedSourceDir)))
    return null

  for (const file of files) {
    if (file.includes('/node_modules/reka-ui/'))
      return 'reka-ui'
    if (file.includes('/node_modules/@unovis/'))
      return 'unovis'
  }
  return null
}


// Define a custom plugin to transform JSDoc @link tags
function transformJSDocLinks(md: MarkdownIt) {
  md.core.ruler.push('transform-jsdoc-links', (state) => {
    state.tokens.forEach((token) => {
      if (token.type === 'inline' && token.children?.length) {
        for (let i = 0; i < token.children.length; i++) {
          const child = token.children[i]
          if (child.type === 'text' && child.content.startsWith('{@link')) {
            const matches = child.content.match(/\{@link\s+(.*?)\}/)
            if (matches) {
              const linkText = matches[1]
              const linkNode = new state.Token('link_open', 'a', 1)
              linkNode.attrSet('href', linkText)
              linkNode.attrSet('target', '_blank')
              const textNode = new state.Token('text', '', 0)
              textNode.content = 'reference'
              token.children.splice(i, 1, linkNode, textNode, new state.Token('link_close', 'a', -1))
              i += 2 // Skip the added link and text tokens
            }
          }
        }
      }
    })
  })
}

function isNativeType (type: string) {
  return type.includes('AcceptableValue')
}
