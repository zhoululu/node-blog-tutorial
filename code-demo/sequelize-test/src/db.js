const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

// **生产环境** 下使用连接池（process.env.NODE_ENV）

// conf.pool = {
//   max: 5, // 连接池中最大的连接数
//   min: 0, // 连接池中最小的连接数
//   idle: 10 * 1000 // 如果一个连接10s内没有被使用，则释放。
// }

// 创建sequelize实例
const seq = new Sequelize(
  'myblog_sequelize', // 数据库名称
  'root', // 用户名
  'ZLL144280zll,./', // 密码
  conf
)

// 测试连接
// seq.authenticate().then(() => {
//   console.log('sequelize connect success')
// }).catch((err) => {
//   console.log('err', err)
// })

module.exports = seq