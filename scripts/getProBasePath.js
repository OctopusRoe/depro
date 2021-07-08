const path = require('path')

function getProBasePath (pathString) {
  const basePath = pathString.split(path.sep)
  const newPath = []
  for (let i = 0; i < basePath.length; i++) {
    if (basePath[i] === 'node_modules') {
      break
    }
    newPath.push(basePath[i])
  }
  return path.join(...newPath)
}

module.exports = getProBasePath