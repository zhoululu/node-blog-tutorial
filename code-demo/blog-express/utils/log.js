const fs = require('fs')
const path = require('path')

function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}
// 生成write stream
function createWriteStream(fileName) {
  const fullFileName = path.resolve(__dirname, `../../logs/${fileName}`)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

const accessWriteStream = createWriteStream('access.log')
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}

