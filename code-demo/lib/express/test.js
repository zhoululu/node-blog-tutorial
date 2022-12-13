const express = require('./like-express')

const app = express()

app.use((req, res, next) => {
  console.log('第一个req', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  console.log('第一个req', req.method, req.url)
  res.json({
    message: 'helloworld'
  })
})

app.listen(9899, () => {
  console.log('启动成功')
})