 const express = require('express')

 const app = express()

 app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/api/get-post/data', (req, res, next) => {
  console.log('aaaa', req.body)
  setTimeout(() => {
    res.json({
      errno: 0,
      message: '成功'
    })
  }, 2000)
})
//  app.use((req, res, next) => {
//   console.log('请求开始...', req.method, req.url)
//   next()
//  })

//  app.use((req, res, next) => {
//   // 假设在处理cookie
//   req.cookie = {
//     userId: 'abc123'
//   }
//   next()
//  })

//  app.use((req, res, next) => {
//   // 假设在处理postData
//   setTimeout(() => {
//     req.body = {
//       a: 100,
//       b: 200
//     }
//     console.log('解析postData')
//     next()
//   })
//  })

//  app.use('/api', (req, res, next) => {
//   console.log('处理 /api 路由')
//   next()
//  })

//  app.get('/api', (req, res, next) => {
//   console.log('get /api 路由')
//   next()
//  })

//  app.post('/api', (req, res, next) => {
//   console.log('post /api 路由')
//   next()
//  })

//  app.get('/api/get-cookie', (req, res, next) => {
//   console.log('get /api/get-cookie')
//   res.json({
//     errno: 0,
//     data: req.cookie
//   })
//  })

//  app.post('/api/get-post/data', (req, res, next) => {
//   console.log('post /api/get-post/data')
//   res.json({
//     errno: 0,
//     data: req.body
//   })
//  })

 const server = app.listen(9895, () => {
  console.log('启动成功')
 })