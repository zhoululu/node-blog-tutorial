const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const body = ctx.request.body
  ctx.body = {
    errno: 0,
    body,
    data: ['获取博客参数']
  }
})

module.exports = router
