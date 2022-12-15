const Sequelize = require('sequelize')

const seq = require('./db')

const User = seq.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    realname: {
      type: Sequelize.STRING
    }
  }
);

// Blog模型
const Blog = seq.define(
  'blog', // 对应同步到数据库的blogs表(英文复数)
  {
    // id不用我们自己定义，sequelize会帮我们定义
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    }
    // createAt updateAt - sequelize 会帮我们创建
  }
)

module.exports = {
  User,
  Blog
}