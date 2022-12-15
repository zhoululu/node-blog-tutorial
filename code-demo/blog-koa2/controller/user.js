const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const login = async (username, password) => {
    // 防止sql注入
    username = escape(username)
    // 对密码加密
    password = genPassword(password)
    password = escape(password)
    // 使用escape函数后，${username}和${password}去除之前的前后单引号(')
    const sql = `select  username, realname from users where username=${username} and password=${password};`

    const data = await exec(sql)
    return data[0] || {}
}

module.exports = {
    login
}