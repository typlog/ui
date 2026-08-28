import type { ComponentMeta, MetaCheckerOptions, PropertyMeta, PropertyMetaSchema } from 'vue-component-meta'
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import { createChecker } from 'vue-component-meta'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const md = new MarkdownIt({ html: true })
md.use(transformJSDocLinks)


const checkerOptions: MetaCheckerOptions = {
}

const tsconfigChecker = createChecker(
  resolve(__dirname, '../tsconfig.json'),
  checkerOptions,
)

const ownPropsByComponent: Record<string, string[]> = {
  ChartLegend: ['orientation', 'align', 'ariaLabel'],
  ChartRoot: ['config'],
  ChartTooltip: [],
  ChartTooltipContent: ['payload', 'config', 'x', 'indicator', 'hideLabel', 'hideIndicator', 'labelKey', 'labelFormatter', 'valueFormatter'],
  ChartCrosshair: ['contentComponent', 'contentProps'],
  Sidebar: ['open', 'defaultOpen', 'collapsed', 'defaultCollapsed', 'side', 'variant', 'collapsible', 'width', 'collapsedWidth', 'mobileWidth', 'mobileTitle', 'mobileDescription'],
  SidebarMenuButton: ['icon', 'text', 'trailingIcon', 'active', 'disabled', 'tooltip'],
  SidebarMenuSubButton: ['icon', 'text', 'trailingIcon', 'active', 'disabled'],
}

const fallbackInheritByComponent: Record<string, string> = {
  ChartTooltip: 'unovis',
  ChartCrosshair: 'unovis',
}

parseComponents(resolve(__dirname, '../packages/ui/src/components/index.ts'))
parseComponents(resolve(__dirname, '../packages/ui/src/addons/index.ts'))
parseComponents(resolve(__dirname, '../packages/ui/src/charts/index.ts'))

function parseComponents (filePath: string) {
  const names = tsconfigChecker.getExportNames(filePath)
  names.forEach(name => {
    // component name starts with uppercase character
    if (/^[A-Z]/.test(name)) {
      const outfile = resolve(__dirname, `../.vitepress/meta/${name}.json`)
      let componentMeta: ComponentMeta
      let usedDirectFallback = false
      const directFile = findComponentFile(name)
      const ownProps = ownPropsByComponent[name] ?? []
      const hasOwnProps = Object.hasOwn(ownPropsByComponent, name)

      if (directFile && hasOwnProps) {
        componentMeta = tsconfigChecker.getComponentMeta(directFile)
        usedDirectFallback = true
      } else if (!existsSync(outfile) && directFile) {
        componentMeta = tsconfigChecker.getComponentMeta(directFile)
        usedDirectFallback = true
      } else {
        try {
          componentMeta = tsconfigChecker.getComponentMeta(filePath, name)
        }
        catch {
          // vue-component-meta currently cannot resolve some re-exported symbols.
          // Preserve existing metadata and only use a direct same-name Vue file as
          // a fallback for newly exported components.
          if (existsSync(outfile) || !directFile) {
            return
          }

          try {
            componentMeta = tsconfigChecker.getComponentMeta(directFile)
            usedDirectFallback = true
          }
          catch (directError) {
            console.warn(`Skipping metadata for ${name}: ${errorMessage(directError)}`)
            return
          }
        }
      }

      const fallbackInherit = usedDirectFallback
        ? (fallbackInheritByComponent[name] ?? 'reka-ui')
        : null
      const meta = parseMeta(componentMeta, fallbackInherit, ownProps)
      writeFileSync(outfile, JSON.stringify(meta, null, 2))
    }
  })
}

function findComponentFile (name: string) {
  return findFile(resolve(__dirname, '../packages/ui/src'), `${name}.vue`)
}

function findFile (directory: string, filename: string): string | undefined {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filepath = resolve(directory, entry.name)
    if (entry.isFile() && entry.name === filename)
      return filepath
    if (entry.isDirectory()) {
      const match = findFile(filepath, filename)
      if (match)
        return match
    }
  }
}

function errorMessage (error: unknown) {
  return error instanceof Error ? error.message : String(error)
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
function parseMeta(meta: ComponentMeta, fallbackInherit: string | null = null, ownProps: string[] = []) {
  const props = meta.props
  // Exclude global props
    .filter(prop => !prop.global)
    .map((prop) => {
      let defaultValue = prop.default
      let type = prop.type
      let description = prop.description
      const { name, required } = prop

      prop.tags.forEach(item => {
        if ((item.name === 'default' || item.name === 'defaultValue')
          && (defaultValue === undefined || !fallbackInherit)) {
          defaultValue = item.text
        }
      })

      if (defaultValue === 'undefined') {
        defaultValue = undefined
      }

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

      let inherit: string | null = null
      prop.declarations.some(declare => {
        if (declare.file.indexOf('node_modules/reka-ui') !== -1) {
          inherit = 'reka-ui'
          return true
        }
        if (declare.file.indexOf('node_modules/@unovis') !== -1) {
          inherit = 'unovis'
          return true
        }
      })
      if (fallbackInherit && !ownProps.includes(name)) {
        inherit = fallbackInherit
      }

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
