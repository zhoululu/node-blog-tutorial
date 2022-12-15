// 修改数据
const Sequelize = require('sequelize')
const { Blog } = require('./model')

!(async () => {
  // res 是一个数组，改变了几行，数组的第一个元素就是几
  // 比如，没有更新任何行，则返回[0],改变了一行返回[1],两行[2]，以此类推
  const res = await Blog.update({
    content: '博客内容DDD'
  }, {
    where: {
      title: {
        [Sequelize.Op.like]: '%博客%'
      }
    }
  }) // 对应的sql语句 update blogs set content='博客内容DDD', author='zhangsan1' where title like '%博客%';
  console.log(res)
})()