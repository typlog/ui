import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'
import fs from 'node:fs'
import { resolve, relative, dirname } from 'node:path'

const ALLOWED_EXAMPLE_PROPS = ['name', 'variant']


export function markdownExampleTagBlock(md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'example', (state) => {
    const insertComponentImport = (importString: string) => {
      const index = state.tokens.findIndex(i => i.type === 'html_block' && i.content.match(/<script setup>/g))
      if (index === -1) {
        const importComponent = new state.Token('html_block', '', 0)

        importComponent.content = `<script setup>\n${importString}\n</script>\n`
        state.tokens.splice(0, 0, importComponent)
      }
      else {
        const content = state.tokens[index].content
        state.tokens[index].content = content.replace('</script>', `${importString}\n</script>`)
      }
    }

    const regex = /<Example\s+([^>]+)\/>/g
    // Iterate through the Markdown content and replace the pattern
    state.src = state.src.replace(regex, (content, bindingValue) => {
      // Define a regex pattern to match props and their values
      const propPattern = /(\w+)="([^"]*)"/g

      // Create an object to store the props and their values
      const props: { [key: string]: string } = {}

      // Use matchAll to find all matches in the input string
      const matches = bindingValue.matchAll(propPattern)

      // Iterate through the matches and populate the props object
      const exampleProps = []
      for (const match of matches) {
        const [, propName, propValue] = match
        props[propName] = propValue
        if (ALLOWED_EXAMPLE_PROPS.indexOf(propName) !== -1) {
          exampleProps.push(`${propName}="${propValue}"`)
        }
      }

      const componentName = formatComponentName(props.name)
      const srcPath = resolve(__dirname, '../../docs/examples', props.name)
      const { path: mdPath } = state.env as MarkdownEnv
      const importPath = relative(dirname(mdPath), srcPath)
      insertComponentImport(`import ${componentName} from "${importPath}"`)

      const index = state.tokens.findIndex(i => i.content === content)

      state.tokens[index].content = `<Example ${exampleProps.join(' ')}>\n<${componentName} />\n<template #source>`

      // insert source code
      const source = fs.readFileSync(srcPath, { encoding: 'utf-8' })
      const srcToken = new state.Token('fence', 'code', 0)
      srcToken.info = 'vue'
      srcToken.content = source.replace(/#components/g, '@typlog/ui').trim()
      const endToken = new state.Token('html_inline', '', 0)
      endToken.content = '</template>\n</Example>'
      state.tokens.splice(index + 1, 0, srcToken, endToken)
      return ''
    })
  })
}

function formatComponentName (name: string) {
  const parts = name.split(/\/|-/g).map(s => {
    return s[0].toUpperCase() + s.slice(1)
  })
  return 'Example' + parts.join('').replace('.vue', '')
}
