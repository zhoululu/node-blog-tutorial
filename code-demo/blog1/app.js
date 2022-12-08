const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set, get } = require('./src/db/redis')
const { access } =require('./src/utils/log')
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

const getClientIp = (req) => {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress;
}

// const SESSION_DATA = {}
const serverHandle = (req, res) => {

    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${getClientIp(req)}`)
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
    // let needSetSession = false
    // let userId = req.cookie.userid
    // if(userId) {
    //     if(!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetSession = true
    //     userId = `${(new Date()).getTime()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    let needSetSession = false
    let userId = req.cookie.userid
    if(!userId) {
        needSetSession = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }
    req.sessionId = userId
    get(req.sessionId).then( sessionData => {
        if(sessionData == null) {
            set(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData
        }
        return  getPostData(req)
    })
   .then(postData => {
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
