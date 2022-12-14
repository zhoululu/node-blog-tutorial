const path = require('path')
const fs = require('fs')

const getFileContent = (fileName) => {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if(err) {
        reject(err)
        return
      }
      resolve(JSON.parse(data))
    })
  })
  return promise
}


async function readFileData() {
  let next = 'a.json'
  while(next) {
    const data = await getFileContent(next)
    console.log('data', data)
    next = data.next
  }
  // const aData = await getFileContent('a.json')
  // console.log('a data', aData)

  // const bData = await getFileContent(aData.next)
  // console.log('b data', bData)

  // const cData = await getFileContent(bData.next)
  // console.log('c data', cData)
}

readFileData().then(res => {
  console.log('res', res)
})
console.log('111')

// 1. await 后面可以追加 promise对象，获取resolve的值
// 2. await 必须包裹在 async函数里面
// 3. async 函数执行返回的也是一个promise对象
// 4. try-catch 截获 promise 中 reject 的值

