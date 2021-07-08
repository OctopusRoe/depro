#!/usr/bin/env node
const fs = require('fs')
const basePath = require('./getProBasePath')

function createConfig () {
  const text = {
    host: '',
    port: 22,
    userName: '',
    passWord: '',
    baseDir: '',
    basePath: '',
    buildPath: '',
    useBak: false,
    developers: '',
    useGitPull: false,
    gitPath: ''
  }
  
  fs.writeFile(
    `${basePath(process.cwd())}/depro.config.json`,
    JSON.stringify(text, null, 2), {encoding: 'utf-8'},
    err => {console.log(err)}
  )
}

module.exports = createConfig