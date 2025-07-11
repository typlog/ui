import fs from 'node:fs'
import path from 'node:path'

const updateImports = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8')
  content = content.replace(/#components/g, './components')
  fs.writeFileSync(filePath, content)
}

const updatePackageJSON = async () => {
  let content = fs.readFileSync('package.json', 'utf-8')
  let pkg = JSON.parse(content)
  const version = pkg.version

  content = fs.readFileSync('src/package.json', 'utf-8')
  pkg = JSON.parse(content)
  pkg.version = version
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 2))
}

updateImports(path.resolve('dist/addons.js'))
updatePackageJSON()
