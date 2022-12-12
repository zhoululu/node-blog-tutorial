const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    // 因为不确定是否有author和keyword,所以先用where 1=1 占位
    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
    
}

const getDetail = (id) => {
    const sql = `select * from blogs where id=${id}`
    return exec(sql)
}

const newBlog = (blogData = {}) => {
    const { title, content, author } = blogData
    const createTime = Date.now()
    const sql = `insert into blogs(title, content, createtime, author) values('${title}', '${content}', ${createTime}, '${author}' )`
    return exec(sql).then(data => {
        return {
            id: data.insertId 
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
    return exec(sql).then(data => {
        if(data.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`
    return exec(sql).then(data => {
        if(data.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}