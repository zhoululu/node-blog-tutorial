const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
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

const getUTCDateString = () => {
    const t = new Date()
    t.setTime(t.getTime() + 24 * 60 * 60 * 1000)
    return t.toUTCString()
}

const SESSION_DATA ={}
const serverHandle = (req, res) => {
    res.setHeader('Content-Type', 'application/json;charset=utf8')

    // 获取path
    const url = req.url
    const path = url.split('?')[0]
    req.path = path

    // 解析query
    const query = {}
    const urlSearchParams = new URLSearchParams(url.split('?')[1])
    for(const [key, value] of urlSearchParams.entries()) {
        query[key] = value
    }
    req.query = query

    // 解析cookie
    const cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(item) {
            const [key, value] = item.trim().split('=')
            cookie[key] = value
        }
    })
    req.cookie = cookie

    // 设置session
    let needSetSession = false
    let userId = req.cookie.userid
    if(userId) {
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetSession = true
        userId = `${(new Date()).getTime()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    // 处理postData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {
                if(needSetSession) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getUTCDateString()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理登陆路由
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then(userData => {
                if(needSetSession) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getUTCDateString()}`)
                }
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
