const Sequelize = require('sequelize')
const Blog = require('../db/model/Blog')

const getList = async (author, keyword) => {
    const whereOption = {}
    if(author) {
      whereOption.author = author
    }
    if(keyword) {
      whereOption.title = {
        [Sequelize.Op.like]: `%${keyword}%`
      }
    }
    const list = await Blog.findAll({
      where: whereOption,
      order: [
        ['updatedAt', 'desc']
      ]
    })
    return list.map(item => item.dataValues)

    
}

const getDetail = async (id) => {
    const data = await Blog.findOne({
      where: {
        id
      }
    })
    if(!data) return []
    return [data.dataValues]
}

const newBlog = async (blogData = {}) => {
    const { title, content, author } = blogData
    const data = await Blog.create({
      title, content, author
    })
    return data.dataValues
}

const updateBlog = async (id, blogData = {}) => {
    const { title, content } = blogData
    const data = await Blog.update({
      title, content
    }, {
      where: {
        id
      }
    })
    return data[0] > 0
}

const deleteBlog = async (id, author) => {
    const data = await Blog.destroy({
      where: {
        id,
        author
      }
    })
    return data > 0
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}