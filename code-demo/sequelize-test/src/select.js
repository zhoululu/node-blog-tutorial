// 查询数据
const Sequelize = require('sequelize')
const { User, Blog } = require('./model')

!(async () => {
  // 查询一条数据findOne(登录)
  /**
   * 查询不到返回null
   * 查询到了，zhangsan.dataValues里面是查询到的值
  */
  // const zhangsan = await User.findOne({
  //   where: {
  //     username: 'zhangsan',
  //     password: '456'
  //   }
  // })
  // console.log(zhangsan)

  // 查询多条数据 findAll

  const blogList = await Blog.findAll({
    where: {
      author: 'zhangsan',
      title: {
        [Sequelize.Op.like]: '%标题C%' // 模糊查询 
      }
    },
    order: [ // 排序，对比 sql 语句
      ['id', 'desc'] // 对比sql语句：select * from blogs where author='zhangsan' and title like '%标题%' order by updatedAt desc;
    ]
  })
  // 查询不到，返回[], 查询到的数据在每一项的dataValues里面里面
  console.log(blogList && blogList.map(item => item.dataValues))
})()