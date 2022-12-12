var express = require('express');
var router = express.Router();

const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../utils/loginCheck')

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (req.query.isadmin) {
      if (req.session.username) {
          // 强制查询自己的博客
          author = req.session.username
      }
      
  }
  return getList(author, keyword).then(data => {
       res.json(new SuccessModel(data))
  })
});

// 获取博客详情
router.get('/detail', function(req, res, next) {
  const { id } = req.query
  return getDetail(id).then(data => {
      if(data.length > 0) {
        res.json(new SuccessModel(data[0]))
          return
      }
      new ErrorModel('暂无数据')
      
  })
});



// 新建一篇博客
router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  return newBlog(req.body).then(data => {
      res.json(new SuccessModel(data)) 
  })
})
// 更新一篇博客
router.post('/update', loginCheck, (req, res, next) => {
  return updateBlog(req.query.id, req.body).then(result => {
      if(result) {
          res.json(new SuccessModel())
          return 
      }
      res.json(new ErrorModel('更新博客失败')) 
  })
})
// 删除一篇博客
router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username
  return deleteBlog(req.query.id, author).then(result => {
      if(result) {
          res.json(new SuccessModel())
          return
      }
      res.json(new ErrorModel('删除博客失败'))
  })
})


module.exports = router;