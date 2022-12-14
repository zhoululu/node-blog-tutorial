const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path
    // 登陆
    if(method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        return login(username, password).then(data => {
            if(data.username) {
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname
                set(req.sessionId, req.session)
                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
    }
}

module.exports = handleUserRouter