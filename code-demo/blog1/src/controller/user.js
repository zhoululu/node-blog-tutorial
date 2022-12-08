const { exec, escape } = require('../db/mysql')

const login = (username, password) => {
    // 防止sql注入
    username = escape(username)
    password = escape(password)
    // 使用escape函数后，${username}和${password}去除之前的前后单引号(')
    const sql = `select  username, realname from users where username=${username} and password=${password};`
    return exec(sql).then(data => {
        return data[0] || {}
    })
}

module.exports = {
    login
}