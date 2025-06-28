import fs from 'node:fs/promises'
import path from 'node:path'

const updateImports = async (filePath) => {
  let content = await fs.readFile(filePath, 'utf-8')
  content = content.replace(/#components/g, './components')
  await fs.writeFile(filePath, content)
}

updateImports(path.resolve('dist/addons.js'))
