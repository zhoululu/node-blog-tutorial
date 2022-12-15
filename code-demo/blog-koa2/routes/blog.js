const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function(ctx, next) {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  if (ctx.query.isadmin) {
      if (ctx.session.username) {
          // 强制查询自己的博客
          author = ctx.session.username
      }
      
  }
  const data = await getList(author, keyword)
  ctx.body = new SuccessModel(data) 
});

// 获取博客详情
router.get('/detail', async function(ctx, next) {
  const { id } = ctx.query
  const data = await getDetail(id)
  if(data.length > 0) {
    ctx.body = new SuccessModel(data[0])
    return
  }
  ctx.body = new ErrorModel('暂无数据')
});



// 新建一篇博客
router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = newBlog(body)
  ctx.body = new SuccessModel(data)
})
// 更新一篇博客
router.post('/update', loginCheck, async (ctx, next) => {
  const result = updateBlog(ctx.query.id, ctx.request.body)
  if(result) {
    ctx.body =  new SuccessModel()
    return
  }
  ctx.body =  new ErrorModel('更新博客失败')
})

// 删除一篇博客
router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const result = await deleteBlog(ctx.query.id, author)
  if(result) {
    ctx.body =  new SuccessModel()
    return
  }
  ctx.body =  new ErrorModel('删除博客失败')
})

module.exports = router
