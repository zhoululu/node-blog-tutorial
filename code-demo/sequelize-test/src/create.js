// 新增数据
const { User, Blog } = require('./model')

!(async function() {
  // 创建用户
  // const zhangsan = await User.create({
  //   username: 'zhangsan',
  //   password: '123',
  //   realname: '张三'
  // })

  // 创建博客
  const blog = await Blog.create({
    title: '博客标题CCC',
    content: '博客内容CCC',
    author: 'zhangsan'
  }) // sql 语句 insert into blogs(title, content, author, createdAt, updatedAt) values('博客标题CCC', '博客内容CCC', 'zhangsan', '2022-12-15 07:43:02', '2022-12-15 07:43:02');

  console.log(blog.dataValues)
})()