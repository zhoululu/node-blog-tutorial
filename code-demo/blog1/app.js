const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

// 用于处理PostData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return 
        }
        if(req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk
        })
        req.on('end', chunk => {
            if(!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })

    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-Type', 'application/json;charset=utf8')

    // 获取path
    const url = req.url
    const path = url.split('?')[0]
    req.path = path

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 处理postData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理登陆路由
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 未命中路由，返回 404
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf8' })
        res.write('找不到\n')
        res.end()
    })

    
}

module.exports = serverHandle
