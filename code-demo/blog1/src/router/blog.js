
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const loginCheck = (req) => {
    // 登录验证
        if(!req.session.username) {
            return Promise.resolve(new ErrorModel('尚未登录'))
        }
        
}
const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path

    // 获取博客列表
    if(method === 'GET' && path === '/api/blog/list') {

        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }
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
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username
        return newBlog(req.body).then(data => {
            return new SuccessModel(data)
        })
    }
    // 更新一篇博客
    if(method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        return updateBlog(req.query.id, req.body).then(result => {
            if(result) {
                return new SuccessModel()
            }
            return new ErrorModel('更新博客失败')
        })
    }
    // 删除一篇博客
    if(method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        const author = req.session.username
        return deleteBlog(req.query.id, author).then(result => {
            if(result) {
                return new SuccessModel()
            }
            return new ErrorModel('删除博客失败')
        })
    }
}

module.exports = handleBlogRouter