const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const conf = {
  host: MYSQL_CONF.host,
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
  MYSQL_CONF.database_seq, // 数据库名称
  MYSQL_CONF.user, // 用户名
  MYSQL_CONF.password, // 密码
  conf
)

// 测试连接
// seq.authenticate().then(() => {
//   console.log('sequelize connect success')
// }).catch((err) => {
//   console.log('err', err)
// })

module.exports = seq