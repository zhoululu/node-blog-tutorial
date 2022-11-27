
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {

        const { author = '', keyword = '' } = req.query
        return getList(author, keyword).then(data => {
            return new SuccessModel(data)
        })
    }
    // 获取博客详情
    if(method === 'GET' && path === '/api/blog/detail') {
        const { id } = req.query
        return getDetail(id).then(data => {
            if(data.length > 0) {
                return new SuccessModel(data[0])
            }
            return new ErrorModel('暂无数据')
            
        })
        
    }
    // 新建一篇博客
    if(method === 'POST' && path === '/api/blog/new') {
        req.body.author = 'zhangsan'
        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        })
    }
    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        return updateBlog(req.query.id, req.body).then(result => {
            if(result) {
                return new SuccessModel()
            }
            return new ErrorModel('更新博客失败')
        })
    }
    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/del') {
        const author = 'zhangsan'
        return deleteBlog(req.query.id, author).then(result => {
            if(result) {
                return new SuccessModel()
            }
            return new ErrorModel('删除博客失败')
        })
    }
}

module.exports = handleBlogRouter