const mysql = require('mysql2')

const config = require('./config')

//创建连接池
const connections =  mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

//测试连接池
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    //当err为空，表示连接成功
    if(err) {
      console.log("连接失败", err);
    } else {
      console.log("数据库连接成功~");
    }
  })
})


//后面操作都是通过promise操作的
//因此可以直接导出promise
module.exports = connections.promise();