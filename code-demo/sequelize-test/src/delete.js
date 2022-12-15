// 删除数据
const Sequelize = require('sequelize')
const { Blog } = require('./model')

!(async () => {
  // res 是一个数字，代表被删除的行数
  // 如果没有被删除的，则是0
  const res = await Blog.destroy({
    where: {
      title: {
        [Sequelize.Op.like]: '%标题%'
      }
    }
  }) // 对应的sql语句 delete from blogs where title like '%标题%';

  console.log('res', res)
})()