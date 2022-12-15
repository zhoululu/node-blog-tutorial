const { exec } = require('../db/mysql')
const getList = async (author, keyword) => {
    // 因为不确定是否有author和keyword,所以先用where 1=1 占位
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return await exec(sql)
    
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id=${id}`
    return await exec(sql)
}

const newBlog = async (blogData = {}) => {
    const { title, content, author } = blogData
    const createTime = Date.now()
    const sql = `insert into blogs(title, content, createtime, author) values('${title}', '${content}', ${createTime}, '${author}' )`
    const data = await exec(sql)
    return {
        id: data.insertId
    }
}

const updateBlog = async (id, blogData = {}) => {
    const { title, content } = blogData
    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
    const data = await exec(sql)
    if(data.affectedRows > 0) {
        return true
    }
    return false
}

const deleteBlog = async (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    const data = await exec(sql)
    if(data.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}