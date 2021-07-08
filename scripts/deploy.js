const path = require('path')
const util = require('util')
const events = require('events')
const Client = require('ssh2').Client
const fs = require('fs')

const {server, baseDir, basePath, buildPath, bakDirName} = require('./readeConfig')

function doConnect (server, then) {
  const conn = new Client()
  conn.on('ready', () => {
    then && then(conn)
  }).on('error', err => {
    console.error(`connect error! ${err}`)
  }).on('close', () => {
    conn.end()
  }).connect(server)
}

function doShell (server, cmd, then) {
  doConnect(server, conn => {
    conn.shell((err, stream) => {
      if (err) throw err
      else {
        let buf = ''
        stream.on('close', () => {
          conn.end()
          then && then(err, buf)
        }).on('data', data => {
          buf = buf + data
        }).stderr.on('data', data => {
          console.log(`stderr: ${data}`)
        })
        stream.end(cmd)
      }
    })
  })
}

function doGetFileAndDirList (localDir, dirs, files) {
  const dir = fs.readdirSync(localDir)
  for (let i = 0; i < dir.length; i++) {
    const p = path.join(localDir, dir[i])
    const stat = fs.statSync(p)
    if (stat.isDirectory()) {
      dirs.push(p)
      doGetFileAndDirList(p, dirs, files)
    } else {
      files.push(p)
    }
  }
}

function Control () {
  events.EventEmitter.call(this)
}

util.inherits(Control, events.EventEmitter)

const control = new Control()

control.on('doNext', function (todos, then) {
  if (todos.length > 0) {
    const func = todos.shift()
    func(function (err, result) {
      if (err) {
        then && then(err)
        throw err
      } else {
        control.emit('doNext', todos, then)
      }
    })
  } else {
    then && then(null)
  }
})

function doUploadFile (server, localPath, remotePath, then) {
  doConnect(server, function (conn) {
    conn.sftp(function (err, sftp) {
      if (err) {
        then && then(err)
      } else {
        sftp.fastPut(localPath, remotePath, function (err, result) {
          conn.end()
          then && then(err, result)
        })
      }
    })
  })
}

function doUploadDir (server, localDir, remoteDir, then) {
  const dirs = []
  const files = []
  doGetFileAndDirList(localDir, dirs, files)

  // 创建远程目录
  const todoDir = []
  dirs.forEach(function (dir) {
    todoDir.push(function (done) {
      const to = path.join(remoteDir, dir.slice(localDir.length + 1)).replace(/[\\]/g, '/')
      const cmd = 'mkdir -p ' + to + '\r\nexit\r\n'
      console.log(`cmd::${cmd}`)
      doShell(server, cmd, done)
    })// end of push
  })

  // 上传文件
  const todoFile = []
  files.forEach(function (file) {
    todoFile.push(function (done) {
      const to = path.join(remoteDir, file.slice(localDir.length + 1)).replace(/[\\]/g, '/')
      console.log('upload ' + to)
      doUploadFile(server, file, to, done)
    })
  })
  control.emit('doNext', todoDir, function (err) {
    if (err) {
      throw err
    } else {
      control.emit('doNext', todoFile, then)
    }
  })
}


function autoDep () {

  console.log('**************auto deploy project***************')

  console.log('--------deploy config--------------')
  console.log(`服务器host:            ${server.host}`)
  console.log(`项目文件夹:            ${baseDir}`)
  console.log(`项目部署以及备份目录:  ${basePath}`)
  if (bakDirName !== '') {
    console.log(`备份后的文件夹名:      ${bakDirName}`)
  }
  console.log('--------deploy start--------------')

  if (bakDirName !== '') {
    doShell(server, `mv ${basePath}/${baseDir} ${basePath}/${bakDirName}\nexit\n`)
  }

  doUploadDir(server, buildPath, `${basePath}/${baseDir}`, () => console.log('--------deploy end--------------'))

}

module.exports = autoDep