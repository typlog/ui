import fs from 'node:fs'
const updatePackageJSON = () => {
  const content = fs.readFileSync('package.json', 'utf-8')
  const pkg = JSON.parse(content)
  delete pkg.scripts
  delete pkg.devDependencies
  pkg.module = './components.js'
  pkg.types = './components.d.ts'
  pkg.exports = {
    '.': {
      types: './components.d.ts',
      style: './index.css',
      import: './components.js',
    },
    './components': {
      types: './components.d.ts',
      style: './components.css',
      import: './components.js',
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
    './base.css': './base.css',
    './components.css': './components.css',
    './tailwind.css': './tailwind.css',
  }
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 2) + '\n')
}

const addIndexCss = () => {
  const content = '@import "./base.css";\n@import "./components.css";'
  fs.writeFileSync('dist/index.css', content)
}

const cleanFiles = () => {
  try {
    fs.unlinkSync('dist/base.d.ts')
  } catch (e) {
    console.info(e)
  }
  try {
    fs.unlinkSync('dist/tailwind.d.ts')
  } catch (e) {
    console.info(e)
  }
}

addIndexCss()
updatePackageJSON()
cleanFiles()
