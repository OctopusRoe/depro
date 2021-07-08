const moment = require('moment')
const path = require('path')
const basePathOne = require('./getProBasePath')
const baseProjectPath = path.join(basePathOne(process.cwd()), '/depro.config')
const deproConfig = require(baseProjectPath)

const server = {
  host: deproConfig.host,
  port: deproConfig.port,
  username: deproConfig.userName,
  password: deproConfig.passWord
}

const baseDir = deproConfig.baseDir
const basePath = deproConfig.basePath
const buildOrder = deproConfig.buildOrder
const buildPath = path.resolve(deproConfig.buildPath)
const userName = deproConfig.developers
const useGitPull = deproConfig.useGitPull
let bakDirName = ''
let gitPath = ''

if (deproConfig.useBak) {
  bakDirName = `${baseDir}.bak.dev102-${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}-${userName}`
}

if (deproConfig.useGitPull) {
  gitPath = deproConfig.gitPath
}

module.exports = {server, baseDir, basePath, buildOrder, buildPath, bakDirName, gitPath, useGitPull}