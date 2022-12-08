// process.stdin.pipe(process.stdout)

// const http = require('http')
// const server = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     req.pipe(res)
//   }
// })
// server.listen(8000)

const fs = require('fs')
const path = require('path')

const filename1 = path.resolve(__dirname, 'data.txt')
const filename2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(filename1)

const writeStream = fs.createWriteStream(filename2)

readStream.on('data', chunk => {
  console.log('**********')
  console.log(chunk.toString())
  console.log('**********')
})

readStream.pipe(writeStream)