#!/usr/bin/env node
const fs = require('fs')
const basePath = require('./getProBasePath')
const path = require('path')
const baseProjectPath = path.join(basePath(process.cwd()), '/depro.config')

// 查找文件夹是否含有 depro.config.json 文件
function hasConfig () {
  const files = fs.readdirSync(basePath(process.cwd()))
  return files.indexOf('depro.config.json') > -1
}

const BASE_TEXT = {
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

function createConfig () {

  let text = {}

  if (!hasConfig()) {
    text = BASE_TEXT
  } else {
    const DEPRO_CONFIG = require(baseProjectPath)
    Object.keys(BASE_TEXT).forEach(item => {
      if (DEPRO_CONFIG[item] !== '' || DEPRO_CONFIG[item]) {
        text[item] = DEPRO_CONFIG[item]
      } else {
        text[item] = BASE_TEXT[item]
      }
    })
  }

  fs.writeFile(
    `${basePath(process.cwd())}/depro.config.json`,
    JSON.stringify(text, null, 2),
    {encoding: 'utf-8'},
    err => {console.log(err)}
  )
}

module.exports = createConfig