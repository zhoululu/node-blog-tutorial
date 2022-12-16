const seq = require('./db')

require('./model/Blog')
require('./model/User')

// 测试连接
seq.authenticate().then(() => {
  console.log('sequelize connect success')
}).catch((err) => {
  console.log('err', err)
})

// 同步数据
seq.sync({ force: true }).then(() => {
  process.exit()
})