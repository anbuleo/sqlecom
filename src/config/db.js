import mysql from 'mysql2'

import env from 'dotenv'

env.config()


const Connect = mysql.createPool({
    host: process.env.Mysql_host,
    user:process.env.Mysql_user,
    password: process.env.Mysql_pass,
    database: process.env.Mysql_database

}).promise()





export default Connect