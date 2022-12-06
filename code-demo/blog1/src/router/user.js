const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
    const method = req.method
    const path = req.path
    // 登陆
    if(method === 'GET' && path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        return login(username, password).then(data => {
            if(data.username) {
                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname
                return new SuccessModel()
            }
            return new ErrorModel('登陆失败')
        })
    }
    // 登录验证
    if(method === 'GET' && path === '/api/user/login-test') {
        if(req.session.username) {
            return Promise.resolve(new SuccessModel({
                session: req.session
            }))
        }
        return Promise.resolve(new ErrorModel('验证失败'))
    }
}

module.exports = handleUserRouter