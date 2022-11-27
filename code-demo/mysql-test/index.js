const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ZLL144280zll,./',
    port: '3306',
    database: 'myblog'
})

con.connect()

const sql = `insert into blogs(title,content,createtime,author) values('标题C','内容C',1669538241059,'zhangsan')`

con.query(sql, (err, result) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(result)

})

con.end()