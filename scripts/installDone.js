const fs = require('fs')
const { resolve } = require('path')
const basePath = require('./getProBasePath')
const packages = require(`${basePath(process.cwd())}/package.json`)
const file = resolve(`${basePath(process.cwd())}/package.json`)

function afterInstall () {
  packages.scripts.autoDep = `gitpull && npm run build:pro && depro`
  fs.writeFile(file, JSON.stringify(packages, null, 2), { encoding: 'utf-8'}, err => {console.log(err)})
}

module.exports = afterInstall