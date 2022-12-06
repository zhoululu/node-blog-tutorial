const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getGMTDateString = () => {
    const t = new Date()
    t.setTime(t.getTime() + 24 * 60 * 60 * 1000)
    return t.toUTCString()
}
const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path
    // 登陆
    if(method === 'GET' && path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        return login(username, password).then(data => {
            if(data.username) {
                // 设置cookie
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getGMTDateString()}`)
                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
    }
    // 登录验证
    if(method === 'GET' && path === '/api/user/login-test') {
        if(req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModel('验证失败'))
    }
}

module.exports = handleUserRouter