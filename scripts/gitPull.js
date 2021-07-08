const childProcess = require('child_process')
const basePath = require('./getProBasePath')
const {gitPath, useGitPull} = require('./readeConfig')


function pullGit () {

  const path = basePath(process.cwd())
  // 配置远程拉取代码地址

  if (useGitPull) {
    console.log('Code updating...')
    childProcess.exec('git pull', { cwd: path, encoding: gitPath }, err => {
    if (err !== null) {
      console.log(`exec error: ${err}`)
    } else {
      console.log('Code update done')
    }
  })
  return
  }
  console.log('not use git pull')
}

module.exports = pullGit