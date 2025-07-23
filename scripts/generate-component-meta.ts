import type { ComponentMeta, MetaCheckerOptions, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import { createChecker } from 'vue-component-meta'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const md = new MarkdownIt()
md.use(transformJSDocLinks)


const checkerOptions: MetaCheckerOptions = {
}

const tsconfigChecker = createChecker(
  resolve(__dirname, '../tsconfig.json'),
  checkerOptions,
)

parseComponents(resolve(__dirname, '../src/components/index.ts'))
parseComponents(resolve(__dirname, '../src/addons/index.ts'))

function parseComponents (filePath: string) {
  const names = tsconfigChecker.getExportNames(filePath)
  names.forEach(name => {
    // component name starts with uppercase character
    if (/^[A-Z]/.test(name)) {
      const meta = parseMeta(tsconfigChecker.getComponentMeta(filePath, name))
      const outfile = resolve(__dirname, `../.vitepress/meta/${name}.json`)
      writeFileSync(outfile, JSON.stringify(meta, null, 2))
    }
  })
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
function parseMeta(meta: ComponentMeta) {
  const props = meta.props
  // Exclude global props
    .filter(prop => !prop.global)
    .map((prop) => {
      let defaultValue = prop.default
      let type = prop.type
      let description = prop.description
      const { name, required } = prop

      prop.tags.forEach(item => {
        if (item.name === 'default') {
          defaultValue = item.text
        }
      })

      if (name === 'as') {
        defaultValue = defaultValue ?? '"div"'
      }

      if (defaultValue === 'undefined') {
        defaultValue = undefined
      }

      if (!type.includes('AcceptableValue')) {
        type = parseTypeFromSchema(prop.schema) || type
      }

      type = type.replace(/\s*\|\s*undefined/g, '')

      if (name === 'size') {
        type = type.split(' | ').sort().join(' | ')
      } else if (name === 'radius') {
        type = '"none" | "small" | "medium" | "large" | "full"'
      }

      if (name === 'asChild') {
        description = description.replace(/Read our.+$/, '')
      }

      let inherit: string | null = null
      prop.declarations.some(declare => {
        if (declare.file.indexOf('node_modules/reka-ui') !== -1) {
          inherit = 'reka-ui'
          return true
        }
      })

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
